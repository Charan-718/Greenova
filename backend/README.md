# GreeNova Backend Service 🌿

Lightweight Express & MongoDB REST API for the **GreeNova** community waste management and recycling platform.

## Features
- **Citizen Problem Reporting**: Submit and review reports for overflowing bins, illegal dumping, missing catalog items, and collection issues.
- **Dynamic Waste Items Catalog**: Searchable and categorised database for proper waste disposal instructions and recycling centers.
- **Community DIY Projects**: User-curated upcycling crafts and creative waste reuse guides.
- **Educational Video Library**: YouTube-linked tutorials on composting, e-waste, and material recycling.
- **Health & Readiness Check**: `/api/health` monitoring MongoDB connection state and server uptime.

---

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Environment**: dotenv, cors

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy the template to `.env`:
```bash
cp .env.example .env
```
Default `.env`:
```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/greenova
```

### 3. Connect to MongoDB
- **Local MongoDB**: Ensure `mongod` is running locally on port 27017.
- **MongoDB Atlas (Cloud)**: Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) and paste your connection string in `.env`:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/greenova?retryWrites=true&w=majority
  ```

### 4. Seed Initial Data
Preload all default waste items, DIY projects, and sample reports:
```bash
npm run seed
```

### 5. Start the Server
```bash
npm start
# Or for live-reload development:
npm run dev
```
The server will start at: `http://localhost:5050`

---

## 📡 REST API Documentation

### System
- `GET /` — API overview and route directory.
- `GET /api/health` — Service health and database connection status.

### Citizen Reports (`/api/reports`)
- `GET /api/reports` — Fetch all reports (supports query params: `?status=Pending&urgency=high`).
- `GET /api/reports/:id` — Get single report details.
- `POST /api/reports` — Submit a new citizen report.
  ```json
  {
    "problemType": "Overflowing Bin",
    "location": "Main Park, Eco Avenue",
    "urgency": "high",
    "description": "Bins near playground are overflowing.",
    "contactEmail": "resident@example.com",
    "allowContact": true
  }
  ```
- `PATCH /api/reports/:id/status` — Update report status (`Pending`, `In Review`, `Resolved`).
- `DELETE /api/reports/:id` — Remove a report.

### Waste Items Catalog (`/api/items`)
- `GET /api/items` — Search items (`?q=pizza&category=Recyclable`).
- `GET /api/items/:id` — Get single item by numeric ID (e.g., `1`) or MongoDB ObjectId.
- `POST /api/items` — Add a new item to the waste catalog.

### DIY Upcycling (`/api/diy-projects`)
- `GET /api/diy-projects` — Fetch all projects (filter by `?category=plastic`).
- `POST /api/diy-projects` — Submit a new upcycling tutorial.

### Video Library (`/api/videos`)
- `GET /api/videos` — Fetch all educational videos.
- `POST /api/videos` — Add a YouTube video tutorial.

---

## 🌐 Free Cloud Deployment (Render.com)

1. Push your repository to GitHub.
2. Go to [render.com](https://render.com) and create a **New Web Service**.
3. Select your repository `Charan-718/Greenova`.
4. Configure service settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Under **Environment Variables**, add:
   - `PORT`: `5050`
   - `MONGODB_URI`: `<Your MongoDB Atlas connection URI>`
6. Click **Create Web Service**. Render will deploy your API and provide a live URL like `https://greenova-backend.onrender.com`.
