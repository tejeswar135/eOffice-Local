# e-Tappal & Tottenham Management System (Full-Stack Architecture)
### Andhra Pradesh Panchayat Raj & Rural Development Department
**Office Unit:** Madanapuram Gram Panchayat, Saravakota Mandal, Srikakulam District

---

## 1. Full-Stack Architecture & Tech Stack

### Frontend Client Tier
* **Framework:** React 18 + TypeScript + Vite.
* **Architecture:** Modular component architecture with React Context for Authentication and RBAC.
* **Local Offline Database:** `IndexedDB` via `Dexie.js` for persistent storage during offline field visits.
* **PWA:** Service Worker caching application shell and background sync queueing.

### Backend API Tier
* **Runtime & Framework:** Node.js (v18+) with Express and TypeScript.
* **Authentication & RBAC:** JSON Web Tokens (JWT) with multi-seat delegation (`PS-01`, `DA-01`, `EA-01`, `WEA-01`).
* **Database & Locking:** Relational sequence counters with atomic locking to prevent duplicate correspondence numbers across multiple Sachivalayam users.
* **Rest API Endpoints:** Clean RESTful routes for Inwards, Personal Register (PR), eFiles, Noting, Outward Dispatch, and Offline Batch Sync.

---

## 2. Directory Structure

```
etappal-fullstack/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                      # Express server entry point (Port 4000)
│       ├── types/index.ts                # Backend DTOs and UserPayload interfaces
│       ├── db/database.ts                # In-memory relational state / PostgreSQL / SQLite binding
│       ├── middleware/auth.ts            # JWT authentication and seat authorization middleware
│       ├── controllers/
│       │   ├── authController.ts         # Login, seat-switch, session management
│       │   ├── inwardController.ts       # Inward Diarization and PR acceptance
│       │   ├── fileController.ts         # eFile creation, Green/Yellow noting, linking
│       │   ├── outwardController.ts      # Outward issuance & postal stamp ledger
│       │   └── syncController.ts         # Offline-to-online batch synchronization
│       └── routes/
│           └── apiRoutes.ts              # API router mounting all modular endpoints
├── frontend/
│   ├── package.json
│   ├── index.html                        # Vite application root
│   └── src/
│       ├── main.tsx                      # React root rendering
│       ├── App.tsx                       # Main application shell with tab navigation
│       ├── types/index.ts                # Frontend domain models
│       ├── context/AuthContext.tsx       # Auth provider, seat switcher, session storage
│       └── components/
│           ├── auth/LoginModal.tsx       # Official Sachivalayam login dialog
│           ├── layout/Header.tsx         # Header with AP Gov branding, seat badge, offline pill
│           └── pr/PersonalRegisterTable.tsx # 8-column Tottenham Form 11 Personal Register
└── scripts/
    └── start.sh                          # One-click startup script for both services
```

---

## 3. Login & Authentication Flow

1. **Official Authentication:**
   * Login endpoint: `POST /api/auth/login`.
   * Accepts employee code (`PS-10492`) and security PIN (`1234`).
   * Returns a signed JWT token containing user identity and authorized seats list.
2. **Seat Switching (In-Charge Workflow):**
   * If the Panchayat Secretary holds additional charge of the Digital Assistant seat:
   * Endpoint: `POST /api/auth/switch-seat` with `{ targetSeat: 'DA-01' }`.
   * Reissues the session token scoped to `DA-01` without requiring re-authentication.
3. **Offline Fallback:**
   * If disconnected from the backend API, the client-side `AuthContext` validates against local credentials in IndexedDB/LocalStorage, allowing uninterrupted offline access.

---

## 4. How to Run Locally

### Start Backend:
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:4000
# Health check: http://localhost:4000/health
```

### Start Frontend:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```
