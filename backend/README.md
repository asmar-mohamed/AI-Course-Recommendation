# Backend

Install dependencies and run locally:

```bash
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

Notes:
- The auth router is available at `/auth` with endpoints:
- `POST /auth/register` - register a new user (payload: name, email, password). Passwords longer than 72 bytes are rejected (bcrypt limit).
  - `POST /auth/login` - login (payload: email, password)
  - `GET /auth/me` - get current user (requires Authorization: Bearer <token>)
- The default JWT secret is `SECRET_KEY` env var; set it in your environment for production.
