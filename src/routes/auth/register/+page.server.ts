import { superValidate } from "sveltekit-superforms";
import { registerSchema } from "$lib/forms/schema/schema";
import { zod } from "sveltekit-superforms/adapters";

import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { PageServerLoad, Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";

 
export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
		return redirect(302, '/private');
	}

    return {
        form: await superValidate(zod(registerSchema)),
    };
};

export const actions: Actions = {
	default: async (event) => {
        const form = await superValidate(event, zod(registerSchema));
        
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const username = form.data.email;
		const userId = generateUserId();
		const passwordHash = await hash(form.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/private');
	}
};



function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}