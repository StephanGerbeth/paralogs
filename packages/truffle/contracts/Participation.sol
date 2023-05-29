// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@unlock-protocol/contracts/dist/Unlock/IUnlockV12.sol";
import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV12.sol";

contract Participation {
  address unlockAddress;

  event LockCreated(
      address lockAddress
  );

  constructor(address _unlockAddress) {
    unlockAddress = _unlockAddress;
  }

  function deployLockWithNonTransferableKeys(address user, bytes calldata data) external returns (address) {
    IUnlockV12 unlock = IUnlockV12(unlockAddress);

    address newLockAddress = unlock.createUpgradeableLockAtVersion(data, 12);
    IPublicLockV12(newLockAddress).updateRefundPenalty(0, 10000);
    IPublicLockV12(newLockAddress).addLockManager(user);
    IPublicLockV12(newLockAddress).renounceLockManager();

    emit LockCreated(newLockAddress);
  }
}
