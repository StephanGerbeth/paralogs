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
  return new ThirdwebSDK(await getWallet().getSigner(), {
    // https://portal.thirdweb.com/typescript/sdk.thirdwebsdk#gasless-optional
    gasless: {
      openzeppelin: {
        relayerUrl: config.public.DEFENDER_AUTOTASK_WEBHOOK,
        relayerForwarderAddress: '0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81'
        // useEOAForwarder: true,
      }
    },
    // https://portal.thirdweb.com/typescript/sdk.thirdwebsdk#gassettings-optional
    gasSettings: {
      maxPriceInGwei: 1.5,
      speed: 'fastest' // standard, fast, fastest
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
