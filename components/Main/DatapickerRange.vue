<template>
  <div class="datapicker-range">
    <Datepicker
      v-model="mainDateRange"
      dark
      range
      inline
      format="MM/dd/yyyy - MM/dd/yyyy"
      @update:model-value="close"
      :enableTimePicker="false"
    />
  </div>
</template>

<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import type { ModelValue } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import moment from "moment";

const { nameModal } = defineProps({
  nameModal: {
    type: String,
    required: true,
  },
});

const { close } = useModal({
  name: nameModal,
});

const mainDateRange = useState<ModelValue>("mainDateRange");
</script>

<style lang="scss" scoped>
.datapicker-range {
}
</style>

<style lang="scss">
.datapicker-range {
  .dp__menu {
    background-color: var(--main-background);
    border-color: var(--color-white);
    // background-color: red;
  }

  .dp__active_date,
  .dp__range_start,
  .dp__range_end {
    background-color: var(--color-blue);
  }

  .dp__action_button {
    background-color: var(--color-blue);
    font-family: var(--font-family);
    padding: 6px;
  }
}
</style>
