<template>
  <a-layout-header style="background-color: #004990">
    <a-row type="flex" justify="space-between" align="middle">
      <div>
        <a-row>
          <img src="../../assets/logo.png" alt="" height="64" />
          <a-menu
            v-model:selectedKeys="current"
            mode="horizontal"
            style="background-color: #004990; color: #fff; margin-left: 30px"
          >
            <a-sub-menu key="1" title="Новый договор">
              <a-sub-menu key="1-1" title="Автострахование">
                <a-menu-item
                  key="1-1-1"
                  @click="redirectTo('contract', 'kasko')"
                  >КАСКО</a-menu-item
                >
                <a-menu-item disabled key="1-1-2">ОСАГО</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="1-2" title="Страхование жизни и здоровья">
                <a-sub-menu key="1-2-1" title="Медицинское страхование">
                  <a-menu-item disabled key="1-2-1-1">Антиклещ</a-menu-item>
                  <a-menu-item disabled key="1-2-1-2">Студент</a-menu-item>
                  <a-menu-item disabled key="1-2-1-3"
                    >Трудовой мигрант</a-menu-item
                  >
                </a-sub-menu>
                <a-menu-item
                  key="1-2-2"
                  @click="redirectTo('contract', 'safeCarAccident')"
                  >Безопасный автомобиль</a-menu-item
                >
                <a-menu-item disabled key="1-2-3">Взрослый</a-menu-item>
                <a-menu-item disabled key="1-2-4">Детский</a-menu-item>
                <a-menu-item disabled key="1-2-5">Краткосрочный</a-menu-item>
                <a-menu-item disabled key="1-2-6">Личная защита</a-menu-item>
                <a-menu-item disabled key="1-2-7">Семейный</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="1-3" title="Страхование имущества">
                <a-menu-item disabled key="1-3-1">Комфорт (дом)</a-menu-item>
                <a-menu-item disabled key="1-3-2">Лёгкое решение</a-menu-item>
                <a-menu-item disabled key="1-3-3"
                  >Уверенное решение (дом)</a-menu-item
                >
                <a-menu-item disabled key="1-3-4"
                  >Уверенное решение (квартира)</a-menu-item
                >
                <a-menu-item disabled key="1-3-5">Экспресс</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>

            <a-sub-menu key="2" title="Журнал">
              <a-sub-menu key="2-1" title="Автострахование">
                <a-menu-item key="2-1-1" @click="redirectTo('kasko')"
                  >КАСКО</a-menu-item
                >
                <a-menu-item disabled key="2-1-2">ОСАГО</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="2-2" title="Страхование жизни и здоровья">
                <a-sub-menu key="2-2-1" title="Медицинское страхование">
                  <a-menu-item disabled key="2-2-1-1">Антиклещ</a-menu-item>
                  <a-menu-item disabled key="2-2-1-2">Студент</a-menu-item>
                  <a-menu-item disabled key="2-2-1-3"
                    >Трудовой мигрант</a-menu-item
                  >
                </a-sub-menu>
                <a-menu-item
                  key="2-2-2"
                  @click="redirectTo('journal', 'safeCarAccident')"
                  >Безопасный автомобиль</a-menu-item
                >
                <a-menu-item disabled key="2-2-3">Взрослый</a-menu-item>
                <a-menu-item disabled key="2-2-4">Детский</a-menu-item>
                <a-menu-item disabled key="2-2-5">Краткосрочный</a-menu-item>
                <a-menu-item disabled key="2-2-6">Личная защита</a-menu-item>
                <a-menu-item disabled key="2-2-7">Семейный</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="2-3" title="Страхование имущества">
                <a-menu-item disabled key="2-3-1">Комфорт (дом)</a-menu-item>
                <a-menu-item disabled key="2-3-2">Лёгкое решение</a-menu-item>
                <a-menu-item disabled key="2-3-3"
                  >Уверенное решение (дом)</a-menu-item
                >
                <a-menu-item disabled key="2-3-4"
                  >Уверенное решение (квартира)</a-menu-item
                >
                <a-menu-item disabled key="2-3-5">Экспресс</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </a-row>
      </div>
      <a-typography-title
        :level="5"
        :style="{ color: '#fff' }"
        @click="showModal"
      >
        {{ user.name }}
      </a-typography-title>
    </a-row>
  </a-layout-header>
  <a-modal
    v-model:visible="show"
    title="Редактирование пользователя"
    centered
    okText="Сохранить"
    cancelText="Отмена"
    @ok="saveUser"
  >
    <a-row>
      <a-col :span="6">
        <span>ФИО:</span>
      </a-col>
      <a-col :span="10" :offset="1">
        <a-input class="input" v-model:value="form.name" style="width: 330px" />
      </a-col>
    </a-row>
    <a-row style="margin: 10px 0">
      <a-col :span="6">
        <span>Канал продаж:</span>
      </a-col>
      <a-col :span="10" :offset="1">
        <a-select v-model:value="form.salesChannel" style="width: 330px">
          <a-select-option
            :value="dictionary.id"
            v-for="dictionary of dictionaries.salesChannel.entities"
            :key="dictionary.id"
          >
            {{ dictionary.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <span>Филиал:</span>
      </a-col>
      <a-col :span="10" :offset="1">
        <a-select v-model:value="form.filial" style="width: 330px">
          <a-select-option
            :value="dictionary.id"
            v-for="dictionary of dictionaries.filial.entities"
            :key="dictionary.id"
          >
            {{ dictionary.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

import Dictionaries from "@/components/testData/dictionaries.json";

export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const router = useRouter();
    const current = ref<string[]>(["mail"]);
    const dictionaries = ref(Dictionaries);
    const show = ref(false);
    const form = reactive({
      name: null,
      filial: null,
      salesChannel: null,
    });

    const redirectTo = function (type, link) {
      router.push(`/${type}/${link}`);
    };

    const showModal = function () {
      Object.assign(form, user);
      show.value = true;
    };

    const saveUser = function () {
      Object.assign(user, form);
      show.value = false;
    };

    const user = inject("user");

    return {
      dictionaries,
      current,
      redirectTo,
      user,
      showModal,
      show,
      form,
      saveUser,
    };
  },
});
</script>
