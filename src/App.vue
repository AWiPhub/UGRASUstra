<template>
  <a-layout style="min-height: 100vh" class="lol">
    <router-view />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss">
.lol {
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
