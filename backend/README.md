# Civil Consultancy API

Express REST API backed by MongoDB. It provides account registration/login and client inquiry submission and management.

## Requirements

- Node.js 20 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Run locally

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set `MONGODB_URI`, `JWT_SECRET` (at least 32 characters), and `ADMIN_API_KEY` in `.env`, then run:

```powershell
npm run dev
```

The API listens on `http://localhost:5000`. MongoDB must be reachable before the API starts. Set `FRONTEND_URL` to the Vite origin; multiple origins may be comma-separated.

## Endpoints

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | API and MongoDB readiness |
| POST | `/api/auth/register` | Public | Create client account; returns a JWT |
| POST | `/api/auth/login` | Public | Log in client; returns a JWT |
| GET | `/api/auth/me` | Bearer token | Get the authenticated client |
| POST | `/api/inquiries` | Public | Save a client inquiry |
| GET | `/api/inquiries?page=1&limit=20&status=new` | Admin key | List inquiries, newest first |
| PATCH | `/api/inquiries/:id/status` | Admin key | Set status to `new`, `in-progress`, or `closed` |

Inquiry JSON requires `name`, `email`, `phone`, `service`, and `message`. Optional fields are `timeline` and `budget`. The `type` field is accepted as an alias for `service`.

Admin requests must include `X-Admin-Key` with the value configured as `ADMIN_API_KEY`. Keep this key private; it is intended for trusted admin tooling such as Postman, not browser code.

## Postman

Import `postman/Civil-Consultancy-API.postman_collection.json` into Postman. Set the collection's `adminKey` variable to the `.env` `ADMIN_API_KEY`, then run **Check API and MongoDB** first. Register or log in to capture the JWT automatically, and submit an inquiry to populate the inquiry ID variable.

## Data and security

Client passwords are stored as bcrypt hashes in the `clients` collection. JWTs are signed with `JWT_SECRET`. Public request bodies are size-limited and validated; admin inquiry operations require the separate admin key.