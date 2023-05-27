<template>
  <NuxtLayout>
    <Suspense>
      <NuxtPage />

      <template #fallback> LOOOOOOADING </template>
    </Suspense>
  </NuxtLayout>
</template>
