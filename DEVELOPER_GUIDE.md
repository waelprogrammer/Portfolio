# Portfolio Developer Guide

A quick reference for where to go to edit, add, or remove anything in this portfolio.

---

## Running the project

```bash
npm run dev        # Start the portfolio site  →  http://localhost:5173
npm run admin      # Start the admin panel     →  http://localhost:3006
npm run build      # Build for production
```

Run both terminals at the same time to edit via the admin and see changes live.

---

## Admin panel (no-code editing)

Open `http://localhost:3006` after `npm run admin`.

| Section | What you can edit |
|---|---|
| **Personal** | Name, job title, email, GitHub, LinkedIn, location, photo, CV link, availability badge |
| **Bio & Hero** | Hero subtitle text, About paragraph 1 & 2 |
| **Stats** | The 3 numbers shown in the About section (e.g. "3+ Years Coding") |
| **Projects** | Add/remove projects, title, description, tags, live URL, GitHub URL, gradient color, featured toggle |
| **Skills** | Add/remove skills, name, category, icon color |
| **Services** | Add/remove service cards, title, description |
| **Settings** | Accent color (buttons/links), browser tab title, meta description |

Press **Ctrl+S** or click **Save** after editing. Press **F5** on the site tab to see changes.

---

## Source file map

```
src/
├── data/
│   ├── content.json       ← ALL editable content lives here (edited via admin panel)
│   └── content.js         ← Re-exports from content.json (don't touch)
│
├── components/
│   ├── Navbar.jsx         ← Top navigation bar
│   ├── Hero.jsx           ← Homepage hero / banner section
│   ├── Services.jsx       ← "What I Offer" section
│   ├── Portfolio.jsx      ← Featured projects section (homepage)
│   ├── Skills.jsx         ← Tech stack / skills grid
│   ├── About.jsx          ← About me section
│   ├── Contact.jsx        ← Contact form section
│   └── Footer.jsx         ← Footer
│
├── pages/
│   └── ProjectsPage.jsx   ← /projects route — full project list with search & filter
│
├── context/
│   ├── ThemeContext.jsx    ← Dark/light theme toggle logic
│   └── LanguageContext.jsx ← EN/AR translations for all UI text
│
├── config/
│   └── gradients.js       ← Project card gradient color definitions
│
├── App.jsx                ← Route setup, applies accent color & SEO on startup
└── index.css              ← All CSS variables (colors, spacing) for both themes
```

---

## Common tasks

### Edit text/content on the site
Use the **admin panel** — no code needed. The only content not in the admin is:
- UI labels (buttons like "Hire Me", "Download CV") → edit `src/context/LanguageContext.jsx`
- Static text inside component files (e.g. section tag labels hardcoded in JSX)

### Change the accent color (blue → another color)
1. Open admin panel → **Settings** → pick a new accent color → Save.
2. That's it. The color applies to buttons, links, and highlights across the site.

### Add a new project
Admin panel → **Projects** → click **+ Add Project** → fill in details → Save.
- Toggle **Featured** ON to show it on the homepage (max 3 featured recommended).
- All projects always appear on the `/projects` page.

### Add a new skill
Admin panel → **Skills** → click **+ Add Skill** → set name, category, color → Save.

Categories available: `Frontend`, `Backend`, `Database`, `CMS`, `Tools`

If the skill name matches a known icon (HTML5, React, Node.js, etc.) the icon appears automatically. Unknown skills get a fallback database icon.

### Add a new gradient color option for projects
Edit `src/config/gradients.js` — add a new entry to both `GRADIENT_MAP` and `PATTERN_COLORS`. Then add the same key to `GRADIENTS` in `admin/index.html` so it appears in the admin picker.

---

## Adding a new page

1. Create the file: `src/pages/YourPage.jsx`
2. In `src/App.jsx`, lazy-import it:
   ```js
   const YourPage = lazy(() => import('./pages/YourPage'))
   ```
3. Add a route inside the `<Routes>` block:
   ```jsx
   <Route path="/your-path" element={<Suspense fallback={<div/>}><YourPage /></Suspense>} />
   ```
4. Add a link to it in `src/components/Navbar.jsx`:
   ```jsx
   <Link to="/your-path">Your Page</Link>
   ```

---

## Adding a new homepage section

1. Create the component: `src/components/YourSection.jsx`
   - Give the root element `id="your-section"` so the navbar scroll link works.
2. Import and add it in `src/App.jsx` inside `HomePage()`:
   ```jsx
   import YourSection from './components/YourSection'
   // ...
   function HomePage() {
     return (
       <>
         <Navbar />
         <Hero />
         ...
         <YourSection />   {/* add it here */}
         <Footer />
       </>
     )
   }
   ```
3. Optionally add a scroll link in `src/components/Navbar.jsx` under `scrollLinks`.
4. If the section has editable content, add the data to `src/data/content.json` and export it from `src/data/content.js`.

---

## Editing translations (EN / AR)

Edit `src/context/LanguageContext.jsx`. The file has two objects: `en` and `ar`. Update both whenever you change UI labels.

---

## Editing colors / theme

Edit `src/index.css`:
- `:root, [data-theme="dark"]` — dark mode colors
- `[data-theme="light"]` — light mode colors

All colors are CSS variables (`--c-bg`, `--c-text`, etc.) used throughout the components.

---

## Deploying

From the admin panel → click **Deploy to GitHub**. This runs:
```
git add src/data/content.json
git commit -m "Update portfolio content"
git push
```
If you use Vercel or Netlify, they will auto-deploy from the push.

For a full site rebuild (code changes, not just content):
```bash
npm run build
# then push the dist/ folder, or let your CI/CD handle it
```
