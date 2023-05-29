<template>
  <div>Dashboard</div>
</template>

<script>
import { gql, useClientHandle } from '@urql/vue';
import { definePageMeta } from '#imports';
import { getUserInfo, getContract } from '@/services/sdk';
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

    const contract = await getContract(
      '0x68cBE44D0c71A702097db70b99d383e939b39efc'
    );
    contract.events.getAllEvents().then(e => {
      console.log(e);
    });
    const tx = await createLock(
      contract,
      31 * 60 * 60 * 24,
      0,
      1000,
      'test title'
    );
    console.log(tx);
  }
};
</script>
