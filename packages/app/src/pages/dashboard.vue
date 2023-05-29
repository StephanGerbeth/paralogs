<template>
  <div>Dashboard</div>
</template>

<script>
import { gql, useClientHandle } from '@urql/vue';
import { definePageMeta } from '#imports';
import { getUserInfo, getSDK, getContract } from '@/services/sdk';
import { createLock } from '@/services/sdk/unlock';
// import { uploadBatch } from '@/services/storage';

export default {
  async setup() {
    definePageMeta({
      middleware: ['auth']
    });

    const handle = useClientHandle();
    const { publicAddress } = await getUserInfo();

    const result = handle.useQuery({
      query: gql`
      {
        locks(where: {lockManagers: ${JSON.stringify([publicAddress])}}) {
          id
          address
          lockManagers
          price
          name
          maxNumberOfKeys
          version
        }
      }
    `
    });
    console.log(result);
    return result;
  },

  async mounted() {
    console.log(await getUserInfo());
    console.log(await (await getSDK()).wallet.balance());

    const contract = await getContract(
      '0x163b3C7c2CE4cF1C82452FBCd1ad556f9DaaFD77'
    );
    contract.events.getAllEvents().then(e => {
      console.log(e);
    });
    const tx = await createLock(
      contract,
      31 * 60 * 60 * 24,
      0,
      1000,
      'schnurz'
    );
    console.log(tx);
    console.log(await (await getSDK()).wallet.balance());
  }
};
</script>
