
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async (event: RequestEvent) => {
    if (!event.locals.user) {
        return redirect(302, '/auth/login');
    }
};


