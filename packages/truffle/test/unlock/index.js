import dotenv from 'dotenv';
import { LocksmithService } from '@unlock-protocol/unlock-js';
import { createClient } from '../../src/classes/Client.js';

dotenv.config();

console.log(process.env.MASTER_PRIVATE_KEY);
const masterClient = createClient(process.env.MASTER_PRIVATE_KEY);
const slaveClient = createClient(process.env.CLIENT_PRIVATE_KEY);
console.log(masterClient);
console.log(masterClient.address);
console.log(await masterClient.getBalance());

const contract = await slaveClient.getContract(
  '0xf0f539a5ac10126b7773a181f03e8d1476dd6e9d'
);
console.log(contract.abi);

const balanceProxy = await contract.balanceOf(slaveClient.address);
console.log(balanceProxy.toString());

const keys = await contract.totalKeys(slaveClient.address);
console.log(keys.toString());

// const service = new LocksmithService(
//   undefined,
//   'https://locksmith.unlock-protocol.com/'
// );
// console.log(service);
// const siwe = LocksmithService.createSiweMessage({
//   statement: 'Sign in to use our service today!',
//   requestId: masterClient.address
// });
// const message = siwe.prepareMessage();
// console.log(message);
// const signature = await masterClient.sdk.wallet.sign(message);

// const loginResponse = await service.login({
//   message,
//   signature
// });
// console.log(loginResponse.data);
// const signature = wallet.signMessage(message);
// console.log(message);

const response = await fetch(
  `https://locksmith.unlock-protocol.com/v2/api/ticket/${await masterClient.getChainId()}/lock/0xf0f539a5ac10126b7773a181f03e8d1476dd6e9d/key/1/generate`,
  {
    method: 'GET',
    maxBodyLength: Infinity,
    headers: {
      Accept: 'application'
    }
  }
);
console.log(response);
console.log(await response.text());
