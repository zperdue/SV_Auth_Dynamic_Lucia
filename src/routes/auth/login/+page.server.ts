import { superValidate, setError, message } from "sveltekit-superforms";
import { loginSchema } from "$lib/forms/schema/schema";
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
    //console.log(event.locals)
    if (event.locals.user) {
        return redirect(302, '/private');
    }

    return {
        form: await superValidate(zod(loginSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));
        
        if (!form.valid) {
            return message(form, 'Invalid email or password.');
        }

        const username = form.data.email;
        const results = await db.select().from(table.user).where(eq(table.user.username, username));
        
        const existingUser = results.at(0);
        //console.log(existingUser)
        if (!existingUser) {
            return message(form, 'Invalid email or password.');
        }

        const password = form.data.password;
        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return message(form, 'Invalid email or password.');
        }
        
        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, '/private');
    }
};
