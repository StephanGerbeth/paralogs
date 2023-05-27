import { ThirdwebStorage } from '@thirdweb-dev/storage';
const storage = new ThirdwebStorage();

export const uploadBatch = async list => {
  return storage.uploadBatch(list, {
    rewriteFileNames: {
      fileStartNumber: 1
    }
  });
};
