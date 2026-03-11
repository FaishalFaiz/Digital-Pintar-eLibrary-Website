# 📲 Digital Pintar - Smart E-Library Ecosystem

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 👋 About The Project
**Digital Pintar** is a modern *Smart E-Library* platform built to bridge the gap between traditional book management and digital accessibility. This project leverages the power of **Laravel** as a robust API backend and **React.js** for a seamless, high-performance user experience.

What makes it "Smart"? It doesn't just store local data; it integrates directly with the **Google Books API**, allowing users to explore millions of titles across the globe in real-time! 🚀

### ✨ Key Features:
* 🔍 **Global Discovery:** Real-time book search powered by **Google Books API**.
* ⚡ **SPA Architecture:** Lightning-fast navigation and state management using **React.js**.
* 🛡️ **Secure Authentication:** Robust user Auth system powered by Laravel.
* 🎨 **Modern Design:** Beautifully crafted UI using **Tailwind CSS v4.2** for a clean, responsive aesthetic.

---

## 🛠️ Tech Stack
* **Back-end:** Laravel 11
* **Front-end:** React.js (Vite)
* **Styling:** Tailwind CSS 4.2 🚀
* **Database:** MySQL
* **Integration:** Google Books API

---

## 💻 Installation (Local Development)

Ready to get this project running on your local machine? Just follow these steps:

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone [https://github.com/FaishalFaiz/Digital-Pintar](https://github.com/FaishalFaiz/Digital-Pintar)

# Navigate to the project folder
cd Digital-Pintar

# Install PHP dependencies
composer install

# Install Frontend dependencies
npm install
```

### 2. Configure Environment ⚙️
Duplicate the .env.example file and rename it to .env. Then, update the following fields:
```bash
DB_DATABASE= digital_pintar
GOOGLE_BOOKS_API_KEY= (Your_API_Key_Here)
```

### 3. Database Migration & Keys
```bash
# Generate app key
php artisan key:generate

# Run migrations and seed dummy data
php artisan migrate --seed
```

### 4. Fire It Up! 🚀
Open two terminal windows/tabs:
```bash
Terminal 1 (Backend): php artisan serve

Terminal 2 (Frontend): npm run dev
```