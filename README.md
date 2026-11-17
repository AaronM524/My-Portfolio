# Aaron Mathew — Portfolio

Next.js (App Router, static export) + TypeScript + plain CSS, one self-hosted typeface (Bricolage Grotesque). No UI framework.

## Edit content (no design work needed)
| What | File |
|---|---|
| Name, intro, email, links, "at a glance" | `content/site.ts` |
| Projects (add/remove, featured or not, repo/live links, panel color via `theme`) | `content/projects.ts` |
| Skills | `content/skills.ts` |
| Education & experience | `content/site.ts` |
| Resume PDF | `public/Aaron_Mathew_Resume.pdf` (keep the same file name) |

Empty `repo` / `live` / `linkedin` values are hidden automatically. Projects with `featured: false` appear in a "More projects" grid.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site written to /out
```

## Deploy (Vercel, free)
1. Push this folder to a new GitHub repo (e.g. `AaronM524/portfolio`).
2. Go to vercel.com → sign in with GitHub → **Add New → Project** → import the repo → **Deploy**. No settings to change.
3. You get `https://<project>.vercel.app`. Every push to `main` redeploys automatically.
4. Custom domain (recommended for your resume): buy one (Cloudflare, Porkbun or Namecheap), then Vercel → Project → **Settings → Domains** → add it and follow the DNS instructions.
5. Update `url` in `content/site.ts` to the final domain.

## Structure
```
app/layout.tsx        metadata, SEO, fonts, theme
app/page.tsx          all sections
app/globals.css       design tokens (dark + light) and styles
components/           icons, project diagrams, small vanilla JS for interactions
content/              all your editable data
public/               resume, favicon
```
