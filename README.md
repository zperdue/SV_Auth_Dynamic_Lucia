# Boilerplate: Svelte 5 SSR Auth w/Lucia + Google OAuth

Boilerplate code for integrating SSR authorization in SvelteKit 5 w/Email (Lucia) and Google OAuth.

Includes:
- Shadcn-svelte for UI
- Superforms + Zod
- Tailwindcss 3

## Install

Clone the repo, then:

```bash
# install node dependencies
npm install

# start up dev server
npm run dev
```
## Configuration

.env: Update with SupaBase project credentials.
/lib/forms/schema/schema.ts: Make any necessary modifications to table schema.
/lib/server/db/schema.ts: Update database table schema.
/lib/server/OAuth.ts: Update Google OAuth callback route.
* May need to update routes in /auth directories if implementing different routing, including in /google/callback/server.ts

## Notes

Used Tailwindcss 3 (instead of 4) due to Shadcn-svelte not seeming to play nice with Tailwindcss 4. Once resolved, should update to Tailwindcss 4.
