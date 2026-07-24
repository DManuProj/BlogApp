# DHive — Blog & Publishing Platform (Frontend)

DHive is a full-stack **MERN** blogging and content-publishing platform. This repository holds the **two front-end applications**; the API lives in a separate repo ([Dhive-Backend](https://github.com/dulana-wanigathunga/Dhive-Backend)).

| App | Folder | Description | Live |
| --- | --- | --- | --- |
| **Blog (client)** | [`frontend/`](./frontend) | Public-facing site where readers browse posts, writers, and comments | https://dhive-frontend-delta.vercel.app |
| **Dashboard** | [`dashboard/`](./dashboard) | Writer/admin panel — create & manage posts, view analytics and followers | https://dhive-frontend-cjut.vercel.app |

> **API:** `https://dhive-backend.vercel.app/api` 

---

## ✨ Features

- **Authentication** — Google OAuth (`@react-oauth/google`) and email/password with OTP email verification, secured with JWT.
- **Content** — create, edit, and delete posts with a rich-text editor and cover images.
- **Engagement** — nested comments, likes, and a follow/unfollow system for writers.
- **Writer dashboard** — analytics (posts, followers, views), content management, and follower lists with charts.
- **Media** — image uploads via **Cloudinary**.
- **Responsive UI** — light/dark mode, built mobile-first.

---

## 🛠 Tech Stack

**Both apps:** React 18 (Create React App), React Router, Redux Toolkit, Axios, Formik + Yup, Tailwind CSS, Framer Motion, `@react-oauth/google`, Cloudinary.

- **`frontend/`** — MUI, Swiper, `markdown-to-jsx`.
- **`dashboard/`** — Mantine, Recharts (analytics), React Quill / Tiptap (editor), Moment.

**Backend (separate repo):** Node.js, Express, MongoDB (Mongoose), JWT, Nodemailer.

**Hosting:** Vercel (both front-ends + API), MongoDB Atlas, Cloudinary.

---

## 📁 Structure

```
Dhive-Frontend/
├── frontend/     # public blog (CRA)
│   ├── src/
│   └── .env      # create from .env.example
└── dashboard/    # writer/admin dashboard (CRA)
    ├── src/
    └── .env      # create from .env.example
```

Each app is an independent Create React App with its own `package.json` and env file.

---

## 🚀 Getting Started

Run each app separately (they use different ports).

```bash
# Blog client
cd frontend
npm install
cp .env.example .env   # fill in the values
npm start              # http://localhost:3000

# Dashboard (in a second terminal)
cd dashboard
npm install
cp .env.example .env
npm start              # http://localhost:3001
```

Start the [backend](https://github.com/dulana-wanigathunga/Dhive-Backend) as well so the apps have an API to talk to.

---

## 🔑 Environment Variables

Create a `.env` in **each** app (see each app's `.env.example`):

| Variable | Used by | Description |
| --- | --- | --- |
| `REACT_APP_API_URL` | both | Backend base URL, **must end in `/api`** (e.g. `https://dhive-backend.vercel.app/api`) |
| `REACT_APP_GOOGLE_CLIENT_ID` | both | Google OAuth 2.0 Web client ID |
| `REACT_APP_DASHBOARD_URL` | frontend | URL of the deployed dashboard (navbar link) |

> Cloudinary uses an unsigned upload preset configured directly in `src/util/index.js` (public by design).

---

## ☁️ Deployment (Vercel)

Deploy each folder as its **own Vercel project** from this repo:

1. **Import** the repo → set **Root Directory** to `frontend` (or `dashboard`).
2. Framework preset: **Create React App**.
3. Add the environment variables above.
4. Deploy. Each push to `master` auto-deploys both projects.

A `vercel.json` in each app rewrites all routes to `index.html` for client-side routing.

---

## 📬 Contact

**Dulana Wanigathunga** — dulana.m.waniga@gmail.com

Backend repo: https://github.com/dulana-wanigathunga/Dhive-Backend
