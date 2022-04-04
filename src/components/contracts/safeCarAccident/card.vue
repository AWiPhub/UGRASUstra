<template>
  <a-card title="Безопасный автомобиль" class="contractCard">
    <a-row class="status">
      <span>{{ contract.status }}</span>
    </a-row>
    <div class="info">
      <a-row class="info__h"> <span>Параметры договора</span> </a-row>
      <a-row class="info__params">
        <a-tooltip placement="left" class="tooltip-text">
          <template #title>
            <span>Номер полиса:</span>
          </template>
          37/22 - БА№12-{{ contract.policyNumber }}
        </a-tooltip>
        <span>&nbsp;от&nbsp;</span>
        <a-tooltip placement="left" class="tooltip-text">
          <template #title>
            <span>Дата заключения договора:</span>
          </template>
          {{ getAgreementDate }}
        </a-tooltip>
      </a-row>

      <a-row class="info__h"> <span>Срок действия</span> </a-row>
      <a-row class="info__params">
        <a-tooltip placement="left" class="tooltip-text">
          <template #title>
            <span>Дата начала договора:</span>
          </template>
          {{ getStartDate }}
        </a-tooltip>
        <span>&nbsp;—&nbsp;</span>
        <a-tooltip placement="left" class="tooltip-text">
          <template #title>
            <span>Дата окончания договора:</span>
          </template>
          {{ getEndDate }}
        </a-tooltip>
      </a-row>

      <hr />

      <a-row class="info__h"> <span>Страхователь</span> </a-row>
      <template v-if="contract.counterpartyType == 1">
        <a-row class="info__params">
          {{ contract.surname }} {{ contract.name }} {{ contract.middleName }}
          {{ getDateOfBirth }}
        </a-row>
      </template>
      <template v-else-if="contract.counterpartyType == 2">
        <a-row class="info__params">
          {{ contract.nameOfCompany }}
          {{ contract.INNRegistrationCode }}
        </a-row>
      </template>
      <template v-else-if="contract.counterpartyType == 3">
        <a-row class="info__params">
          {{ contract.surname }} {{ contract.name }} {{ contract.middleName }}
          {{ getDateOfBirth }}
        </a-row>
      </template>

      <hr />

      <a-row class="info__h"> <span>Оплата договора</span> </a-row>
      <a-row class="info__params">
        <a-tooltip placement="left" class="tooltip-text">
          <template #title>
            <span>Способ оплаты:</span>
          </template>
          {{ getDictValue("paymentMethod", contract.paymentMethod) }}
        </a-tooltip>
      </a-row>

      <a-row class="info__footer">
        {{ contract.insurancePrem ? contract.insurancePrem : "-" }} ₽
      </a-row>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, inject } from "vue";

import moment from "moment";
import Dictionaries from "@/components/testData/dictionaries.json";

export default defineComponent({
  props: ["contract"],
  setup(props) {
    const dictionaries = ref(Dictionaries);

    const getAgreementDate = computed(() =>
      props.contract.dateOfConclusionOfTheAgreement
        ? moment(props.contract.dateOfConclusionOfTheAgreement).format(
            "DD.MM.YYYY"
          )
        : ""
    );

    const getStartDate = computed(() =>
      props.contract.startDate
        ? moment(props.contract.startDate).format("DD.MM.YYYY")
        : ""
    );

    const getEndDate = computed(() =>
      props.contract.endDate
        ? moment(props.contract.endDate).format("DD.MM.YYYY")
        : ""
    );

    const getDictValue = function (dictionary, valueId) {
      return dictionaries.value[dictionary].entities.find(
        (row) => row.id === valueId
      ).name;
    };

    const getDateOfBirth = computed(() =>
      props.contract.dateOfBirth
        ? moment(props.contract.dateOfBirth).format("DD.MM.YYYY")
        : ""
    );

    return {
      getAgreementDate,
      getStartDate,
      getEndDate,
      getDateOfBirth,
      getDictValue,
    };
  },
});
</script>

<style lang="scss">
.contractCard {
  width: 278px;
  position: fixed;
  right: 50px;
  top: 73px;
  overflow: auto;
  z-index: 10;
}
.ant-card-head {
  background: #004990;
  text-align: center;
  border-bottom: 3px solid #da291c;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
}
.status {
  justify-content: center;
  margin-top: 5px;
  font-size: 19px;
  color: #333;
}
.ant-card-body {
  padding: 0px;
  padding: 0 15px;
  color: #333;
}
.info__h {
  color: #2c2c2c;
  font-weight: 600;
  margin-top: 5px;
  font-size: 12px;
}
.info__params {
  font-size: 13px;
}
.info__footer {
  border-top: 1px solid #e5e5e5;
  padding: 6px;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
  margin-top: 10px;
}
hr {
  background-color: #fff;
  border-top: 1px dashed #e7eaec;
  color: #fff;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 0;
}
.ant-tooltip-inner {
  background-color: rgba($color: #000000, $alpha: 0.7);
  font-size: 12px;
  padding: 4px 5px;
  min-height: 0;
}
.tooltip-text {
  border: dashed #005394;
  border-width: 0 0 1px;
  color: #2c2c2c;
}
</style>
