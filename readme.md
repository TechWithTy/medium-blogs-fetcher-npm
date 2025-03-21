# 📢 Medium Blogs Fetcher

![NPM Version](https://img.shields.io/npm/v/medium-blogs-fetcher) ![License](https://img.shields.io/github/license/TechWithTy/medium-blogs-fetcher-npm)

A simple **Node.js package** to fetch **Medium user profiles and blog posts** via **web scraping & RSS feeds**. 📖

---

## 🚀 Features

✅ Fetch **Medium user profile** (avatar, bio, profile URL)
✅ Get a user's **latest blog posts** from Medium
✅ Works with **any Medium username**
✅ Lightweight and fast ⚡

---

## 📦 Installation

Install via **npm**:
```sh
npm install medium-blogs-fetcher
```

or using **yarn**:
```sh
yarn add medium-blogs-fetcher
```

---

## 🛠️ Usage

### **1️⃣ Fetch a Medium User Profile**
```javascript
import { getMediumUserProfile } from "medium-blogs-fetcher";

(async () => {
    const profile = await getMediumUserProfile("codingoni");
    console.log("🔹 Medium Profile:", profile);
})();
```
📌 **Response Example:**
```json
{
  "username": "codingoni",
  "avatar": "https://cdn-images-1.medium.com/fit/c/64/64/some-avatar.png",
  "bio": "Tech enthusiast and blogger",
  "profileUrl": "https://medium.com/@codingoni"
}
```

---

Here’s your **updated section** with the latest functionality, including support for **custom headers and proxies**:  

---

### **✅ Updated Section for README**
This package **does not require an API key**, but you can customize request headers and use a proxy if needed:

```javascript
import { getMediumUserProfile } from "medium-blogs-fetcher";

const options = {
  headers: { 
    "User-Agent": "Mozilla/5.0", 
    "Authorization": "Bearer YOUR_TOKEN_HERE" // Optional
  },
  proxy: { 
    host: "123.45.67.89", 
    port: 8080 
  } // Optional
};

const profile = await getMediumUserProfile("codingoni", options);
console.log(profile);
```

---

### **🔹 What’s New?**
✅ **Custom Headers** → Pass authentication tokens or modify `User-Agent`  
✅ **Proxy Support** → Fetch Medium data even behind a firewall  
✅ **Improved Flexibility** → Works without API keys  

Would you like me to update the **usage examples** for blogs and avatars as well? 🚀
```
📌 **Response Example:**
```json
[
  {
    "title": "How to Build a Node.js API",
    "link": "https://medium.com/@codingoni/how-to-build-a-nodejs-api",
    "categories": ["JavaScript", "API"],
    "description": "Learn how to build a RESTful API using Node.js and Express...",
    "content": "<p>This is the full blog content...</p>",
    "published": "2024-03-20T12:34:56Z"
  }
]
```

---

## ⚙️ Configuration (Optional)

This package **does not require an API key**, but you can customize the request headers:
```javascript
import { getMediumUserProfile } from "medium-blogs-fetcher";

const headers = { "User-Agent": "Mozilla/5.0" };
const profile = await getMediumUserProfile("codingoni", headers);
```

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! 🚀 If you'd like to improve this package:
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push and submit a **Pull Request**

---

## 🌟 Support

If you find this package useful, please ⭐ star the repo and share it! 😊

