# 📊 Dashboard Assignment  

A **React-based dynamic dashboard** built as part of the **Frontend Trainee Assignment**.  
The dashboard replicates the provided design and includes features such as widget management, search functionality, and persistence across refresh.  

---
**Deployed & live at**:  
https://dashboard-assignment-six-chi.vercel.app/
<img width="1871" height="938" alt="image" src="https://github.com/user-attachments/assets/bf020253-9678-4c86-a6d0-4a5d2a430d9d" />


## 🚀 Features  
- 📌 Dynamic widgets with add/remove functionality  
- 🔍 Search feature for quick filtering  
- ♻️ State persistence (widgets remain after refresh)  
- 📈 Charts powered by **Recharts**  
- ⚡ Built with **React** for performance and scalability  

---

## 🛠️ Tech Stack  
- **React** (Frontend framework)  
- **Recharts** (Data visualization)  
- **CSS** (Styling)  
- **Node.js + npm** (Build & dependency management)  

---

## 📂 Project Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/shankar212/dashboard-assignment.git
cd dashboard-assignment
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Run Locally  
```bash
npm start
```
Now open 👉 [http://localhost:3000](http://localhost:3000)  

### 4️⃣ Build for Production  
```bash
npm run build
```
This generates an optimized **`build/`** folder ready for deployment.  

---

## 🌐 Deploy on GitHub Pages (Optional)  

1. Install gh-pages:  
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these lines in **`package.json`**:  
   ```json
   "homepage": "https://yourusername.github.io/dashboard-assignment",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy with:  
   ```bash
   npm run deploy
   ```

---

## 📤 Pushing Code to GitHub  

```bash
git init
git add .
git commit -m "Initial commit: Dashboard assignment"
git branch -M main
git remote add origin https://github.com/shankar212/dashboard-assignment.git
git push -u origin main
```

✅ Now your project is live on GitHub!  

---

## 📝 License  
This project is built for **learning and assignment purposes**.  
