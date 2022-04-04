<template>
  <div class="main_layout">
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="1. Параметры ТС">
        <VehicleParameters
          :contract="contract"
          :columnsDocumentsTable="columnsDocumentsTable"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="2. Параметры договора"
        >Content of Tab Pane 2</a-tab-pane
      >
      <a-tab-pane key="3" tab="3. Участинки договора"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane key="4" tab="4. Дополнительные риски"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane key="5" tab="5. ПСО">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane key="6" tab="6. Оплата">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
    <Card :contract="contract" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";

import KASKO from "./kasko";

import Card from "./card.vue";
import VehicleParameters from "./VehicleParameters.vue";

export default defineComponent({
  components: {
    Card,
    VehicleParameters,
  },
  setup() {
    return {
      activeKey: ref("1"),
      ...KASKO(),
    };
  },
});
</script>

<style lang="scss" scoped>
.main_layout {
  width: 1140px;
  height: auto;
  background-color: #fff;
  padding: 15px;
}
</style>
