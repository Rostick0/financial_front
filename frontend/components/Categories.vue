<template>
  <div class="categories">
    <div class="category" v-for="category in categories" :key="category.id">
        {{ category.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICategoryView } from '~/interfaces/models/category';

const props = defineProps<{ categories: ICategoryView[] }>();
</script>

<style lang="scss" scoped>
.categories {
}

.category {
}
</style>
