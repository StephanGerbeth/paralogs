import legend from './contract/legend.js';

export const resolveContract = async (contractName, fn) => {
  const abi = await legend.get(contractName);
  const contract = await fn(abi);

  return new Proxy(contract, {
    get(target, prop, receiver) {
      if (
        target.abi.find(item => item.type === 'function' && item.name === prop)
      ) {
        return proxyFunctionCall(target.call, prop);
      }
      return Reflect.get(...arguments);
    }
  });
};

const proxyFunctionCall = (call, prop) => {
  return new Proxy(call, {
    apply(target, thisArgs, args) {
      return target.apply(thisArgs, [prop, args]);
    }
  });
};
