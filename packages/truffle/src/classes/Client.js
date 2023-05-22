import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Mumbai } from '@thirdweb-dev/chains';
import { ethers } from 'ethers';

import { resolveContract } from '../utils/contract.js';

class Client {
  constructor(sdk) {
    this.sdk = sdk;
  }

  get address() {
    return this.sdk.signer.address;
  }

  async getChainId() {
    return this.sdk.wallet.getChainId();
  }

  async getBalance(tokenContractAddress) {
    return this.sdk.wallet.balance(tokenContractAddress);
  }

  async getContract(contractAddress) {
    return resolveContract('PublicLock', abi => {
      return this.sdk.getContract(contractAddress, abi);
    });
  }
}

export const createClient = privateKey => {
  return new Client(getSDK(privateKey, Mumbai));
};

const getSDK = (privateKey, chain) => {
  const signer = new ethers.Wallet(privateKey);
  return ThirdwebSDK.fromSigner(
    signer,
    chain
    // {
    //     gasless: {
    //         // By specifying a gasless configuration - all transactions will get forwarded to enable gasless transactions
    //         openzeppelin: {
    //             relayerUrl: "https://api.defender.openzeppelin.com/autotasks/071f3a2d-9887-4226-8592-80aacc7f4493/runs/webhook/3887a917-d587-4992-921f-0ab712d04eaf/XPCTdzEmmyQAT5Uizo1GkC", // your OZ Defender relayer URL
    //             relayerForwarderAddress: "0xe5e8F3744Fe7EA4bFE4F87Ce3579cA88596277D9", // the OZ defender relayer address (defaults to the standard one)
    //             // useEOAForwarder: true,
    //         }
    //     }
    // }
  );
};
