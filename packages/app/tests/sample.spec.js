import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
// import { setup } from '@nuxt/test-utils';

import HelloWorld from '../src/pages/index.vue';

describe('HelloWorld', () => {
  // setup({ config });

  it('is a Vue instance', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.vm).toBeTruthy();
  });
});
