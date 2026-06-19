# MD Traders — Luxury Website + Admin Panel

A premium, conversion-focused website for **MD Traders** (tiles, sanitary ware, bathroom
accessories, faucets, showers, modular kitchens & interior solutions) with a full
**admin panel** to manage all content — backed by PostgreSQL.

## Tech stack
- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4** + **Framer Motion** (animations)
- **PostgreSQL 14** + **Prisma 6** (ORM)
- SEO: metadata, OpenGraph, JSON-LD schema, sitemap & robots

---

## Getting started (every time)

The site needs its database running first.

```bash
npm run db:start    # start the local Postgres cluster (port 5544)
npm run dev         # start the website at http://localhost:3000
```

To stop the database later: `npm run db:stop`.

> The database lives in `./.postgres` (git-ignored). It does **not** auto-start on
> reboot — run `npm run db:start` again after restarting your machine.

### Production
```bash
npm run db:start
npm run build
npm start
```

---

## Admin panel

Open **http://localhost:3000/admin**

Default login (change in `.env`):
- **Username:** `admin`
- **Password:** `MDtraders@2026`

From the admin you can add / edit / delete and upload images for:
- **Products** (categories)
- **Gallery**
- **Testimonials**
- **Services**
- **Business Info** (name, phone, WhatsApp, email, address, map, hours, social links)

Every change appears on the live website **instantly**. Uploaded images are stored in
`public/uploads/` (git-ignored). If you don't upload an image, a luxury gradient
placeholder is shown automatically.

### Optional: load starter content
The database starts **empty**. To pre-fill it with ready-made luxury demo content:
```bash
npm run db:seed
```

---

## Configuration (`.env`)
```
DATABASE_URL   # Postgres connection string
ADMIN_USERNAME # admin login username
ADMIN_PASSWORD # admin login password  <- change this
AUTH_SECRET    # session signing secret <- keep private
```

`.env` is git-ignored. A template is in `.env.example`.

## Useful scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run db:start` / `npm run db:stop` | Start / stop local Postgres |
| `npm run db:seed` | Load demo content |
| `npm run db:studio` | Visual DB browser (Prisma Studio) |
