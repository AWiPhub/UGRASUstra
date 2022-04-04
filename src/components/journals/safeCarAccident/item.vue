<template>
  <a-table
    :row-key="(record) => record.id"
    :dataSource="dataSource"
    :columns="columns"
    bordered
    size="small"
    :customRow="customTableRow"
  >
    <template #insuranceProgram="{ text }">
      <a-tag color="purple">{{ getDictValue("insuranceProgram", text) }}</a-tag>
    </template>
    <template #salesChannel="{ text }">
      {{ getDictValue("salesChannel", text) }}
    </template>
    <template #filial="{ text }">
      {{ getDictValue("filial", text) }}
    </template>
    <template #policyNumber="{ record }">
      <a-tag>{{ record.policy }}</a-tag>
      <a-tag>{{ record.policyNumber }}</a-tag>
    </template>
    <template #date="{ text }">
      {{ formatDate(text) }}
    </template>
    <template #status="{ text }">
      <a-tag :color="calcColor(text)">{{ text }}</a-tag>
    </template>
    <template #actions="{ record }">
      <a-tooltip>
        <template #title>Печать</template>
        <a-button
          type="primary"
          @click="print(record)"
          :disabled="!record.insurancePrem"
        >
          <template #icon>
            <PrinterOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PrinterOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import contracts from "./contracts.json";
import Dictionaries from "@/components/testData/dictionaries.json";
import moment from "moment";

export default defineComponent({
  components: {
    PrinterOutlined,
  },
  setup() {
    const router = useRouter();

    const columns = ref([
      {
        key: "insuranceProgram",
        dataIndex: "insuranceProgram",
        title: "Программа страхования",
        slots: { customRender: "insuranceProgram" },
      },
      {
        key: "policyNumber",
        dataIndex: "policyNumber",
        title: "Серия-номер полиса",
        slots: { customRender: "policyNumber" },
      },
      {
        key: "insurant",
        dataIndex: "insurant",
        title: "Страхователь",
      },
      {
        key: "dateOfConclusionOfTheAgreement",
        dataIndex: "dateOfConclusionOfTheAgreement",
        title: "Дата заключения договора",
        slots: { customRender: "date" },
      },
      {
        key: "startDate",
        dataIndex: "startDate",
        title: "Начало срока страхования",
        slots: { customRender: "date" },
      },
      {
        key: "endDate",
        dataIndex: "endDate",
        title: "Окончание срока страхования",
        slots: { customRender: "date" },
      },
      {
        key: "insurancePrem",
        dataIndex: "insurancePrem",
        title: "Страховая премия",
      },
      {
        key: "filial",
        dataIndex: "filial",
        title: "Филиал",
        slots: { customRender: "filial" },
      },
      {
        key: "user",
        dataIndex: "user",
        title: "Пользователь",
      },
      {
        key: "salesChannel",
        dataIndex: "salesChannel",
        title: "Канал продаж",
        slots: { customRender: "salesChannel" },
      },
      {
        key: "status",
        dataIndex: "status",
        title: "Статус договора",
        slots: { customRender: "status" },
      },
      {
        key: "actions",
        dataIndex: "actions",
        title: "Действия",
        slots: { customRender: "actions" },
      },
    ]);

    const dataSource = ref(contracts);

    const customTableRow = function (record) {
      return {
        onDblclick: () => {
          console.log(record.id);
          router.push({
            name: "safeCarAccidentContract",
            params: { contractId: record.id },
          });
        },
      };
    };

    const dictionaries = ref(Dictionaries);

    const getDictValue = function (dictionary, valueId) {
      return dictionaries.value[dictionary].entities.find(
        (row) => row.id === valueId
      ).name;
    };

    const formatDate = function (date) {
      return moment(date).format("DD.MM.YYYY");
    };

    const print = function (contract) {
      router.push({
        name: "safeCarAccidentPrint",
        params: { id: contract.id },
      });
    };

    const calcColor = function (text) {
      if (text === "Оформлен") {
        return "orange";
      } else if (text === "Проект") {
        return null;
      }
    };

    return {
      dataSource,
      columns,
      customTableRow,
      getDictValue,
      formatDate,
      calcColor,
      print,
    };
  },
});
</script>

<style lang="scss">
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  text-align: center;
}
td {
  font-size: 12px;
}
</style>
