# Setup Guide

Follow these steps in order. Everything is free.

---

## Part 1 · Firebase project (5 min)

### 1.1 Create the project
1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `reminder-app` (or anything) → **Continue**
3. Disable Google Analytics (not needed) → **Create project**

### 1.2 Enable Authentication
1. In the left sidebar: **Security → Authentication** → **Get started**
2. Under **Sign-in method**, click **Google** → toggle **Enable**
3. Set a support email (your own) → **Save**

### 1.3 Enable Firestore
1. Left sidebar: **Database and storage → Firestore Database** → **Create database**
2. Pick the region closest to you (e.g. `us-east1`) → **Next**
3. Start in **production mode** → **Create**

### 1.4 Paste the security rules
1. Still in Firestore → **Rules** tab
2. Delete everything in the editor and paste the contents of [`firestore.rules`](./firestore.rules)
3. Click **Publish**

### 1.5 Register the web app & get the config
1. Go to **Project settings** (gear icon, top-left)
2. Scroll to **Your apps** → click the `</>` (Web) icon
3. Nickname: `reminder-web` → **Register app** (skip hosting for now)
4. Copy the `firebaseConfig` object it shows you
5. Paste those values into `src/firebase.js`, replacing every `REPLACE_ME`

### 1.6 Run it locally
```bash
npm run dev
```
Open the URL it prints (usually http://localhost:5173). Sign in with Google. Add a reminder.

To prove real-time sync works: open the same URL in a second browser window, sign in with the same account. Adding a reminder in one updates the other instantly.

---

## Part 2 · Deploy to Firebase Hosting (5 min)

### 2.1 Install the Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```
A browser window opens — sign in with the same Google account.

### 2.2 Initialize hosting
From inside the `reminder-app/` folder:
```bash
firebase init hosting
```
Answer the prompts:
- **Use an existing project** → pick the project you just created
- **Public directory** → type `dist`
- **Configure as a single-page app?** → `y`
- **Set up automatic builds with GitHub?** → `n` (skip for now)
- **File dist/index.html already exists. Overwrite?** → `n`

### 2.3 Deploy
```bash
npm run build
firebase deploy --only hosting
```

The CLI prints a **Hosting URL** like `https://reminder-app-xxxxx.web.app`. That's your live site. Share it with anyone.

### 2.4 Add this domain to Auth (if sign-in fails in production)
1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. The `.web.app` domain is auto-added. If not, add it here.

---

## Part 3 · Push to GitHub (5 min)

### 3.1 Create the repo on GitHub
1. Go to https://github.com/new
2. Name: `reminder-app` → **Public** → leave everything else unchecked → **Create repository**
3. On the next page, copy the URL it shows (it ends with `.git`)

### 3.2 Push from your terminal
From inside the `reminder-app/` folder:
```bash
git init
git add .
git commit -m "Initial commit: reminder app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reminder-app.git
git push -u origin main
```
Replace `YOUR_USERNAME/reminder-app.git` with the URL you copied.

If GitHub asks for a password, it actually wants a **Personal Access Token**:
1. https://github.com/settings/tokens → **Generate new token (classic)**
2. Scope: `repo` → generate → copy the token → paste it as the password

### 3.3 Add the live URL to your repo
On the GitHub repo page, click the gear next to **About** (right side) and paste your Firebase Hosting URL. Now recruiters can click "repo → live demo" in one step.

---

## What to put on your resume
- **Repo:** `github.com/YOUR_USERNAME/reminder-app`
- **Live demo:** your `.web.app` URL

Both links are public, both work from any device, no screen share needed.
