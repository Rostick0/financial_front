<template>
  <!-- <NuxtWelcome /> -->
  <!-- <UiForm /> -->
  <NuxtPage />
  <VitePwaManifest />
  <Menu />
</template>

<script lang="ts" setup>
import moment from "moment";

moment.updateLocale("ru", {
  week: {
    dow: 1,
  },
});
</script>
