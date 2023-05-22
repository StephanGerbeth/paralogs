import PublicLockDescription from '@unlock-protocol/contracts/dist/abis/PublicLock/PublicLockV13.json' assert {type: 'json'};

const getEntry = ({contractName, abi}) => [contractName, abi];

export default new Map([
  getEntry(PublicLockDescription)
]);
