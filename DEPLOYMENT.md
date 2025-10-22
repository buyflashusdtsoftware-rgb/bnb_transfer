# 🚀 Deployment Guide - Run Your Bot 24/7 for FREE

This guide shows you how to deploy your BNB auto-transfer bot on free cloud platforms so it runs continuously.

---

## ⭐ OPTION 1: Railway (EASIEST & RECOMMENDED)

**Free Tier:** $5 credits/month (enough for 24/7 running)

### Step-by-Step:

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - If not using GitHub, select "Empty Project"

3. **Upload Your Bot (Without GitHub)**
   - Install Railway CLI: `npm install -g @railway/cli`
   - Login: `railway login`
   - Initialize: `railway init`
   - Link project: `railway link`
   
4. **Set Environment Variables**
   - In Railway dashboard, go to your project
   - Click "Variables" tab
   - Add these variables:
     ```
     SEED_PHRASE = plug oven noise icon ball bicycle cram grunt knock sad address increase
     BINANCE_ADDRESS = 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01
     BSC_RPC_URL = https://bsc-dataseed1.binance.org/
     MIN_BALANCE_TO_TRANSFER = 0.01
     CHECK_INTERVAL_SECONDS = 10
     ```

5. **Deploy**
   - Run: `railway up`
   - Or push code if using GitHub
   
6. **Monitor**
   - View logs in Railway dashboard
   - See real-time bot activity

**Cost:** FREE for first $5/month usage (enough for continuous running)

---

## 🟣 OPTION 2: Render

**Free Tier:** 750 hours/month (enough for 24/7)

### Step-by-Step:

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up (no credit card needed)

2. **Create New Web Service**
   - Click "New +"
   - Select "Background Worker"
   - Connect GitHub or upload code manually

3. **Configure Service**
   - Name: `bnb-transfer-bot`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add these variables:
     ```
     SEED_PHRASE = plug oven noise icon ball bicycle cram grunt knock sad address increase
     BINANCE_ADDRESS = 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01
     BSC_RPC_URL = https://bsc-dataseed1.binance.org/
     MIN_BALANCE_TO_TRANSFER = 0.01
     CHECK_INTERVAL_SECONDS = 10
     ```

5. **Deploy**
   - Click "Create Background Worker"
   - Wait for deployment to complete

6. **Monitor Logs**
   - Click "Logs" tab to see bot activity
   - See real-time balance checks

**Cost:** FREE (750 hours/month)

---

## 🟠 OPTION 3: Fly.io

**Free Tier:** 3 shared CPUs, 256MB RAM free

### Step-by-Step:

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**
   ```bash
   fly auth login
   ```

3. **Initialize App**
   ```bash
   cd "/Users/nfonjoseph/Documents/Wallet transfer bot"
   fly launch --no-deploy
   ```

4. **Set Secrets (Environment Variables)**
   ```bash
   fly secrets set SEED_PHRASE="plug oven noise icon ball bicycle cram grunt knock sad address increase"
   fly secrets set BINANCE_ADDRESS="0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01"
   fly secrets set BSC_RPC_URL="https://bsc-dataseed1.binance.org/"
   fly secrets set MIN_BALANCE_TO_TRANSFER="0.01"
   fly secrets set CHECK_INTERVAL_SECONDS="10"
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **View Logs**
   ```bash
   fly logs
   ```

**Cost:** FREE (within limits)

---

## 🔴 OPTION 4: Oracle Cloud (FREE FOREVER)

**Free Tier:** Completely free, never expires

### Step-by-Step:

1. **Create Oracle Cloud Account**
   - Go to https://www.oracle.com/cloud/free/
   - Sign up (requires credit card for verification, but won't charge)

2. **Create Compute Instance**
   - Click "Create Instance"
   - Choose "Always Free Eligible" shape
   - Select Ubuntu 22.04
   - Download SSH key

3. **Connect via SSH**
   ```bash
   ssh ubuntu@<your-instance-ip> -i <your-key.pem>
   ```

4. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

5. **Upload Your Bot**
   ```bash
   # On your local machine:
   scp -r "/Users/nfonjoseph/Documents/Wallet transfer bot" ubuntu@<your-instance-ip>:~/bot
   ```

6. **Install Dependencies**
   ```bash
   cd ~/bot
   npm install
   ```

7. **Run with PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name bnb-bot
   pm2 save
   pm2 startup
   ```

8. **Monitor**
   ```bash
   pm2 logs bnb-bot
   pm2 status
   ```

**Cost:** FREE FOREVER

---

## 🟢 OPTION 5: Replit (Quick Test)

**Free Tier:** Yes, but sleeps after inactivity

### Step-by-Step:

1. Go to https://replit.com/
2. Create new Node.js repl
3. Upload your files
4. Add secrets in "Secrets" tab (environment variables)
5. Click "Run"

**Note:** Free tier sleeps after inactivity, not ideal for 24/7

---

## 📊 Comparison Table

| Platform | Cost | Ease | Always On | Best For |
|----------|------|------|-----------|----------|
| **Railway** | $5 credit/mo | ⭐⭐⭐⭐⭐ | ✅ | Beginners |
| **Render** | Free 750h | ⭐⭐⭐⭐⭐ | ✅ | Easy setup |
| **Fly.io** | Free tier | ⭐⭐⭐⭐ | ✅ | CLI users |
| **Oracle** | Free forever | ⭐⭐ | ✅ | Long-term |
| **Replit** | Free | ⭐⭐⭐⭐⭐ | ❌ | Quick test |

---

## 🎯 RECOMMENDED FOR YOU: Railway

**Why?**
- ✅ Easiest setup (5 minutes)
- ✅ Free $5 credits monthly
- ✅ Enough for 24/7 operation
- ✅ Great logs and monitoring
- ✅ Automatic restarts on failure
- ✅ No credit card required initially

---

## 🔒 Security Notes

**For ALL platforms:**
1. ✅ Use environment variables (NEVER commit .env file)
2. ✅ Keep your seed phrase secure
3. ✅ Enable 2FA on the platform account
4. ✅ Delete the deployment after transfer completes

---

## 📱 Monitoring Your Bot

### Railway:
- Dashboard → Logs → See real-time activity
- Get notifications when bot completes

### Render:
- Dashboard → Logs → Real-time monitoring
- Email alerts on failures

### Oracle Cloud:
```bash
pm2 logs bnb-bot --lines 100
```

---

## ⚡ Quick Start Commands

### For Railway:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### For Render:
1. Go to render.com
2. New → Background Worker
3. Connect repo or upload files
4. Add environment variables
5. Deploy!

---

## ❓ Troubleshooting

**Bot stops running:**
- Check platform credits/hours
- Check logs for errors
- Verify environment variables

**Can't see logs:**
- Railway: Dashboard → Deployments → Logs
- Render: Dashboard → Logs tab
- Oracle: `pm2 logs bnb-bot`

**Transfer not happening:**
- Bot needs to run until Oct 25, 2025
- Check if balance appeared
- Verify Binance address is correct

---

## 🎉 After Successful Transfer

1. **Stop the bot** (it auto-stops after transfer)
2. **Delete the deployment** (security best practice)
3. **Remove environment variables** from platform
4. **Check your Binance wallet** for received BNB

---

**Need help?** Check the logs first - they show exactly what the bot is doing!

