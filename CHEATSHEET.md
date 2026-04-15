# Reminder App — Cheat Sheet

## Live URL
https://personal-reminder-891c2.web.app

## Pause the site
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
firebase hosting:disable
```

## Resume / redeploy the site
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
firebase deploy --only hosting
```

## Deploy code changes
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
npm run build
firebase deploy --only hosting
```

## Run locally (development)
```
cd /Users/sabitrazzak/ClaudeCode/reminder-app
npm run dev
```
Opens at http://localhost:5173

## Check usage / quotas
Firebase Console → Settings → Usage and billing

## Delete the project entirely
Firebase Console → Settings → General → scroll down → Delete project
