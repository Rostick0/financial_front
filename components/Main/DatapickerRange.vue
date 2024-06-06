<template>
  <div class="datapicker-range">
    <!-- {{ date }} -->
    <Datepicker
      v-model="mainDateRange"
      range
      inline
      @update:model-value="close"
    />
  </div>
</template>

<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { nameModal } = defineProps({
  nameModal: {
    type: String,
    required: true,
  },
});

const { close } = useModal({
  name: nameModal,
});

const mainDateRange = useState<Date>("mainDateRange");
</script>

<style lang="scss" scoped>
.datapicker-range {
}
</style>
