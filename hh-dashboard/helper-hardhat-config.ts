import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export interface networkConfigItem {
  minMintFee: BigNumber;
  ethUSDPrice?: string;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  sepolia: {
    minMintFee: ethers.utils.parseEther('0.01'),
  },
  hardhat: {
    minMintFee: ethers.utils.parseEther('0.01'),
  },
};

export const frontEndContractsFile = '../hh-dashboard-fe/src/constants/contractAdresses.json';
export const frontEndAbiFile = '../hh-dashboard-fe/src/constants/contractAbi.json';
export const developmentChains = ['hardhat', 'localhost'];
