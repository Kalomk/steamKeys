import { run } from 'hardhat';

export async function verify(contractAddress: string, args: any[]) {
  console.log('Verification proccess...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().include('already verified')) {
      console.log('Already verified');
    } else {
      console.log(e);
    }
  }
}
