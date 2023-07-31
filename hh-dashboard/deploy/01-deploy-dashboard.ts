import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { networkConfig, developmentChains } from '../helper-hardhat-config';
import { verify } from '../utils/verify';

const deployDashboard: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args: any[] = [networkConfig[network.name].minMintFee];
  log('-----------------------------');
  const dashboard = await deploy('Dashboard', {
    from: deployer,
    args: args,
    log: true,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHER_SCAN_API) {
    log('Verifying...');
    await verify(dashboard.address, args);
  }
  log('-----------------------------');
};

export default deployDashboard;

deployDashboard.tags = ['all', 'basicNft', 'main'];
