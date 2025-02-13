# Boilerplate: SvK05 Auth w/Lucia + Google OAuth

Boilerplate code for integrating autherization in SvelteKit 5 w/Email (Lucia) and Google OAuth.

Includes:
- Shadcn-svelte for UI
- Superforms + Zod
- Tailwindcss 3

## Install

Clone the repo, then:

```bash
# initialization
npm init

# install node dependencies
npm install

# start up dev server
npm run dev
```

## Notes

Used Tailwindcss 3 (instead of 4) due to Shadcn-svelte not seeming to play nice with Tailwindcss 4. Once resolved, should update to Tailwindcss 4.

To implement, followed modified instructions from https://next.shadcn-svelte.com/docs/installation/sveltekit.

```bash
# Alternative SvelteKit 5 CLI.  Installs Tailwindcss 3
npx sv@0.6.18 create

# install shadcn-svelete + depencencies (Superforms + Zod)
npx shadcn-svelte@next init

# install arctic for Google OAuth
npm install arctic
```

If needing to uninstall TW4 and install TW3, then:
```bash
# Uninstall Tailwindscss 4
npm uninstall tailwindcss postcss autoprefixer

# Install Tailwindscss 3
npm install -D tailwindcss@3 postcss@8 autoprefixer@10

# Create Twailwindscss config file
npx tailwindcss init -p
```
