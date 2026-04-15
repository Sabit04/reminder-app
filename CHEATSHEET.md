# Reminder App — Cheat Sheet

## Links
- **Live app:** https://personal-reminder-891c2.web.app
- **Source code:** https://github.com/Sabit04/reminder-app
- **Firebase console:** https://console.firebase.google.com/project/personal-reminder-891c2

## Project folder
```
/Users/sabitrazzak/ClaudeCode/reminder-app
```

---

## Common commands

### Run locally (development)
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
npm run dev
```
Opens at http://localhost:5173

### Deploy code changes to the live site
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
npm run build
firebase deploy --only hosting
```

### Pause the site (shows 404)
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
firebase hosting:disable
```

### Resume the site
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
firebase deploy --only hosting
```

### Push code changes to GitHub
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
git add .
git commit -m "describe what you changed"
git push
```
(Use your GitHub Personal Access Token as the password when prompted.)

---

## How to show it off

**To a recruiter (link):**
Just send the two links above. They click, they see.

**In person / interview:**
1. Open https://personal-reminder-891c2.web.app on laptop
2. Open the same URL on your phone
3. Sign in on both with the same Google account
4. Add a reminder on phone → appears instantly on laptop (real-time sync demo)

**On your resume:**
```
Personal Reminder Website | React, JavaScript, Firebase
github.com/Sabit04/reminder-app  |  personal-reminder-891c2.web.app
```

---

## Cost / safety

- **Free** on Firebase Spark plan. Cannot be billed without explicit upgrade.
- Quotas: 10 GB hosting, 50k Firestore reads/day, 20k writes/day. Way more than you'll use.
- Check usage: Firebase Console → Settings → Usage and billing.
- Other users can sign in with their own Google account but **cannot see your data** (Firestore rules enforce this).

## Delete the project entirely
Firebase Console → Settings → General → scroll to bottom → **Delete project**.
(Irreversible — deletes all data, auth users, and the hosted site.)
