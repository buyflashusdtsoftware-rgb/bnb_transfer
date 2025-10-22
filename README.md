# 🤖 BNB Auto-Transfer Bot

Automated bot that monitors your Trust Wallet and automatically transfers all available BNB to your Binance wallet once funds become available after unstaking.

## 🌟 Features

- ✅ **Automatic Monitoring**: Checks your wallet balance every 5 minutes (configurable)
- ✅ **Instant Transfer**: Sends BNB immediately when available
- ✅ **Gas Optimization**: Automatically calculates optimal gas fees
- ✅ **Secure**: Uses environment variables for sensitive data
- ✅ **Detailed Logging**: Shows balance, gas costs, and transaction details
- ✅ **Telegram Notifications**: Optional alerts (if configured)
- ✅ **Safe**: Transfers maximum amount minus gas fees

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn
- Your Trust Wallet seed phrase
- Your Binance BNB deposit address

## 🚀 Installation

1. **Install Node.js dependencies:**
```bash
npm install
```

2. **Configuration is already set up** in the `.env` file with your details:
   - Trust Wallet seed phrase: ✅ Configured
   - Binance address: ✅ Configured
   - Check interval: 5 minutes (300 seconds)
   - Minimum balance: 0.01 BNB

## 🧪 Testing

Before running the bot, test the connection:

```bash
npm test
```

This will:
- Verify your seed phrase and addresses
- Check connection to BSC network
- Show your current wallet balance
- Calculate gas costs and transferable amount

## ▶️ Running the Bot

### Option 1: Run Locally (on your computer)

Start the bot with:

```bash
npm start
```

**Note:** Your computer must stay on and connected to internet.

### Option 2: Deploy to Cloud (Recommended - FREE 24/7) ⭐

Deploy to a free cloud platform so you don't need to keep your computer on:

**🚀 EASIEST METHOD - Railway (5 minutes):**
- See detailed guide: **[QUICK-START-RAILWAY.md](QUICK-START-RAILWAY.md)**
- Free $5 credits monthly (enough for 24/7)
- Super simple setup

**📚 More Options:**
- See full guide: **[DEPLOYMENT.md](DEPLOYMENT.md)**
- Includes: Railway, Render, Fly.io, Oracle Cloud
- All have free tiers!

### What the bot does:
1. Connect to Binance Smart Chain
2. Monitor your Trust Wallet address
3. Check balance every 10 seconds
4. Automatically transfer all BNB when available
5. Shutdown after successful transfer

## 📊 What to Expect

### Console Output
```
🤖 BNB Auto-Transfer Bot Starting...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Configuration validated successfully
🔐 Wallet initialized successfully
📍 Monitoring address: 0xYourWalletAddress...
🎯 Transfer destination: 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01

[2025-10-21 15:30:00] Check #1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 Current balance: 0.0000 BNB
⏳ Waiting for funds... (minimum: 0.01 BNB)
⏰ Next check in 300 seconds (3:35:00 PM)
```

### When Transfer Occurs
```
💼 Current balance: 1.5234 BNB
✅ Balance exceeds minimum threshold (0.01 BNB)
⛽ Estimated gas cost: 0.0001 BNB (3 Gwei)
📊 Net amount after gas: 1.5233 BNB

💰 Initiating transfer...
   Balance: 1.5234 BNB
   Sending: 1.5233 BNB
   Gas cost: 0.0001 BNB (3 Gwei)
   To: 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01

📤 Transaction sent!
   TX Hash: 0x...
   Waiting for confirmation...

✅ TRANSFER SUCCESSFUL!

Amount: 1.5233 BNB
Gas Fee: 0.0001 BNB
To: 0xbe3869742045a72fc4a2a5c62d2c7e6a5e9ecb01
TX: 0x...
Block: 12345678
Time: 2025-10-21 15:30:00

🎉 Bot mission accomplished! Shutting down...
```

## ⚙️ Configuration Options

Edit `.env` file to customize:

```bash
# Change check interval (in seconds)
CHECK_INTERVAL_SECONDS=300  # 5 minutes

# Change minimum balance threshold
MIN_BALANCE_TO_TRANSFER=0.01  # 0.01 BNB

# Use a different BSC RPC (for faster/private access)
BSC_RPC_URL=https://bsc-dataseed1.binance.org/
```

### Alternative RPC URLs (if main is slow):
- `https://bsc-dataseed2.binance.org/`
- `https://bsc-dataseed3.binance.org/`
- `https://bsc-dataseed4.binance.org/`

## 📱 Optional: Telegram Notifications

To receive transfer notifications on Telegram:

1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Add to `.env`:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## 🛡️ Security Best Practices

1. **Never share your `.env` file** - it contains your seed phrase
2. **Keep the bot running on a secure machine** - preferably your personal computer
3. **The `.gitignore` file prevents** committing sensitive data to git
4. **After successful transfer**, you can delete the `.env` file

## ⏱️ Expected Timeline

- **Unstaked on**: October 18, 2025, ~3:41 PM
- **Expected available**: October 25, 2025, ~3:41 PM (7 days)
- **Bot will detect automatically** and transfer immediately

## 🛑 Stopping the Bot

To stop the bot manually:
- Press `Ctrl + C` in the terminal

## 🔍 Troubleshooting

### "Insufficient balance to cover gas fees"
- Wait for BNB to become available
- Current balance is less than gas cost (~0.0001 BNB)

### "Failed to check balance"
- RPC server might be down
- Try alternative RPC URL in `.env`
- Check internet connection

### "Invalid seed phrase"
- Verify seed phrase in `.env` is correct
- Ensure 12 or 24 words with spaces between them

## 📝 Important Notes

1. The bot will check every 5 minutes by default
2. Once transfer is successful, bot automatically shuts down
3. All BNB will be transferred (minus gas fees)
4. Gas fees are typically 0.0001-0.0003 BNB
5. Keep the terminal/command prompt open while running

## 💡 Tips

- **Run in background**: Use `nohup npm start &` on Linux/Mac
- **Check logs**: All activity is logged to console
- **Test first**: Always run `npm test` before starting the bot
- **Monitor manually**: Check your Binance wallet after transfer

## 📞 Support

If you encounter issues:
1. Run `npm test` to diagnose problems
2. Check your `.env` configuration
3. Verify your Binance deposit address is correct
4. Ensure you have internet connection

## ⚖️ Disclaimer

This bot handles sensitive information (private keys). Use at your own risk. Always:
- Test with small amounts first if unsure
- Keep your seed phrase secure
- Never share your `.env` file
- Verify the Binance address is correct before running

---

**Made for automatic BNB transfers from Trust Wallet to Binance** 🚀

