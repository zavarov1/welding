# Деплой на Cloudflare Pages

## 1) Деплой через GitHub (рекомендовано)
1. Запуште проєкт у GitHub.
2. У Cloudflare Dashboard: **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Оберіть репозиторій.
4. Build settings:
   - Framework preset: `None`
   - Build command: *(порожньо)*
   - Build output directory: `.`
5. Натисніть Deploy.

## 2) Деплой через Wrangler CLI (альтернатива)
1. Встановіть Wrangler: `npm i -g wrangler`
2. Логін: `wrangler login`
3. Деплой: `wrangler pages deploy . --project-name welding-kyiv`

## 3) Домен і SEO
Після першого деплою Cloudflare видасть домен виду:
`https://<project-name>.pages.dev`

Якщо ваш домен відрізняється від `https://welding-kyiv.pages.dev`, оновіть:
- `index.html` (canonical, Open Graph, Twitter, JSON-LD URL)
- `robots.txt` (посилання на sitemap)
- `sitemap.xml` (`<loc>` URL)

## 4) Що вже підготовлено
- `_redirects`: 301-редіректи зі старих `.html` URL послуг на clean URL.
- `_headers`: базові security headers + кешування статичних файлів.
- `wrangler.toml`: базова конфігурація для Pages.
