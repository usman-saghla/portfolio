# Usman — Portfolio

Dark, minimal, techy portfolio built with Next.js + Tailwind CSS.
Signature element: the hero background is an animated "classification grid" —
a nod to the land-cover classification work in your thesis.

## 1. Before you deploy — edit these

**`app/page.tsx`**
- Contact section near the bottom: replace
  - `your.email@example.com` → your real email
  - `https://linkedin.com/in/your-profile` → your LinkedIn
  - `https://github.com/your-username` → your GitHub
- Feel free to edit the `PROJECTS` and `SKILLS` arrays near the top of the
  file to add/remove/update entries as your work evolves.

**`app/layout.tsx`**
- Update the `metadata` title/description if you want different SEO text.

## 2. Run it locally (optional, to preview before deploying)

You'll need [Node.js](https://nodejs.org) installed (free), then:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## 3. Deploy for free on Vercel (recommended — zero cost, no card needed)

**Option A — via GitHub (recommended):**
1. Create a free GitHub account if you don't have one: https://github.com
2. Create a new repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to https://vercel.com and sign up free with your GitHub account.
4. Click "Add New Project," select your repo, leave all settings default,
   click "Deploy."
5. Vercel gives you a free live URL like `your-portfolio.vercel.app`.
   Every future `git push` auto-redeploys it — still free.

**Option B — Vercel CLI (no GitHub needed):**
```bash
npm install -g vercel
vercel
```
Follow the prompts (free account signup if needed). It deploys directly
from your folder and gives you a live URL.

No payment method is required for either option on Vercel's free (Hobby) tier.

## 4. Custom domain (optional, still free)

Vercel's `*.vercel.app` subdomain is free forever. If you later want a
custom domain (e.g. `usman.dev`), that costs money from a registrar —
but the hosting itself stays free either way.
