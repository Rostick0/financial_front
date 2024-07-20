<template>
  <NuxtPage />
  <VitePwaManifest />
</template>

<script lang="ts" setup>
import moment from "moment";

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}

moment.updateLocale("ru", {
  week: {
    dow: 1,
  },
});
</script>
