<template>
  <a-layout style="min-height: 100vh">
    <Header style="position: sticky; top: 0; z-index: 10" />
    <a-layout-content
      style="display: flex; justify-content: center; margin: 10px 0"
    >
      <router-view />
    </a-layout-content>
    <Footer style="position: sticky; bottom: 0" />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from "vue";
import Header from "@/components/core/header.vue";
import Footer from "@/components/core/footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const user = reactive({
      name: "Карбышев Олег Сергеевич",
      filial: 4,
      salesChannel: 2,
    });

    provide("user", user);
  },
});
</script>

<style lang="scss">
.ant-layout-footer {
  padding: 5px 50px !important;
}
</style>
