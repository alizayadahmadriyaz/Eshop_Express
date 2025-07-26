# 🛍️  E-Shop Backend Application

A complete e-commerce backend system built with **Node.js**, **Express**, **MongoDB**, and **Redis**. It supports product listings, shopping cart management, user authentication, and background job processing using **BullMQ** and **Redis**.

---

## 🚀 Features

- 🧑‍💼 User authentication (JWT-based)
- 🛒 Add-to-cart and auto-expiry cleanup (BullMQ)
- 📦 Product management (CRUD)
- 📈 Order placement
- 🗃 MongoDB for data storage
- 🧰 Redis for job queueing
- 🐳 Dockerized services

---

## 📂 Clone repository
```bash
    git clone https://github.com/alizayadahmadriyaz/Eshop_Express.git
    cd Eshop_Express
```

##  Install Dependencies
```bash
    npm install
```


## 📂 Env file
```bash
    nano .env
```

```bash
    MONGODB_URI=mongodb://mongo:27017/ecommerce
    JWT_SECRET=your_super_secret_key_here
    JWT_SECRET_USER=your_super_secret_key_USER_here
    PORT=XXXX
```
## Run Docker Compose
```bash
    docker-compose up --build
```

## Check running containers
```bash
    docker ps
```





