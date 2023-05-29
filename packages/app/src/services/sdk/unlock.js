import { ethers } from 'ethers';
import { PublicLockV12 } from '@unlock-protocol/contracts';
import { getUserInfo } from '@/services/sdk';

export const createLock = async (contract, duration, price, amount, title) => {
  const { publicAddress } = await getUserInfo();
  const lockInterface = new ethers.utils.Interface(PublicLockV12.abi);
  const params = lockInterface.encodeFunctionData(
    'initialize(address,uint256,address,uint256,uint256,string)',
    [
      contract.getAddress(),
      duration,
      ethers.constants.AddressZero, // We use the base chain currency
      price, // 0.01 Eth
      amount,
      title
    ]
  );
  return contract.deployLockWithNonTransferableKeys(publicAddress, params);
};
