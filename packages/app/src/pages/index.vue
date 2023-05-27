<template>
  <div class="app">
    <v-btn>hello</v-btn>
    hello world 123
    <a :href="url">Checkout</a>
  </div>
</template>

<script>
import { LocksmithService } from '@unlock-protocol/unlock-js';
import { definePageMeta } from '#imports';

export default {
  setup() {
    definePageMeta({
      middleware: ['auth']
    });

    const config = {
      network: 80001,
      // locks: {
      //   '0xf0f539a5ac10126b7773a181f03e8d1476dd6e9d': {
      //     network: 80001,
      //     skipRecipient: true,
      //     name: 'Unlock members'
      //   }
      // },
      // metadataInputs: [
      //   {
      //     name: 'Name',
      //     type: 'text',
      //     required: true
      //   }
      // ],
      icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.10UUFNA8oLdFdDpzt-Em_QHaHa%26pid%3DApi&f=1',
      pessimistic: true,
      // skipRecipient: true,
      // skipSelect: true,
      // endingCallToAction: 'Login',
      // persistentCheckout: false,
      messageToSign: 'YIPIEEEEEE',
      callToAction: {
        default:
          'Get an Unlock membership to access our Discord, blog comments and more! No xDAI to pay for gas? Click the Claim button.'
      }
      // hideSoldOut: false,
      // unlockUserAccounts: false
    };
    return {
      config
    };
  },

  data() {
    const baseURL = new URL('https://app.unlock-protocol.com/checkout');
    return {
      url: `${baseURL}?redirect_uri=http://localhost:8050&client_id=${
        window.location.host
      }&paywallConfig=${encodeURIComponent(JSON.stringify(this.config))}`
      // url: 'https://app.unlock-protocol.com/checkout?redirect_uri=http://localhost:8050&client_id=localhost'
    };
  },

  async mounted() {
    const params = new URLSearchParams(window.location.search);
    const signature = params.get('signature');
    const address = params.get('address');
    const code = params.get('code');
    const test = JSON.parse(atob(code));
    console.log(signature, address, test);

    // const result = ethers.utils.verifyMessage('YIPIEEEEEE', signature);
    // console.log(result);

    const service = new LocksmithService();
    const test2 = await service.login({
      message: test.d,
      signature: test.s
    });

    console.log(test2);
    const keyResponse = await service.user({
      headers: {
        Authorization: `Bearer ${test2.data.accessToken}`
      }
    });
    console.log(keyResponse);

    const test3 = await service.logout({
      headers: {
        Authorization: `Bearer ${test2.data.accessToken}`
      }
    });
    console.log(test3);
    // console.log(service);
    // const siwe = LocksmithService.createSiweMessage({
    //   domain: 'localhost:8050',
    //   address: client.address,
    //   statement: 'YIPIEEEEEE',
    //   uri: 'https://app.unlock-protocol.com/login',
    //   version: '1',
    //   chainId: '80001'
    // });
    // const message = siwe.prepareMessage();
    // const sig = await client.sdk.wallet.sign(message);
    // console.log(message, sig);

    // const { accessToken, walletAddress, refreshToken } = await service.login({
    //   message,
    //   signature: sig
    // });
    // console.log(walletAddress);
    // const keyResponse = await service.user({
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // });
    // console.log(keyResponse);
  }
};
</script>

<style lang="postcss" scoped>
/* empty */
</style>
