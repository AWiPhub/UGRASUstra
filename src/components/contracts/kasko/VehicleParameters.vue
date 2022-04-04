<template>
  <div style="border: 1px solid #e7eaec; border-radius: 4px; padding: 15px">
    <a-row>
      <a-col :span="11">
        <div>
          <span class="text-label">Марка/Модель ТС</span>
          <a-input
            class="input"
            v-model:value="contract.vehicleModel"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div>
          <span class="text-label">Модификация</span>
          <a-input
            class="input"
            v-model:value="contract.modification"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="16">
        <div>
          <span class="text-label">Марка/Модель ТС на полисе</span>
          <a-input
            class="input"
            v-model:value="contract.stampVehicleModelOnThePolicy"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="6" :offset="1">
        <div>
          <span class="text-label">Год выпуска</span>
          <a-input
            class="input"
            v-model:value="contract.yearOfRelease"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="6">
        <div>
          <span class="text-label">Страховая сумма</span>
          <a-input
            class="input"
            v-model:value="contract.insuranceAmount"
            placeholder=""
            suffix="₽"
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="4">
        <a-checkbox v-model:checked="contract.newVehicle">
          <span class="text-label"> Новое ТС </span>
        </a-checkbox>
      </a-col>
      <a-col :span="10">
        <a-checkbox v-model:checked="contract.removedFromRegistrationPolice">
          <span class="text-label">
            ТС снято с регистрационного учета в ГИБДД
          </span>
        </a-checkbox>
      </a-col>
    </a-row>

    <a-divider orientation="left" style="border-color: #004990" dashed>
      ПРОТИВОУГОННЫЕ СИСТЕМЫ (ПУС)
    </a-divider>

    <a-row class="row">
      <a-col :span="16">
        <a-row>
          <span class="text-label">Выполнены требования ПУС</span>
        </a-row>
        <a-row class="input">
          <a-select
            v-model:value="contract.IprRequirementsAreMet"
            style="width: 650px"
            defaultActiveFirstOption
          >
            <a-select-option
              :value="dictionary.id"
              v-for="dictionary of dictionaries.IprRequirementsAreMet.entities"
              :key="dictionary.id"
            >
              {{ dictionary.name }}
            </a-select-option>
          </a-select>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="row">
      <span class="text-label">Установленные противоугонные системы ТС</span>
    </a-row>

    <a-row class="row">
      <a-col :span="11">
        <div>
          <span class="text-label">ЭПС</span>
          <a-input class="input" v-model:value="contract.EPS" placeholder="" />
        </div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div>
          <span class="text-label">Иммобилайзер</span>
          <a-input
            class="input"
            v-model:value="contract.immobilizer"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="11">
        <div>
          <span class="text-label">МБУ на капот</span>
          <a-input
            class="input"
            v-model:value="contract.mbuOnTheHood"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div>
          <span class="text-label">МБУ на руль</span>
          <a-input
            class="input"
            v-model:value="contract.mbuOnTheSteeringWheel"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="11">
        <div>
          <span class="text-label">МБУ на КПП</span>
          <a-input
            class="input"
            v-model:value="contract.mbuOnTheCheckpoint"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div>
          <span class="text-label">Спутниковая система</span>
          <a-input
            class="input"
            v-model:value="contract.satelliteSystem"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="11">
        <div>
          <span class="text-label">Радиопоисковая система</span>
          <a-input
            class="input"
            v-model:value="contract.radioSearchSystem"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="11" :offset="1">
        <div>
          <span class="text-label">Иная</span>
          <a-input
            class="input"
            v-model:value="contract.other"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-divider orientation="left" style="border-color: #004990" dashed>
      ПОДРОБНЕЕ
    </a-divider>

    <a-row class="row">
      <a-col :span="4">
        <a-checkbox v-model:checked="contract.incompleteInsurance">
          <span class="text-label">Неполное страхование</span>
        </a-checkbox>
      </a-col>
    </a-row>

    <a-row class="row" v-if="contract.incompleteInsurance">
      <a-col :span="11">
        <div>
          <span class="text-label">Действительная стоимость ТС</span>
          <a-input
            class="input"
            v-model:value="contract.actualCostOfTheVehicle"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="5">
        <div>
          <span class="text-label">Регистрационный знак</span>
          <a-input
            class="input"
            v-mask="'A###AA###'"
            v-model:value="contract.registrationPlate"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">Пробег</span>
          <a-input
            class="input"
            v-model:value="contract.mileage"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">VIN</span>
          <a-input class="input" v-model:value="contract.VIN" placeholder="" />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">Шасси (рама)№</span>
          <a-input
            class="input"
            v-model:value="contract.chassis"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-row class="row">
      <a-col :span="5">
        <div>
          <span class="text-label">Кузов №</span>
          <a-input
            class="input"
            v-model:value="contract.bodywork"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">Объём двигателя</span>
          <a-input
            class="input"
            v-model:value="contract.engineCapacity"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">Разрешённая максимальная масса</span>
          <a-input
            class="input"
            v-model:value="contract.permittedMaximumWeight"
            placeholder=""
          />
        </div>
      </a-col>
      <a-col :span="5" :offset="1">
        <div>
          <span class="text-label">Количество пассажирских мест</span>
          <a-input
            class="input"
            v-model:value="contract.numberOfPassengerSeats"
            placeholder=""
          />
        </div>
      </a-col>
    </a-row>

    <a-divider orientation="left" style="border-color: #004990" dashed>
      КОМПЛЕКТАЦИЯ ТС
    </a-divider>

    <a-row class="row">
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.cd">
          <span class="text-label">CD-чейнджер</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.wheelRimsIsCast">
          <span class="text-label">Диски колёс: литые</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox
          v-model:checked="contract.equipment.protectiveArchesIsThresholds"
        >
          <span class="text-label">Защитные дуги: пороги</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.navigationSystem">
          <span class="text-label">Навигационная система</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.parkingSensorsIsFront">
          <span class="text-label">Парктроник: передний</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.interiorIsVelour">
          <span class="text-label">Салон: велюр</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.LEDHeadlamps">
          <span class="text-label">Светодиодные LED-фары</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.sunBlindsIsRear">
          <span class="text-label">Солнцезащитные шторки: задняя</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.headlightsIsFogLights">
          <span class="text-label">Фары: противотуманные</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.CDorDVD">
          <span class="text-label">CD/DVD-проигрыватель</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.wheelRimsIsStamped">
          <span class="text-label">Диски колёс: штампованные</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.rearViewCamera">
          <span class="text-label">Камера заднего вида</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.panoramicRoof">
          <span class="text-label">Панорамная крыша</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.frontCenterArmrest">
          <span class="text-label">Передний центральный подлокотник</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.interiorIsLeather">
          <span class="text-label">Салон: кожа</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.allAroundViewSystem">
          <span class="text-label">Система кругового обзора</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.TV">
          <span class="text-label">Телевизор</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox
          v-model:checked="contract.equipment.electricWindscreenHeating"
        >
          <span class="text-label">Электрообогрев лобового стекла</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.wheelRimsIsForged">
          <span class="text-label">Диски колёс: кованые</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.protectiveArchesIsRear">
          <span class="text-label">Защитные дуги: задние</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.radioStation">
          <span class="text-label">Магнитола</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.parkingSensorsIsRear">
          <span class="text-label">Парктроник: задний</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.programmablePreheater">
          <span class="text-label">Программируемый предпусковой отопитель</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.interiorIsFabric">
          <span class="text-label">Салон: ткань</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.sunBlindsIsSidePanels">
          <span class="text-label">Солнцезащитные шторки: боковые</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <a-checkbox v-model:checked="contract.equipment.headlightsIsXenon">
          <span class="text-label">Фары: ксенон</span>
        </a-checkbox>
      </a-col>
      <a-col :span="equipmentSpan">
        <span class="text-label">Количество телевизоров</span>
        <a-input
          class="input"
          v-model:value="contract.equipment.numberOfTVs"
          placeholder=""
          :disabled="!contract.equipment.TV"
        />
      </a-col>
    </a-row>

    <a-divider orientation="left" style="border-color: #004990" dashed>
      ДОКУМЕНТЫ ТС
    </a-divider>

    <a-button
      class="editable-add-btn"
      @click="handleAdd"
      style="margin-bottom: 8px"
      >Add</a-button
    >
    <a-table
      :columns="columnsDocumentsTable"
      :data-source="contract.documents"
      :locale="{
        emptyText: 'Не указано ни одного документа',
      }"
      bordered
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import Dictionaries from "@/components/testData/dictionaries.json";

export default defineComponent({
  props: ["contract", "columnsDocumentsTable"],
  setup(props) {
    const equipmentSpan = ref(8);
    const dictionaries = ref(Dictionaries);

    watch(props.contract.equipment, () => {
      if (!props.contract.equipment.TV) {
        props.contract.equipment.numberOfTVs = null;
      }
    });

    return {
      equipmentSpan,
      dictionaries,
    };
  },
});
</script>

<style lang="scss">
.row {
  margin-top: 15px;
}
.text-label {
  font-weight: 500;
  font-size: 13px;
  color: #333333;
}
.input {
  margin-top: 3px;
}
</style>
