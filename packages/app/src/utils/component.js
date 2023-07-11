import { h } from 'vue';

export const wrapComponent = (component, props) => {
  return h(component, props);
};
