<template>
  <div class="datapicker-range">
    <Datepicker
      v-model="mainDateRange"
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
