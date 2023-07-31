import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-etherscan';
require('hardhat-gas-reporter');
import * as dotenv from 'dotenv';
dotenv.config();

const SEPOLIA_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHER_SCAN_API = process.env.ETHER_SCAN_API;
const COIN_MARKET_API = process.env.COIN_MARKET_API;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY!],
      chainId: 11155111,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: ETHER_SCAN_API,
  },
  gasReporter: {
    noColors: true,
    enabled: true,
    outputFile: 'gas-report.txt',
    currency: 'USD',
    coinmarketcap: COIN_MARKET_API,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 0,
    },
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};

export default config;
