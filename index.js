require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');

// Configuration
const config = {
    seedPhrase: process.env.SEED_PHRASE,
    binanceAddress: process.env.BINANCE_ADDRESS,
    bscRpcUrl: process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org/',
    minBalanceToTransfer: parseFloat(process.env.MIN_BALANCE_TO_TRANSFER || '0.01'),
    checkInterval: parseInt(process.env.CHECK_INTERVAL_SECONDS || '300') * 1000,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID
};

// Validate configuration
function validateConfig() {
    if (!config.seedPhrase) {
        throw new Error('SEED_PHRASE is not set in .env file');
    }
    if (!config.binanceAddress || !ethers.isAddress(config.binanceAddress)) {
        throw new Error('Invalid BINANCE_ADDRESS in .env file');
    }
    console.log('✅ Configuration validated successfully');
}

// Initialize provider and wallet
let provider;
let wallet;
let walletAddress;

function initializeWallet() {
    try {
        // Connect to BSC network
        provider = new ethers.JsonRpcProvider(config.bscRpcUrl);
        
        // Create wallet from seed phrase
        const hdNode = ethers.Mnemonic.fromPhrase(config.seedPhrase);
        const hdWallet = ethers.HDNodeWallet.fromMnemonic(hdNode);
        wallet = hdWallet.connect(provider);
        walletAddress = wallet.address;
        
        console.log('🔐 Wallet initialized successfully');
        console.log(`📍 Monitoring address: ${walletAddress}`);
        console.log(`🎯 Transfer destination: ${config.binanceAddress}`);
        console.log('');
        
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize wallet:', error.message);
        return false;
    }
}

// Send Telegram notification
async function sendTelegramNotification(message) {
    if (!config.telegramBotToken || !config.telegramChatId) {
        return;
    }
    
    try {
        await axios.post(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
            chat_id: config.telegramChatId,
            text: message,
            parse_mode: 'HTML'
        });
    } catch (error) {
        console.error('Failed to send Telegram notification:', error.message);
    }
}

// Format timestamp
function getTimestamp() {
    return new Date().toISOString().replace('T', ' ').split('.')[0];
}

// Check wallet balance
async function checkBalance() {
    try {
        const balance = await provider.getBalance(walletAddress);
        const balanceInBnb = ethers.formatEther(balance);
        return {
            wei: balance,
            bnb: balanceInBnb
        };
    } catch (error) {
        console.error('❌ Error checking balance:', error.message);
        return null;
    }
}

// Estimate gas cost for transfer
async function estimateGasCost() {
    try {
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice;
        const gasLimit = 21000n; // Standard BNB transfer gas limit
        
        const gasCost = gasPrice * gasLimit;
        return {
            wei: gasCost,
            bnb: ethers.formatEther(gasCost),
            gasPrice: ethers.formatUnits(gasPrice, 'gwei')
        };
    } catch (error) {
        console.error('❌ Error estimating gas:', error.message);
        return null;
    }
}

