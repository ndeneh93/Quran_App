# **MGQS Node.js Qur’an Reading Application**

A simple Qur’an reading web application built with **Node.js**.
The app allows users to browse all chapters (surahs), read verses, and bookmark specific verses.
Bookmarks are saved per user based on their **IP address**.

---

## **📌 Features**

### **1. Chapters List**

* Displays all **114 Qur’an chapters**.
* Shows basic chapter information (name, number, verses count).
* Clicking a chapter navigates to the **Single Chapter** page.

### **2. Single Chapter View**

* Displays all verses of the selected chapter.
* Verses are readable and well formatted.
* Each verse includes:

  * **Bookmark** button if not yet bookmarked.
  * **Remove Bookmark** button if already bookmarked for the current user (IP).

### **3. Bookmarks Page**

* Shows all verses bookmarked by the current user.
* User identification is based on **IP address**.
* IP collisions or dynamic IPs are ignored for this assessment.

---

## **📡 Data Source**

The Qur’an text should be fetched from a **public Qur’an API**, such as:

* [https://api.quran.com](https://api.quran.com)
* [https://alquran.cloud/api](https://alquran.cloud/api)

You may choose any reliable API.

---

## **🧠 How User Identification Works**

* The app uses the **visitor’s IP address** as a unique identifier.
* This determines which bookmarked verses belong to the user.
* For simplicity, the application **does not attempt** to handle:

  * Shared IP usage
  * Changing or dynamic IPs

---

## **🛠️ High-Level Requirements**

### **Application Pages**

1. **Chapters List Page**

   * Fetch and display all 114 chapters.
   * Clicking a chapter opens its detail page.

2. **Single Chapter Page**

   * Show all verses in the chapter.
   * Each verse must have:

     * Add Bookmark
     * Remove Bookmark (if already added)

3. **Bookmarks Page**

   * List all verses bookmarked by the current IP.

---

## **📁 Project Structure (Suggested)**

```
/project
 ├── src
 │    ├── routes
 │    ├── controllers
 │    ├── services
 │    ├── views (if using templating)
 │    └── database
 ├── public
 ├── README.md
 └── package.json
```

---

## **💾 Data Storage**

Any persistent storage is acceptable:

* SQLite
* JSON file (lowdb)
* Redis
* MongoDB

The only requirement is that **bookmarks persist** between server restarts.

---

## **🚀 Getting Started**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Run the Application**

```bash
npm start
```

### **3. Environment Variables (example)**

```
PORT=3000
QURAN_API_BASE_URL=https://api.quran.com/api/v4
```

---

## **✨ Optional Enhancements**

(Not required, but useful for demonstrating depth)

* Search chapters or verses
* Multiple translations with toggle
* Caching Qur’an API responses
* Export/import bookmarks
* PWA (offline reading)
* Docker deployment
* Unit tests (Jest + Supertest)


If you'd like, I can also **convert this into a fully polished GitHub-style README**, add badges, or generate a **starter folder structure and boilerplate code**.
