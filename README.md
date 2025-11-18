# SaaS landing page

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/glowingandflowingk9dog-6457-a8db353c/v0-wildrosepainter)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/FbcoMjLeIuR)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/glowingandflowingk9dog-6457-a8db353c/v0-wildrosepainter](https://vercel.com/glowingandflowingk9dog-6457-a8db353c/v0-wildrosepainter)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/FbcoMjLeIuR](https://v0.app/chat/projects/FbcoMjLeIuR)**

## Local Docker runtime

For Cloudflare tunnel routing we run this site inside Docker instead of `npm run dev`:

```powershell
cd "c:\project 1\WildrosePaintersSite-main"
docker compose -f docker-compose.web.yml up --build -d
```

- Publishes the app on `http://127.0.0.1:3300`.
- Recreate with `--build` whenever you pull new code.
- Stop it with `docker compose -f docker-compose.web.yml down`.

## Lead routing & auto replies

1. Copy `env.example` to `.env.local` (or the env file consumed by Docker/Vercel).
2. Set the following variables with the Gmail workspace account you provided:
   - `SMTP_EMAIL=ky.group.solutions@gmail.com`
   - `SMTP_PASSWORD=auvl zyme mgym kwnc` (app password, not your human login)
   - `CONTACT_FORM_TO=karimyoussef6994@gmail.com`
   - Optional: leave `CONTACT_FORM_FROM` as `"KY Group Ops <kyoussef6994@gmail.com>"` so every brand replies from the same inbox.
3. Keep the defaults for `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_SECURE=true` unless Gmail gives you different ports.
4. Restart the Next.js app (and `cloudflared` tunnel) so the new env variables load.

Every contact/estimate form submission now flows as follows:

- Lead data saves to Supabase + EspoCRM (unchanged).
- An admin notification is sent via Gmail SMTP to `CONTACT_FORM_TO` with the React email template.
- The lead automatically receives a branded acknowledgment email from the same Gmail account so they can reply directly.

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
