import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { resolveContract } from './sdk/contract';
import { useNuxtApp, useRuntimeConfig } from '#app';

export const getWallet = () => {
  return useNuxtApp().$wallet;
};

export const isConnected = async () => {
  return getWallet().connector.isConnected();
};

export const getSDK = async () => {
  await isConnected();
  const config = useRuntimeConfig();
  return ThirdwebSDK.fromSigner(await getWallet().getSigner(), 'mumbai', {
    gasless: {
      openzeppelin: {
        relayerUrl: config.public.DEFENDER_AUTOTASK_WEBHOOK
        // relayerForwarderAddress: '0xCD0B1D1A2e99c0570dD5b6095afa07B19293c1a4' // the OZ defender relayer address (defaults to the standard one)
        // useEOAForwarder: true,
      }
    }
  });
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
