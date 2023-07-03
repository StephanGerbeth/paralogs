<template>
  <div>
    Dashboard
    <input-aircraft-picker v-model="model.aircraft"></input-aircraft-picker>
    <input-date-picker v-model="model.start" />
    <input-time-picker v-model="model.start" />
    <input-duration-picker v-model="model.end" :start="model.start" />
    <input-airport-picker v-model="model.airport" />
    <input-participant-picker v-model="model.participants" />
  </div>
</template>

<script setup>
// import { gql, useClientHandle } from '@urql/vue';
import { add } from 'date-fns';
// import { definePageMeta } from '#imports';
// import { getUserInfo, getSDK, getContract } from '@/services/sdk';
// import { createLock } from '@/services/sdk/unlock';
// import { createEvent } from '@/classes/Event';
import { createEventMetadata, resolveEventData } from '@/metadata/event';
// import { getIPFS } from '@/services/ipfs';
// import { uploadBatch } from '@/services/storage';

import InputDurationPicker from '@/components/base/form/picker/DurationPicker';
import InputTimePicker from '@/components/base/form/picker/TimePicker';
import InputDatePicker from '@/components/base/form/picker/DatePicker';
import InputAirportPicker from '@/components/base/form/picker/AirportPicker';
import InputParticipantPicker from '@/components/base/form/picker/ParticipantPicker';
// import InputAutocompleteAircrafts from '@/components/base/inputs/AutocompleteAircraftsTest.vue';
import InputAircraftPicker from '@/components/base/form/picker/AircraftPicker.vue';
</script>

<script>
export default {
  data() {
    return {
      model: {
        start: new Date(),
        end: new Date(),
        airport: null,
        participants: 1,
        aircraft: null
      }
    };
  },

  watch: {
    model: {
      handler(value) {
        console.log('START', value);
      },
      deep: true
    }
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

    // collectAirports({
    //   minlat: 50.826758482363275,
    //   maxlat: 56.626020608371924,
    //   minlon: 6.218261718749999,
    //   maxlon: 15.49072265625
    // }).subscribe(e => {
    //   console.log(e);
    // });

    // console.log(await getUserInfo());
    // console.log(await (await getSDK()).wallet.balance());
    // const contract = await getContract(
    //   '0x77FA149C92B4C84A939a4EAcAad8eaa1AacB9ae2'
    // );

    // console.log(await (await getSDK()).wallet.balance());
  }
};
</script>
