# Website Improvement Punch List

## 3 Accessibility Lapses (WCAG 2.2 AA)
- [ ] **Descriptive alt text**: `<img src="/hero-truck.webp" alt="Quiet Craft delivery van arriving at convention center loading dock at dawn"/>`
- [ ] **Add skip link**: `<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>`
- [ ] **Fix contrast**: Use Tailwind’s `text-slate-800` instead of `text-gray-400` on white. Verify with [WebAIM Contrast Checker].
- [ ] **Landmarks & headings**: Only **one** `<h1>` per page (`Event Logistics Courier Service`). Subsequent sections use `<h2>`.
- [ ] **Keyboard nav**: In React, wrap interactive cards with `<button>` or `role="link" tabindex="0"`. Test using `Tab`/`Shift+Tab`.

---

## 4 SEO & Technical Hygiene
- [ ] **Meta + OpenGraph**: 
  ```html
  <head>
    <title>Quiet Craft Solutions Inc. — Veteran-Owned Event Logistics</title>
    <meta name="description" content="Secure, on-time courier & logistics services for corporate events across NJ, NY & CT. SDVOSB certified."/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="Quiet Craft Solutions Inc."/>
    <meta property="og:description" content="Veteran-owned event logistics you can trust."/>
    <meta property="og:image" content="https://quietcrafting.com/og-cover.jpg"/>
  </head>
  ```
- [ ] **Canonical URL**: `<link rel="canonical" href="https://quietcrafting.com/"/>`
- [ ] **Sitemap & robots**: Generate `/public/sitemap.xml` weekly via GitHub Action; add `robots.txt` with `Sitemap:` line.
- [ ] **Remove duplicate H1s**: Logo becomes `<span class="sr-only">Quiet Craft Solutions Inc.</span>` inside `<a>`; keep only one visual H1.
- [ ] **Test indexing**: Run `curl -X POST https://indexing.googleapis.com/v3/urlNotifications:publish ...` after deploy (Indexing API).

---

## 5 Performance & Security
- [ ] **Responsive images**: 
  ```html
  <picture>
    <source type="image/avif" srcset="/hero.avif 1x, /hero@2x.avif 2x">
    <source type="image/webp" srcset="/hero.webp 1x, /hero@2x.webp 2x">
    <img loading="lazy" decoding="async" src="/hero.jpg" alt="Quiet Craft delivery van">
  </picture>
  ```
- [ ] **Minify & cache**: Enable **HTTP/2** push + `Cache-Control: public, max-age=31536000, immutable` for assets.
- [ ] **CAPTCHA / Honeypot**: Integrate Cloudflare Turnstile: `<CfTurnstile sitekey="..." />` in contact form.
- [ ] **Force HTTPS**: On Netlify: `[[redirects]] from = "http:*" to = "https://quietcrafting.com/:splat" force = true`
- [ ] **Dependabot & headers**: Add `npm audit fix --force` in CI. Set `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

---

## 6 Deployment Checklist (Quick-Wins First)
1. [ ] **Branding/NAP**  ✓  
2. [ ] **Fix broken routes**  ✓  
3. [ ] **Placeholder → real content**  ✓  
4. [ ] **Alt text & contrast**
5. [ ] **Meta/OG & canonical**
6. [ ] **Image optimisation & caching**
7. [ ] **SSR / prerender for bots**  ✓