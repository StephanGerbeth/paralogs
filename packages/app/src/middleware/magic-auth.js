import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useMagicStore } from '@/store/magic';

export default defineNuxtRouteMiddleware((to, from) => {
  const magic = useMagicStore();

  if (!magic.authenticated) {
    return navigateTo('/login');
  }
});
