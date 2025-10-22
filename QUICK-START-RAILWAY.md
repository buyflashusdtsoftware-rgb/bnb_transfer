# 🚀 Deploy to Railway in 5 Minutes (EASIEST METHOD)

## ⭐ Why Railway?
- ✅ **FREE** $5 credits every month
- ✅ Enough for 24/7 bot operation
- ✅ Easiest setup
- ✅ Automatic restarts if it crashes
- ✅ Great logs to monitor your bot

---

## 📋 Step-by-Step Instructions

### Step 1: Create Railway Account (1 minute)
1. Go to **https://railway.app/**
2. Click **"Login"** or **"Start a New Project"**
3. Sign up with **GitHub** (fastest method)
4. You'll get **$5 free credits** every month

### Step 2: Install Railway CLI (1 minute)
Open your terminal and run:
```bash
npm install -g @railway/cli
```

### Step 3: Login to Railway (30 seconds)
```bash
railway login
```
A browser window will open - click "Authorize"

### Step 4: Deploy Your Bot (2 minutes)
```bash
cd "/Users/nfonjoseph/Documents/Wallet transfer bot"
railway init
railway up
```

When prompted:
- Project name: `bnb-transfer-bot` (or any name)
- Select "Empty Project"

### Step 5: Set Environment Variables (1 minute)

#### Option A: Via Railway Dashboard (Recommended)
1. Go to https://railway.app/dashboard
2. Click on your project
3. Click **"Variables"** tab
4. Click **"+ New Variable"** and add each one:

```
SEED_PHRASE = plug oven noise icon ball bicycle cram grunt knock sad address increase
BINANCE_ADDRESS = 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01
BSC_RPC_URL = https://bsc-dataseed1.binance.org/
MIN_BALANCE_TO_TRANSFER = 0.01
CHECK_INTERVAL_SECONDS = 10
```

#### Option B: Via CLI (Advanced)
```bash
railway variables set SEED_PHRASE="plug oven noise icon ball bicycle cram grunt knock sad address increase"
railway variables set BINANCE_ADDRESS="0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01"
railway variables set BSC_RPC_URL="https://bsc-dataseed1.binance.org/"
railway variables set MIN_BALANCE_TO_TRANSFER="0.01"
railway variables set CHECK_INTERVAL_SECONDS="10"
```

### Step 6: Monitor Your Bot! 🎉

Go to your Railway dashboard:
- **Deployments** → See deployment status
- **Logs** → Watch your bot in real-time!

You should see:
```
🤖 BNB Auto-Transfer Bot Starting...
✅ Configuration validated successfully
🔐 Wallet initialized successfully
📍 Monitoring address: 0xDaEE1F85052B16aDA4c9c6A5bcb82A6875Ed1393

[2025-10-21 23:45:25] Check #1
💼 Current balance: 0.0 BNB
⏳ Waiting for funds...
⏰ Next check in 10 seconds
```

---

## 🎯 Verification Checklist

✅ Bot shows "Configuration validated successfully"  
✅ Bot shows your wallet address (0xDaEE1F85052B16aDA4c9c6A5bcb82A6875Ed1393)  
✅ Bot shows "Next check in 10 seconds"  
✅ Check counter increases (#1, #2, #3...)  
✅ No red error messages  

---

## 📊 Monitoring

### View Logs (Real-time):
**Option 1 - Dashboard:**
- Go to https://railway.app/dashboard
- Click your project → **Logs** tab

**Option 2 - CLI:**
```bash
railway logs
```

### Check Status:
- Green dot = Running ✅
- Red dot = Stopped ❌
- Yellow dot = Deploying 🔄

---

## 💰 Cost Breakdown

Railway gives you **$5 free credits** every month:
- Your bot uses ~$3-4/month running 24/7
- **Completely covered by free tier!**
- No credit card needed initially

---

## ⏱️ Timeline

- **Today:** Bot deployed and monitoring
- **Oct 25, 2025 ~3:41 PM:** Your BNB becomes available
- **Within 10 seconds:** Bot detects and transfers automatically
- **After transfer:** Bot shuts down automatically

---

## 🛑 How to Stop the Bot (if needed)

**Via Dashboard:**
1. Go to your project in Railway
2. Click **Settings** → **Danger Zone** → **Delete Service**

**Via CLI:**
```bash
railway down
```

---

## 🆘 Troubleshooting

### Bot not starting?
- Check environment variables are set correctly
- View logs for error messages

### Bot showing errors?
- Most errors are temporary (network timeouts)
- Bot will retry automatically
- Check logs for pattern of errors

### Can't see logs?
- Dashboard → Your Project → **Logs** tab
- Or run: `railway logs`

---

## 🎉 After Successful Transfer

1. ✅ Bot automatically shuts down
2. ✅ Check your Binance wallet for BNB
3. ✅ Delete the Railway project (optional, for security)
4. ✅ Keep the $5 credits for next month!

---

## 📱 Useful Commands

```bash
# View logs
railway logs

# Check status
railway status

# Restart bot (if needed)
railway up --detach

# Stop bot
railway down

# View environment variables
railway variables
```

---

## 🔒 Security Reminder

- ✅ Your seed phrase is stored securely as environment variables
- ✅ NOT visible in logs
- ✅ NOT in your code
- ✅ Only you can access it
- ✅ Delete after use for extra security

---

## ✨ You're All Set!

Your bot is now running 24/7 in the cloud, monitoring your wallet every 10 seconds!

**No need to keep your computer on!** 🎉

Railway will handle everything and your BNB will be automatically transferred to Binance on October 25th!

