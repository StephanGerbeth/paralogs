import { ethers } from 'ethers';
import { PublicLockV12 } from '@unlock-protocol/contracts';
import { fromEvent, firstValueFrom, filter, from, map, switchMap } from 'rxjs';
import { getUserInfo, getContract } from '@/services/sdk';

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
  const tx = contract.deployLockWithNonTransferableKeys(publicAddress, params);
  const fees = await getFeeData();

  tx.setMaxFeePerGas(fees.maxFeePerGas);
  tx.setMaxPriorityFeePerGas(fees.maxPriorityFeePerGas);

  return resolveLock(contract, tx.execute());
};

// https://mirror.xyz/0xkyosuke.eth/OwU0HyGXaWTNl2B18a1pb-CiDqgQixOQeUJXOJefNyM

const getFeeData = async (priority = 'standard') => {
  const response = await fetch('https://gasstation-mumbai.matic.today/v2');
  const data = await response.json();

  return {
    maxFeePerGas: parseToGwei(data[String(priority)].maxFee),
    maxPriorityFeePerGas: parseToGwei(data[String(priority)].maxPriorityFee)
  };
};

const parseToGwei = value => {
  return ethers.utils.parseUnits(value.toFixed(9), 'gwei');
};

const resolveLock = async (contract, txExec) => {
  const { lockAddress } = await firstValueFrom(
    fromEvent(contract.events, 'LockCreated').pipe(
      switchMap(({ transaction, data }) =>
        from(txExec).pipe(
          filter(
            ({ receipt }) =>
              receipt.transactionHash === transaction.transactionHash
          ),
          map(() => data)
        )
      )
    )
  );
  return getContract(lockAddress);
};
