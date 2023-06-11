import { differenceInSeconds } from 'date-fns';
import { createLock } from '@/services/sdk/unlock';
import { getContract } from '@/services/sdk';

class Event {
  constructor(lock) {
    this.lock = lock;
  }
}

export const createEvent = async (start, end, price, amount, title) => {
  const duration = differenceInSeconds(end, Date.now());
  const contract = await getContract(
    '0x77FA149C92B4C84A939a4EAcAad8eaa1AacB9ae2'
  );
  return new Event(await createLock(contract, duration, price, amount, title));
};
