import { ethers, network } from 'hardhat';
import fs from 'fs';
import { frontEndContractsFile, frontEndAbiFile } from '../helper-hardhat-config';

const updateFrondEnd = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log('Writing to front end...');
    await updateContractAddresses();
    await updateAbi();
    console.log('Front end written!');
  }
};

async function updateAbi() {
  const dashboard = await ethers.getContract('Dashboard');
  fs.writeFileSync(
    frontEndAbiFile,
    <string>dashboard.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const dashboard = await ethers.getContract('Dashboard');
  const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, 'utf8'));
  const chainId = network.config.chainId;
  if (chainId) {
    if (chainId.toString() in contractAddresses) {
      if (!contractAddresses[chainId.toString()].includes(dashboard.address)) {
        contractAddresses[chainId.toString()][0] = dashboard.address;
      }
    } else {
      contractAddresses[chainId.toString()] = [dashboard.address];
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
  }
}

export default updateFrondEnd;
updateFrondEnd.tags = ['all', 'update'];
