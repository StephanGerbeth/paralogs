import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (!auth.authenticated && to.name !== 'login') {
    return navigateTo({ name: 'login' });
  }

  if (auth.authenticated && to.name === 'login') {
    return navigateTo({ name: 'dashboard' });
  }
});
