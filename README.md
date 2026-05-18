# TenantReach Landing Page

A one-page validation landing page for TenantReach, an early-access tenant sourcing service for vacant commercial and industrial properties.

## Current Stack

- Vite
- React
- TypeScript
- Plain CSS

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

To test a production build:

```bash
npm run build
npm run preview
```

## Static Deployment Settings

This app can deploy as a static site.

- Build command: `npm run build`
- Output directory: `dist`
- Run command: none

## Form Setup

The early access form posts to `VITE_FORM_ENDPOINT`.

Recommended launch option: create a Formspree-style endpoint, then set:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Keep real endpoint values in `.env.local` for local testing and in DigitalOcean environment variables for deployment. Do not commit `.env.local`.

The form sends a `POST` request with `FormData` and an `Accept: application/json` header. It only shows the success message after a successful HTTP response. If the endpoint is missing or returns an error, the page shows an error message and keeps the entered form data.

## Test Form Submissions Before Launch

1. Create the form endpoint in Formspree or your preferred form capture tool.
2. Add the endpoint to `.env.local`:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

3. Restart the local dev server:

```bash
npm run dev
```

4. Submit the form using a test email address.
5. Confirm the submission appears in the form provider dashboard.
6. Confirm email notifications are enabled in the form provider.
7. Temporarily use an invalid endpoint to confirm the page shows the error message and keeps the form data.

## Edit Copy

Most page copy lives in [`src/App.tsx`](src/App.tsx):

- `campaignSummary`
- `bestFit`
- `notIdeal`
- `steps`
- `faqs`
- Main section headings and paragraphs inside the `App` component

Visual styling lives in [`src/styles.css`](src/styles.css).

Metadata title and description live in [`index.html`](index.html).

## Push To GitHub

From this project directory:

```bash
git init
git add .
git commit -m "Prepare TenantReach landing page for launch"
git branch -M main
git remote add origin git@github.com:YOUR_ACCOUNT/YOUR_REPO.git
git push -u origin main
```

If the repository already exists locally, use:

```bash
git add .
git commit -m "Prepare TenantReach landing page for launch"
git push
```

Before pushing, confirm `.env.local` is not staged:

```bash
git status
```

## Deploy To DigitalOcean App Platform

1. Push the repo to GitHub.
2. In DigitalOcean, go to App Platform and create a new app.
3. Choose GitHub as the source and select the TenantReach repository.
4. Set the component type to Static Site.
5. If the app is inside this folder in a larger repo, set the source directory to `tenant-sourcing-landing`. If this folder is the repository root, leave the source directory blank.
6. Set the build command to `npm run build`.
7. Set the output directory to `dist`.
8. Add the environment variable `VITE_FORM_ENDPOINT` with your form endpoint value. For a Vite static site, make sure it is available at build time.
9. Deploy the app.
10. Open the `ondigitalocean.app` URL and submit a test form entry.

DigitalOcean App Platform static sites use built assets from an output directory such as `dist`, and App Platform assigns a starter `ondigitalocean.app` domain after deployment. See DigitalOcean's static site, environment variable, and custom domain docs:

- https://docs.digitalocean.com/products/app-platform/how-to/manage-static-sites/
- https://docs.digitalocean.com/products/app-platform/how-to/use-environment-variables/
- https://docs.digitalocean.com/products/app-platform/how-to/manage-domains/

## Recommended Custom Domain Setup

1. Deploy successfully on the `ondigitalocean.app` starter domain first.
2. In the app, open the Networking or Domains settings.
3. Add the preferred domain, for example `tenantreach.com.au` or `www.tenantreach.com.au`.
4. Use DigitalOcean's generated DNS instructions.
5. Recommended setup:
   - Use `www` as the primary marketing URL.
   - Add the apex/root domain as well and redirect it to `www` if supported by your DNS setup.
   - If your DNS uses CAA records, allow both `letsencrypt.org` and `pki.goog` so DigitalOcean can issue the managed TLS certificate.
6. Wait for DNS and TLS validation.
7. Submit another test form entry from the custom domain.