// Transfer all available BNB
async function transferBNB(balance) {
    try {
        console.log('\n💰 Initiating transfer...');
        console.log(`   Balance: ${balance.bnb} BNB`);
        
        // Get current gas price and estimate costs
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice;
        const gasLimit = 21000n;
        const gasCost = gasPrice * gasLimit;
        
        // Calculate amount to send (total balance minus gas)
        const amountToSend = balance.wei - gasCost;
        
        if (amountToSend <= 0n) {
            console.log('❌ Insufficient balance to cover gas fees');
            return false;
        }
        
        const amountInBnb = ethers.formatEther(amountToSend);
        const gasCostInBnb = ethers.formatEther(gasCost);
        
        console.log(`   Sending: ${amountInBnb} BNB`);
        console.log(`   Gas cost: ${gasCostInBnb} BNB (${ethers.formatUnits(gasPrice, 'gwei')} Gwei)`);
        console.log(`   To: ${config.binanceAddress}`);
        
        // Create and send transaction
        const tx = await wallet.sendTransaction({
            to: config.binanceAddress,
            value: amountToSend,
            gasLimit: gasLimit,
            gasPrice: gasPrice
        });
        
        console.log(`\n📤 Transaction sent!`);
        console.log(`   TX Hash: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);
        
        // Wait for transaction confirmation
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            const message = `✅ TRANSFER SUCCESSFUL!\n\n` +
                          `Amount: ${amountInBnb} BNB\n` +
                          `Gas Fee: ${gasCostInBnb} BNB\n` +
                          `To: ${config.binanceAddress}\n` +
                          `TX: ${tx.hash}\n` +
                          `Block: ${receipt.blockNumber}\n` +
                          `Time: ${getTimestamp()}`;
            
            console.log('\n' + message);
            await sendTelegramNotification(message);
            return true;
        } else {
            console.log('❌ Transaction failed');
            return false;
        }
    } catch (error) {
        console.error('❌ Transfer failed:', error.message);
        await sendTelegramNotification(`❌ Transfer failed: ${error.message}`);
        return false;
    }
}

// Main monitoring loop
let checkCount = 0;
let lastBalance = '0';

async function monitorAndTransfer() {
    checkCount++;
    console.log(`\n[${getTimestamp()}] Check #${checkCount}`);
    console.log('━'.repeat(60));
    
    // Check balance
    const balance = await checkBalance();
    if (!balance) {
        console.log('⚠️  Failed to check balance, will retry...');
        return;
    }
    
    const balanceNum = parseFloat(balance.bnb);
    console.log(`💼 Current balance: ${balance.bnb} BNB`);
    
    // Show balance change if different from last check
    if (lastBalance !== balance.bnb && checkCount > 1) {
        const change = balanceNum - parseFloat(lastBalance);
        const changeStr = change > 0 ? `+${change.toFixed(8)}` : change.toFixed(8);
        console.log(`   Change: ${changeStr} BNB`);
    }
    lastBalance = balance.bnb;
    
    // Check if balance meets minimum threshold
    if (balanceNum >= config.minBalanceToTransfer) {
        console.log(`✅ Balance exceeds minimum threshold (${config.minBalanceToTransfer} BNB)`);
        
        // Estimate gas cost
        const gasCost = await estimateGasCost();
        if (gasCost) {
            console.log(`⛽ Estimated gas cost: ${gasCost.bnb} BNB (${gasCost.gasPrice} Gwei)`);
            
            const netAmount = balanceNum - parseFloat(gasCost.bnb);
            if (netAmount > 0) {
                console.log(`📊 Net amount after gas: ${netAmount.toFixed(8)} BNB`);
                
                // Perform transfer
                const success = await transferBNB(balance);
                
                if (success) {
                    console.log('\n🎉 Bot mission accomplished! Shutting down...');
                    process.exit(0);
                }
            } else {
                console.log('⚠️  Balance insufficient to cover gas fees');
            }
        }
    } else {
        console.log(`⏳ Waiting for funds... (minimum: ${config.minBalanceToTransfer} BNB)`);
        console.log(`   Need: ${(config.minBalanceToTransfer - balanceNum).toFixed(8)} more BNB`);
    }
    
    // Show next check time
    const nextCheck = new Date(Date.now() + config.checkInterval);
    console.log(`⏰ Next check in ${config.checkInterval / 1000} seconds (${nextCheck.toLocaleTimeString()})`);
}

// Start the bot
async function startBot() {
    console.log('━'.repeat(60));
    console.log('🤖 BNB Auto-Transfer Bot Starting...');
    console.log('━'.repeat(60));
    console.log('');
    
    try {
        // Validate configuration
        validateConfig();
        
        // Initialize wallet
        if (!initializeWallet()) {
            throw new Error('Failed to initialize wallet');
        }
        
        // Send startup notification
        await sendTelegramNotification(
            `🤖 BNB Transfer Bot Started\n\n` +
            `Monitoring: ${walletAddress}\n` +
            `Destination: ${config.binanceAddress}\n` +
            `Check Interval: ${config.checkInterval / 1000}s\n` +
            `Min Balance: ${config.minBalanceToTransfer} BNB`
        );
        
        console.log('🚀 Bot is now running...');
        console.log(`📊 Check interval: ${config.checkInterval / 1000} seconds`);
        console.log(`💰 Minimum balance to transfer: ${config.minBalanceToTransfer} BNB`);
        console.log('');
        
        // Run first check immediately
        await monitorAndTransfer();
        
        // Set up periodic checks
        setInterval(monitorAndTransfer, config.checkInterval);
        
    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        await sendTelegramNotification(`❌ Bot failed to start: ${error.message}`);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n\n⚠️  Received shutdown signal...');
    await sendTelegramNotification('🛑 Bot stopped manually');
    console.log('👋 Bot stopped. Goodbye!');
    process.exit(0);
});

process.on('uncaughtException', async (error) => {
    console.error('\n❌ Uncaught exception:', error);
    await sendTelegramNotification(`❌ Bot crashed: ${error.message}`);
    process.exit(1);
});

// Start the bot
startBot();

