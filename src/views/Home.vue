<template>
  <div class="home" style="width: 60%">
    <a-steps :current="current" style="margin-bottom: 50px">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>

    <template v-if="current == 0">
      <a-row>
        <a-col>
          <img src="./NJSD0EpTJuk.jpg" alt="" width="90" />
        </a-col>
        <a-col style="margin-left: 30px">
          <a-row>
            <span>ФИО студента:&emsp;</span>
            <span>Карбышев Олег Сергеевич</span>
          </a-row>
          <a-row>
            <span>Направление:&emsp;</span>
            <span>Информатика и Вычислительная техника</span>
          </a-row>
          <a-row>
            <span>Курс:&emsp;</span>
            <span>4</span>
          </a-row>
          <a-row>
            <span>Группа:&emsp;</span>
            <span>1183б</span>
          </a-row>
          <a-row>
            <span>Место работы:&emsp;</span>
            <span>АО "ГСК "Югория"</span>
          </a-row>
          <a-row>
            <span>Должность:&emsp;</span>
            <span>Младший разработчик</span>
          </a-row>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <span>
          Вы работаете в страховой компании. Вашей задачей является отслеживание
          финансовой деятельности компании.
        </span>
      </a-row>
      <a-row>
        <span>
          Компания имеет различные филиалы по всей стране. Каждый филиал
          характеризуется названием, адресом и телефоном. Деятельность компании
          организована следующим образом: к Вам обращаются различные лица с
          целью заключения договора о страховании. В зависимости от принимаемых
          на страхование объектов и страхуемых рисков, договор заключается по
          определенному виду страхования (например, страхование автотранспорта
          от угона, страхование домашнего имущества, добровольное медицинское
          страхование). При заключении договора Вы фиксируете дату заключения,
          страховую сумму, вид страхования, тарифную ставку и филиал, в котором
          заключался договор
        </span>
      </a-row>
    </template>

    <template v-if="current == 1">
      <a-form
        ref="formRef"
        :model="formStatefilial"
        :rules="rulesFilial"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="Филиал" name="filial">
          <a-select v-model:value="formStatefilial.filial" placeholder="Филиал">
            <a-select-option value="Ханты-Мансийский">
              Ханты-Мансийский
            </a-select-option>
            <a-select-option value="Сургутский"> Сургутский </a-select-option>
            <a-select-option value="Нижневартовский">
              Нижневартовский
            </a-select-option>
            <a-select-option value="Московский"> Московский </a-select-option>
            <a-select-option value="Санкт-Петербургский">
              Санкт-Петербургский
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </template>

    <template v-if="current == 2">
      <a-form
        ref="formRefInsObject"
        :model="formStateInsObject"
        :rules="rulesInsObject"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="Тип объекта" name="object">
          <a-select
            v-model:value="formStateInsObject.object"
            placeholder="Тип объекта"
            @change="changeObject"
          >
            <a-select-option value="Автотранспорт">
              Автотранспорт
            </a-select-option>
            <a-select-option value="Недвижимость">
              Недвижимость
            </a-select-option>
            <a-select-option value="Здоровье"> Здоровье </a-select-option>
            <a-select-option value="Финансы"> Финансы </a-select-option>
            <a-select-option value="Путешествия"> Путешествия </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Наименование объекта" name="objectName">
          <a-input v-model:value="formStateInsObject.objectName" />
        </a-form-item>
        <a-form-item label="Страхуемый риск" name="risk">
          <a-select
            v-model:value="formStateInsObject.risk"
            placeholder="Без риска"
            allow-clear
          >
            <a-select-option
              v-for="risk of risks"
              :key="risk.label"
              :value="risk.label"
            >
              {{ risk.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Страховая сумма" name="sum">
          <a-select
            v-model:value="formStateInsObject.sum"
            placeholder="Выбрать"
            allow-clear
          >
            <a-select-option value="100000"> 100.000 ₽ </a-select-option>
            <a-select-option value="200000"> 200.000 ₽ </a-select-option>
            <a-select-option value="300000"> 300.000 ₽ </a-select-option>
            <a-select-option value="400000"> 400.000 ₽ </a-select-option>
            <a-select-option value="500000"> 500.000 ₽ </a-select-option>
            <a-select-option value="1000000"> 1.000.000 ₽ </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </template>

    <template v-if="current == 3">
      <a-row>
        <a-col :span="8">
          <a-statistic
            title="Тип объекта страхования"
            :value="formStateInsObject.object"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="Наименование объекта"
            :value="formStateInsObject.objectName"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="Страховой риск"
            :value="
              formStateInsObject.risk ? formStateInsObject.risk : 'Отсутствует'
            "
            style="margin-right: 50px"
          />
        </a-col>
      </a-row>
      <a-row style="margin-top: 25px">
        <a-col :span="8">
          <a-statistic
            title="Филиал"
            :value="formStatefilial.filial"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="Дата заключения договора"
            :value="getDate()"
            style="margin-right: 50px"
          />
        </a-col>
      </a-row>
      <a-row style="margin-top: 25px">
        <a-col :span="8">
          <a-statistic
            title="Страховая сумма"
            :value="formStateInsObject.sum"
            style="margin-right: 50px"
          >
            <template #suffix>
              <span>₽</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="Тарифная ставка"
            :value="tariffRate()"
            style="margin-right: 50px"
          >
            <template #suffix>
              <span>₽</span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </template>

    <div style="margin-top: 15px">
      <a-button v-if="current > 0" @click="prev"> Назад </a-button>
      <a-button
        v-if="current < steps.length - 1"
        type="primary"
        style="margin-left: 8px"
        @click="next"
        :disabled="!canGoNext"
      >
        Дальше
      </a-button>
      <a-button
        v-if="current == 3"
        type="primary"
        style="margin-left: 8px"
        @click="newcontract"
      >
        Новый расчет
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import moment from "moment";

export default defineComponent({
  name: "Home",
  setup() {
    const current = ref<number>(0);

    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };

    const formRef = ref();
    const formStatefilial = reactive({
      filial: undefined,
    });
    const rulesFilial = {
      filial: [
        { required: true, message: "Выберите филиал", trigger: "change" },
      ],
    };

    const formRefInsObject = ref();
    const formStateInsObject = reactive({
      object: undefined,
      objectName: undefined,
      risk: undefined,
      sum: undefined,
    });
    const rulesInsObject = {
      object: [
        {
          required: true,
          message: "Выберите тип объекта",
          trigger: "change",
        },
      ],
      objectName: [
        {
          required: true,
          message: "Введите наименование объекта",
          trigger: "blur",
        },
      ],
      sum: [
        {
          required: true,
          message: "Выберите страховую сумму",
          trigger: "change",
        },
      ],
    };
    const risks = computed(() => {
      if (formStateInsObject.object == "Здоровье") {
        return [
          {
            label: "Острое заболевание",
            coef: 1,
          },
          {
            label: "Обострение хронического заболевания",
            coef: 1,
          },
          {
            label: "Травмы, в том числе ожоги и обморожения",
            coef: 1,
          },
          {
            label: "Отравление",
            coef: 1,
          },
        ];
      } else if (formStateInsObject.object == "Автотранспорт") {
        return [
          {
            label: "Угон",
            coef: 1,
          },
          {
            label: "ДТП",
            coef: 1,
          },
          {
            label: "Ущерб, нанесенный третьими лицами",
            coef: 1,
          },
          {
            label: "Стихийное бедствие",
            coef: 1,
          },
        ];
      } else if (formStateInsObject.object == "Недвижимость") {
        return [
          {
            label: "Пожар",
            coef: 1,
          },
          {
            label: "Затопление",
            coef: 1,
          },
          {
            label: "Взлом",
            coef: 1,
          },
        ];
      } else if (formStateInsObject.object == "Финансы") {
        return [
          {
            label: "Дополнительные расходы",
            coef: 1,
          },
          {
            label: "Денежные убытки",
            coef: 1,
          },
          {
            label: "Недополученная прибыль",
            coef: 1,
          },
        ];
      } else if (formStateInsObject.object == "Путешествия") {
        return [
          {
            label: "Непредвиденные расходы",
            coef: 1,
          },
          {
            label: "Отказ в визе",
            coef: 1,
          },
          {
            label: "Задержка/отмена рейса",
            coef: 1,
          },
          {
            label: "Потеря, утрата документов",
            coef: 1,
          },
        ];
      }
    });

    const canGoNext = computed(() => {
      if (current.value == 0) {
        return true;
      } else if (current.value == 1) {
        if (formStatefilial.filial) {
          return true;
        } else {
          return false;
        }
      } else if (current.value == 2) {
        if (
          formStateInsObject.object &&
          formStateInsObject.objectName &&
          formStateInsObject.sum
        ) {
          return true;
        } else {
          return false;
        }
      }
    });

    const getDate = function () {
      return moment().lang("ru").format("LLL");
    };

    const tariffRate = function () {
      let filialCoef = null;
      switch (formStatefilial.filial) {
        case "Ханты-Мансийский":
          filialCoef = 0.85;
          break;
        case "Сургутский":
          filialCoef = 0.9;
          break;
        case "Нижневартовский":
          filialCoef = 0.7;
          break;
        case "Московский":
          filialCoef = 0.98;
          break;
        case "Санкт-Петербургский":
          filialCoef = 0.91;
          break;
      }

      let objectCoef = null;
      switch (formStateInsObject.object) {
        case "Здоровье":
          objectCoef = 0.94;
          break;
        case "Автотранспорт":
          objectCoef = 1;
          break;
        case "Недвижимость":
          objectCoef = 0.69;
          break;
        case "Финансы":
          objectCoef = 0.36;
          break;
        case "Путешествия":
          objectCoef = 0.63;
          break;
      }

      let riskCoef = null;
      switch (formStateInsObject.risk) {
        case "Острое заболевание":
          riskCoef = 0.8234567;
          break;
        case "Обострение хронического заболевания":
          riskCoef = 0.92034567;
          break;
        case "Травмы, в том числе ожоги и обморожения":
          riskCoef = 0.69235784;
          break;
        case "Отравление":
          riskCoef = 0.82934567;
          break;
        case "Угон":
          riskCoef = 0.234567;
          break;
        case "ДТП":
          riskCoef = 0.345678;
          break;
        case "Ущерб, нанесенный третьими лицами":
          riskCoef = 0.58293456;
          break;
        case "Стихийное бедствие":
          riskCoef = 0.0235679;
          break;
        case "Пожар":
          riskCoef = 0.97283456;
          break;
        case "Затопление":
          riskCoef = 0.7189023456;
          break;
        case "Взлом":
          riskCoef = 0.23789546;
          break;
        case "Дополнительные расходы":
          riskCoef = 0.923456;
          break;
        case "Денежные убытки":
          riskCoef = 0.6034589;
          break;
        case "Недополученная прибыль":
          riskCoef = 0.02367845;
          break;
        case "Непредвиденные расходы":
          riskCoef = 0.023795468;
          break;
        case "Отказ в визе":
          riskCoef = 0.56829347;
          break;
        case "Задержка/отмена рейса":
          riskCoef = 0.3568;
          break;
        case "Потеря, утрата документов":
          riskCoef = 0.234577;
          break;
      }

      if (riskCoef) {
        return Math.round(
          Number(formStateInsObject.sum) *
            filialCoef *
            objectCoef *
            riskCoef *
            0.1
        );
      } else {
        return Math.round(
          Number(formStateInsObject.sum) * filialCoef * objectCoef * 0.1
        );
      }
    };

    const changeObject = function () {
      formStateInsObject.objectName = undefined;
      formStateInsObject.risk = undefined;
    };

    const newcontract = function () {
      current.value = 1;
      formStateInsObject.objectName = undefined;
      formStateInsObject.risk = undefined;
      formStateInsObject.object = undefined;
      formStateInsObject.sum = undefined;
      formStatefilial.filial = undefined;
    };

    return {
      current,
      steps: [
        {
          title: "Знакомство",
        },
        {
          title: "Выбор филиала",
        },
        {
          title: "Оформление",
        },
        {
          title: "Расчет",
        },
      ],
      next,
      prev,
      getDate,

      formRef,
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      other: "",
      formStatefilial,
      rulesFilial,

      formRefInsObject,
      formStateInsObject,
      rulesInsObject,
      risks,
      changeObject,

      canGoNext,
      tariffRate,
      newcontract,
    };
  },
});
</script>

<style lang="scss">
.rofl {
  font-size: 96px;
}
</style>
