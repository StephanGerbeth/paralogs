<template>
  <div>Dashboard<form-event-editor></form-event-editor></div>
</template>

<script>
// import { gql, useClientHandle } from '@urql/vue';
import { add } from 'date-fns';
// import { definePageMeta } from '#imports';
// import { getUserInfo, getSDK, getContract } from '@/services/sdk';
// import { createLock } from '@/services/sdk/unlock';
// import { createEvent } from '@/classes/Event';
import { createEventMetadata, resolveEventData } from '@/metadata/event';
// import { getIPFS } from '@/services/ipfs';
// import { uploadBatch } from '@/services/storage';
import FormEventEditor from '@/components/collections/FormEventEditor.vue';

export default {
  components: {
    FormEventEditor
  },
  // async setup() {
  //   definePageMeta({
  //     middleware: ['auth']
  //   });

  //   const handle = useClientHandle();
  //   const { publicAddress } = await getUserInfo();
  //   console.log(publicAddress);

  //   const result = handle.useQuery({
  //     query: gql`
  //     {
  //       locks(where: {lockManagers: ${JSON.stringify([publicAddress])}}) {
  //         id
  //         address
  //         lockManagers
  //         price
  //         name
  //         maxNumberOfKeys
  //         version
  //       }
  //     }
  //   `
  //   });
  //   console.log(result);
  //   return result;
  // },

  async mounted() {
    const date = Date.now();
    // const event = await createEvent(
    //   add(date, { hours: 2 }),
    //   add(date, { hours: 4 }),
    //   0,
    //   1000,
    //   'schnurz'
    // );
    // console.log(event);
    const metadata = createEventMetadata({
      start: add(date, { hours: 2 }),
      end: add(date, { hours: 4 })
    });

    console.log(metadata);

    const data = resolveEventData(metadata);
    console.log(data);
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // console.log(await getUserInfo());
    // console.log(await (await getSDK()).wallet.balance());
    // const contract = await getContract(
    //   '0x77FA149C92B4C84A939a4EAcAad8eaa1AacB9ae2'
    // );

    // console.log(await (await getSDK()).wallet.balance());
  }
};
</script>
