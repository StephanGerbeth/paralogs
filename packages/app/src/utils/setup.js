import { computed } from 'vue';

export const createDynamicModelObject = (props, emit) => {
  return Object.fromEntries(
    ['email'].map(key => {
      return [
        key,
        computed({
          get() {
            return props.modelValue[String(key)];
          },
          set(value) {
            emit('update:modelValue', {
              ...props.modelValue,
              [key]: value
            });
          }
        })
      ];
    })
  );
};
