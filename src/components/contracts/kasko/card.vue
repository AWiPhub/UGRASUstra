<template>
  <a-card title="Договор КАСКО" class="contractCard">
    <pre>
      {{ contract }}
    </pre>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["contract"],
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.contractCard {
  width: 350px;
  position: fixed;
  right: 15px;
  top: 73px;
  height: 600px;
  overflow: auto;
}
</style>
