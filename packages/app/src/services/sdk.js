import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { resolveContract } from './sdk/contract';
import { useNuxtApp } from '#app';

export const getWallet = () => {
  return useNuxtApp().$wallet;
};

export const isConnected = async () => {
  return getWallet().connector.isConnected();
};

export const getSDK = async () => {
  await isConnected();
  return ThirdwebSDK.fromSigner(await getWallet().getSigner());
  // , 'mumbai', {
  //   gasless: {
  //     // By specifying a gasless configuration - all transactions will get forwarded to enable gasless transactions
  //     openzeppelin: {
  //       relayerUrl:
  //         'https://api.defender.openzeppelin.com/autotasks/071f3a2d-9887-4226-8592-80aacc7f4493/runs/webhook/3887a917-d587-4992-921f-0ab712d04eaf/XPCTdzEmmyQAT5Uizo1GkC', // your OZ Defender relayer URL
  //       relayerForwarderAddress: '0xe5e8F3744Fe7EA4bFE4F87Ce3579cA88596277D9' // the OZ defender relayer address (defaults to the standard one)
  //       // useEOAForwarder: true,
  //     }
  //   }
  // }
};

export const getMagicSDK = async () => {
  return (await getWallet()).getMagic();
};

export const getUser = async () => {
  const magicSDK = await getMagicSDK();
  return magicSDK.user;
};

export const getUserInfo = async () => {
  const user = await getUser();
  return user.getMetadata();
};

export const getContract = async address => {
  const sdk = await getSDK();
  return resolveContract(sdk, address);
};
