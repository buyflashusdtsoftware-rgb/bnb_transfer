require('dotenv').config();
const { ethers } = require('ethers');

async function testConnection() {
    console.log('🧪 Testing Connection and Configuration...\n');
    
    try {
        // Test 1: Load environment variables
        console.log('1️⃣ Loading environment variables...');
        const seedPhrase = process.env.SEED_PHRASE;
        const binanceAddress = process.env.BINANCE_ADDRESS;
        const rpcUrl = process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org/';
        
        if (!seedPhrase) {
            throw new Error('SEED_PHRASE not found in .env');
        }
        if (!binanceAddress) {
            throw new Error('BINANCE_ADDRESS not found in .env');
        }
        console.log('✅ Environment variables loaded\n');
        
        // Test 2: Validate addresses
        console.log('2️⃣ Validating Binance address...');
        if (!ethers.isAddress(binanceAddress)) {
            throw new Error('Invalid Binance address format');
        }
        console.log(`✅ Binance address is valid: ${binanceAddress}\n`);
        
        // Test 3: Connect to BSC
        console.log('3️⃣ Connecting to Binance Smart Chain...');
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const network = await provider.getNetwork();
        console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})\n`);
        
        // Test 4: Derive wallet from seed phrase
        console.log('4️⃣ Deriving wallet from seed phrase...');
        const hdNode = ethers.Mnemonic.fromPhrase(seedPhrase);
        const hdWallet = ethers.HDNodeWallet.fromMnemonic(hdNode);
        const wallet = hdWallet.connect(provider);
        console.log(`✅ Wallet address: ${wallet.address}\n`);
        
        // Test 5: Check wallet balance
        console.log('5️⃣ Checking wallet balance...');
        const balance = await provider.getBalance(wallet.address);
        const balanceInBnb = ethers.formatEther(balance);
        console.log(`✅ Current balance: ${balanceInBnb} BNB\n`);
        
        // Test 6: Get current gas prices
        console.log('6️⃣ Fetching current gas prices...');
        const feeData = await provider.getFeeData();
        const gasPrice = ethers.formatUnits(feeData.gasPrice, 'gwei');
        const gasCost = ethers.formatEther(feeData.gasPrice * 21000n);
        console.log(`✅ Current gas price: ${gasPrice} Gwei`);
        console.log(`   Estimated transfer cost: ${gasCost} BNB\n`);
        
        // Test 7: Calculate transferable amount
        console.log('7️⃣ Calculating transferable amount...');
        const transferable = parseFloat(balanceInBnb) - parseFloat(gasCost);
        if (transferable > 0) {
            console.log(`✅ Transferable amount: ${transferable.toFixed(8)} BNB\n`);
        } else {
            console.log(`⚠️  Insufficient balance for transfer (need at least ${gasCost} BNB for gas)\n`);
        }
        
        // Summary
        console.log('━'.repeat(60));
        console.log('✅ ALL TESTS PASSED!');
        console.log('━'.repeat(60));
        console.log('\n📊 Summary:');
        console.log(`   Trust Wallet: ${wallet.address}`);
        console.log(`   Binance Address: ${binanceAddress}`);
        console.log(`   Current Balance: ${balanceInBnb} BNB`);
        console.log(`   Gas Cost: ~${gasCost} BNB`);
        console.log(`   Transferable: ~${transferable > 0 ? transferable.toFixed(8) : '0'} BNB`);
        console.log('\n🚀 You can now run the bot with: npm start\n');
        
    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        console.error('\nPlease check your .env file configuration.\n');
        process.exit(1);
    }
}

testConnection();

