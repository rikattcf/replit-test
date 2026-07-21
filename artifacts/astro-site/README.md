# Dexcom-style Astro + Storyblok Site

A production-ready website built with **Astro**, **Storyblok CMS**, and **Web Awesome Pro**, styled to match the Dexcom UK brand. Deployed to **Vercel** via **GitHub**.

---

## Quick start (local)

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env
# Edit .env — add STORYBLOK_TOKEN and STORYBLOK_SPACE_ID (see below)

# 3. Start dev server
npm run dev
# → http://localhost:4321
```

The homepage shows a **built-in demo** if no Storyblok "home" story exists yet — so the site always renders locally.

---

## Environment variables

| Variable | Where to find it | Required |
|---|---|---|
| `STORYBLOK_TOKEN` | Storyblok → Settings → Access Tokens → **Preview** token | Yes (dev) |
| `STORYBLOK_PUBLIC_TOKEN` | Storyblok → Settings → Access Tokens → **Public** token | Yes (prod) |
| `STORYBLOK_SPACE_ID` | Storyblok → Settings → General → Space ID | Yes |
| `VITE_WA_KIT_CODE` | Font Awesome → Kits → your kit ID | Optional (Pro icons) |
| `IS_PRODUCTION` | Set to `true` in Vercel production env | Auto |

> **Never commit `.env`** — it is already in `.gitignore`.

---

## Deploying to Vercel

### Option A — Vercel dashboard (recommended)

1. Push this directory as a GitHub repo.
2. In [vercel.com](https://vercel.com), click **New Project** → Import from GitHub.
3. Vercel auto-detects Astro. Set the **Root Directory** to the repo root.
4. Add your environment variables in **Project Settings → Environment Variables**:
   - `STORYBLOK_TOKEN` (preview) for Preview deployments
   - `STORYBLOK_PUBLIC_TOKEN` (public) for Production deployments
   - `STORYBLOK_SPACE_ID`
5. Click **Deploy**.

### Option B — GitHub Actions

Add these secrets to your GitHub repo (`Settings → Secrets → Actions`):

```
STORYBLOK_TOKEN
STORYBLOK_PUBLIC_TOKEN
STORYBLOK_SPACE_ID
VERCEL_TOKEN       ← from vercel.com → Account Settings → Tokens
VERCEL_ORG_ID      ← from vercel.com → Account Settings → General
VERCEL_PROJECT_ID  ← from your Vercel project → Settings → General
```

The workflow in `.github/workflows/deploy.yml` handles the rest on every push to `main`.

---

## Storyblok setup

### 1. Import component schemas

In Storyblok, go to **Components** and import each schema from `storyblok/components.json`.

Or create them manually using the field definitions in that file as a reference.

### 2. Create the Home story

- In **Content**, create a story with slug `home`
- Set its content type to **Page**
- Add blocks from the body: Hero, Grid, TextArea, etc.

### 3. Enable Visual Editor

In Storyblok → Settings → Visual Editor, set your preview URL to your local dev URL:

```
http://localhost:4321
```

---

## Components

### Hero

Two-column layout with text + image. Available in Storyblok as `hero`.

| Field | Type | Default |
|---|---|---|
| `eyebrow` | Text | — |
| `heading_tag` | H1–H4 | H1 |
| `title` | Text | — |
| `details` | Textarea | — |
| `image` | Asset | — |
| `image_position` | left / **right** | right |
| `image_width` | 25 / 33 / **50** / 66 % | 50% |
| `cta_buttons` | CTA Button blocks (max 2) | — |
| `bg_color` | CSS colour | — |
| `full_height` | Boolean | false |

### CTA Button

Standalone button or embedded in Hero / TextArea / Card.

| Field | Options | Default |
|---|---|---|
| `variant` | solid (primary) / outline (secondary) | solid |
| `size` | sm / md / lg | md |

### Grid

Responsive column grid. Drop Card blocks inside.

| Field | Options | Default |
|---|---|---|
| `columns` | 1–5 | 3 |

### Card

Generic media card for use inside Grid.

| Field | Notes |
|---|---|
| `image` or `video_url` | YouTube, Vimeo, or direct .mp4 |
| `media_position` | top / bottom |
| `show_border` | toggle card border |
| `cta_buttons` | up to 2 |

### TextArea

Rich text block with optional title, eyebrow, details, and CTAs.

| Field | Options | Default |
|---|---|---|
| `alignment` | left / center / right | left |
| `cta_buttons` | max 2 | — |

---

## Web Awesome Pro

This project uses **Web Awesome** (built on Shoelace) loaded via CDN.

For Pro components and icons:

1. Get your kit code from [fontawesome.com → Kits](https://fontawesome.com/kits).
2. Add `VITE_WA_KIT_CODE=your_kit_id` to `.env`.
3. The `Layout.astro` will automatically inject the Pro kit script.

---

## Project structure

```
src/
  layouts/
    Layout.astro          ← HTML shell, nav + footer
  pages/
    index.astro           ← Homepage (Storyblok or demo fallback)
    [...slug].astro       ← All other Storyblok pages
    404.astro             ← Not found page
  components/
    navigation/
      MegaMenu.astro      ← Accessible mega menu
    footer/
      Footer.astro        ← 3-column footer
    blocks/
      Hero.astro          ← Two-column hero
      CTAButton.astro     ← Solid / outline button
      Grid.astro          ← 1–5 column grid
      Card.astro          ← Media card
      TextArea.astro      ← Rich text block
  storyblok/
    Page.astro            ← Storyblok page type
    Hero.astro            ← Storyblok → Hero bridge
    CTAButton.astro       ← Storyblok → CTAButton bridge
    Grid.astro            ← Storyblok → Grid bridge
    Card.astro            ← Storyblok → Card bridge
    TextArea.astro        ← Storyblok → TextArea bridge
  styles/
    global.css            ← Design tokens + resets

storyblok/
  components.json         ← Import these into Storyblok
```

---

## Colour palette (Dexcom brand)

| Token | Value | Usage |
|---|---|---|
| `--color-brand-green` | `#00AA55` | Primary, CTAs, logo |
| `--color-brand-green-dark` | `#008F45` | Hover states |
| `--color-brand-green-light` | `#E8F7EE` | Hover backgrounds |
| `--color-brand-black` | `#231F20` | Body text, headings |
| `--color-gray-*` | `50–900` | Neutrals |
