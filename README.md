---

# 🌟 Profile App

An interactive **Node.js application** running with **Docker Compose** for smooth local development and deployment.
This project is designed for simplicity — just spin it up and start coding!

---

## 📦 Features

* ⚡ **Node.js 20** with [Bitnami Node](https://hub.docker.com/r/bitnami/node) base image
* 🔄 **Hot-reload** via volume mapping (`.:/app`)
* 🛠️ Auto `npm install → build → start` on container launch
* 🐳 Simple `docker-compose.yml` — no extra configs required
* 🚀 Runs on **[http://localhost:5001](http://localhost:5001)** by default

---

## 🏗️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/profile-app.git
cd profile-app
```

### 2️⃣ Start the App with Docker

```bash
docker-compose up --build
```

This will:

* Install dependencies (`npm install`)
* Build the project (`npm run build`)
* Start the app (`npm start`)

Your app will be live at 👉 [http://localhost:5001](http://localhost:5001)

---

## ⚙️ Development Workflow

* Edit your code locally — changes are instantly reflected inside the container.
* Logs are streamed directly in your terminal:

```bash
docker-compose logs -f
```

* Stop the app:

```bash
docker-compose down
```

---

## 📂 Project Structure

```
.
├── docker-compose.yml    # Docker setup
├── package.json          # NPM dependencies & scripts
├── src/                  # App source code
├── build/                # Compiled output (ignored in dev)
└── README.md             # You are here ✨
```

---

## 🐳 Docker Compose Overview

```yaml
services:
  profile-app:
    image: bitnami/node:20
    working_dir: /app
    volumes:
      - .:/app
    command: bash -c "npm install && npm run build && npm start"
    ports:
      - "5001:5001"
```

---

## 📖 Scripts

| Script          | Description          |
| --------------- | -------------------- |
| `npm install`   | Install dependencies |
| `npm run build` | Build the app        |
| `npm start`     | Start the app        |

---

## 🚀 Deployment

To run in detached mode:

```bash
docker-compose up -d --build
```

To rebuild from scratch:

```bash
docker-compose down -v
docker-compose up --build
```

---

## 👨‍💻 Author

**Ankit Aditya**
🌐 [ankitaditya.in](https://ankitaditya.in)
🔗 [LinkedIn](https://linkedin.com/in/adykits) • [GitHub](https://github.com/ankitaditya)

---

## ⭐ Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📜 License

[MIT](LICENSE) — Free to use, modify, and distribute.

---

✨ **Simple. Exact. Collective.**

---
