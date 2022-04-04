import { ref, watch, onMounted, toRaw, reactive, computed, inject } from "vue";
import moment, { Moment } from "moment";
import Dictionaries from "@/components/testData/dictionaries.json";
import Contracts from "@/components/journals/safeCarAccident/contracts.json";
import { Form } from "ant-design-vue";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const useForm = Form.useForm;

export default function safeCarAccident(props: { contractId: number }) {
  const user = inject("user");
  const dictionaries = ref(Dictionaries);
  const contracts = ref(Contracts);
  const loading = ref(false);
  const router = useRouter();

  const contract = ref({
    insuranceProgram: 1,
    insuranceAmount: 2,
    policy: "37/22 - БА№12",
    policyNumber: null,
    dateOfConclusionOfTheAgreement: moment().format(),
    insurancePeriod: "1 год",
    startDate: moment().add(1, "days").format(),
    endDate: null,
    counterpartyType: 1,
    documentType: 2,
    series: null,
    documentNumber: null,
    businessUnitCode: null,
    placeOfBirth: null,
    whoIssued: null,
    dateOfIssue: null,
    authorisedRepresentativeFIO: null,
    authorisedRepresentativePosition: null,
    authorisedRepresentativeDocument: null,
    EGRYL: null,
    dateRegYL: null,
    OGRN: null,
    surname: null,
    name: null,
    middleName: null,
    dateOfBirth: null,
    nameOfCompany: null,
    IPRegistrationDate: null,
    INNRegistrationCode: null,
    INN: null,
    numberInTheUSRIP: null,
    addressOfThePolicyholder: null,
    FIASDoesntHaveAHouseNumber: false,
    email: null,
    phoneNumber: null,
    vehicleBrand: null,
    vehicleModel: null,
    VIN: null,
    stateRegistrationMark: null,
    contractDiscount: null,
    underwriterRatio: 1,
    paymentMethod: 2,
    paymentDocumentNumber: null,
    paymentSum: null,
    paymentConfirmation: null,
    insurancePrem: null,
    status: null,
  });

  const calcEndDate = function () {
    contract.value.endDate = moment(contract.value.startDate)
      .add(1, "years")
      .subtract(1, "days");
  };

  const disabledDate = function (current: Moment) {
    return current && current < moment().endOf("day");
  };

  watch(contract, () => {
    calcEndDate();
    if (contract.value.documentType === 1) {
      contract.value.businessUnitCode = null;
      contract.value.placeOfBirth = null;
      contract.value.whoIssued = null;
    }
  });

  const columnsDocumentsTable = ref([
    {
      title: "Вид документа ТС",
      dataIndex: "documentTypeName",
      key: "documentType",
    },
    {
      title: "Серия",
      dataIndex: "seriesName",
      key: "series",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата выдачи",
      dataIndex: "issueDate",
      key: "issueDate",
    },
    {
      title: "Действия",
      dataIndex: "operation",
      slots: { customRender: "operation" },
    },
  ]);

  const formRef = ref();

  const rulesMain = reactive({
    policyNumber: [
      {
        required: true,
        message: "Введите номер полиса",
        trigger: "blur",
      },
      {
        min: 7,
        message: "Номер полиса должен состоять из 7 символов",
        trigger: "blur",
      },
    ],
    vehicleBrand: [
      {
        required: true,
        message: "Выберите марку ТС",
        trigger: "change",
      },
    ],
    vehicleModel: [
      {
        required: true,
        message: "Выберите модель ТС",
        trigger: "change",
      },
    ],
    VIN: [
      {
        required: true,
        message: "Введите VIN",
        trigger: "blur",
      },
      {
        min: 17,
        message: "VIN должен состоять из 15 символов",
        trigger: "blur",
      },
    ],
    stateRegistrationMark: [
      {
        required: true,
        message: "Введите Гос. рег. знак",
        trigger: "blur",
      },
      {
        min: 8,
        message: "Гос. рег. знак должен состоять минимум из 8 символов",
        trigger: "blur",
      },
    ],
  });

  const rulesFIZwith = reactive({
    series: [
      {
        required: true,
        message: "Введите серию документа",
        trigger: "blur",
      },
      {
        min: 4,
        message: "Длина значения должна состоять из 4 символов",
        trigger: "blur",
      },
    ],
    documentNumber: [
      {
        required: true,
        message: "Введите номер документа",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Длина значения должна состоять из 6 символов",
        trigger: "blur",
      },
    ],
    businessUnitCode: [
      {
        required: true,
        message: "Введите код подразделения",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Код подразделения должен состоять из 6 символов",
        trigger: "blur",
      },
    ],
    placeOfBirth: [
      {
        required: true,
        message: "Введите место рождения",
        trigger: "blur",
      },
    ],
    whoIssued: [
      {
        required: true,
        message: "Заполните это поле",
        trigger: "blur",
      },
    ],
    dateOfIssue: [
      {
        required: true,
        message: "Выберите дату выдачи документа",
        trigger: "blur",
        type: "object",
      },
    ],
    surname: [
      {
        required: true,
        message: "Введите фамилию",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "Введите имя",
        trigger: "blur",
      },
    ],
    middleName: [
      {
        required: true,
        message: "Введите отчество",
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "Выберите дату рождения",
        trigger: "blur",
        type: "object",
      },
    ],
    addressOfThePolicyholder: [
      {
        required: true,
        message: "Укажите адрес",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Укажите электронную почту",
        trigger: "blur",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Номер телефона должен состоять из 10 цифр",
        trigger: "blur",
      },
    ],
  });

  const rulesFIZwithout = reactive({
    series: [
      {
        required: true,
        message: "Введите серию документа",
        trigger: "blur",
      },
      {
        min: 4,
        message: "Длина значения должна состоять из 4 символов",
        trigger: "blur",
      },
    ],
    documentNumber: [
      {
        required: true,
        message: "Введите номер документа",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Длина значения должна состоять из 6 символов",
        trigger: "blur",
      },
    ],
    dateOfIssue: [
      {
        required: true,
        message: "Выберите дату выдачи документа",
        trigger: "blur",
        type: "object",
      },
    ],
    surname: [
      {
        required: true,
        message: "Введите фамилию",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "Введите имя",
        trigger: "blur",
      },
    ],
    middleName: [
      {
        required: true,
        message: "Введите отчество",
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "Выберите дату рождения",
        trigger: "blur",
        type: "object",
      },
    ],
    addressOfThePolicyholder: [
      {
        required: true,
        message: "Укажите адрес",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Укажите электронную почту",
        trigger: "blur",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Номер телефона должен состоять из 10 цифр",
        trigger: "blur",
      },
    ],
  });

  const rulesUR = reactive({
    nameOfCompany: [
      {
        required: true,
        message: "Введите наименование организации",
        trigger: "blur",
      },
    ],
    INNRegistrationCode: [
      {
        required: true,
        message: "Введите код регистрации ИНН",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Код регистрации ИНН должен состоять из 10 символов",
        trigger: "blur",
      },
    ],
    authorisedRepresentativeFIO: [
      {
        required: true,
        message: "Введите ФИО",
        trigger: "blur",
      },
    ],
    authorisedRepresentativePosition: [
      {
        required: true,
        message: "Введите должность",
        trigger: "blur",
      },
    ],
    authorisedRepresentativeDocument: [
      {
        required: true,
        message: "Введите документ",
        trigger: "blur",
      },
    ],
    addressOfThePolicyholder: [
      {
        required: true,
        message: "Укажите адрес",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Укажите электронную почту",
        trigger: "blur",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Номер телефона должен состоять из 10 цифр",
        trigger: "blur",
      },
    ],
    EGRYL: [
      {
        required: true,
        message: "Введите номер записи в ЕГРЮЛ",
        trigger: "blur",
      },
      {
        min: 13,
        message: "Номер записи в ЕГРЮЛ должен состоять из 13 цифр",
        trigger: "blur",
      },
    ],
    OGRN: [
      {
        required: true,
        message: "Введите ОГРН",
        trigger: "blur",
      },
      {
        min: 13,
        message: "ОГРН должен состоять из 13 цифр",
        trigger: "blur",
      },
    ],
    dateRegYL: [
      {
        required: true,
        message: "Выберите дату регистрации",
        trigger: "blur",
        type: "object",
      },
    ],
  });

  const rulesIPwith = reactive({
    series: [
      {
        required: true,
        message: "Введите серию документа",
        trigger: "blur",
      },
      {
        min: 4,
        message: "Длина значения должна состоять из 4 символов",
        trigger: "blur",
      },
    ],
    documentNumber: [
      {
        required: true,
        message: "Введите номер документа",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Длина значения должна состоять из 6 символов",
        trigger: "blur",
      },
    ],
    businessUnitCode: [
      {
        required: true,
        message: "Введите код подразделения",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Код подразделения должен состоять из 6 символов",
        trigger: "blur",
      },
    ],
    placeOfBirth: [
      {
        required: true,
        message: "Введите место рождения",
        trigger: "blur",
      },
    ],
    whoIssued: [
      {
        required: true,
        message: "Заполните это поле",
        trigger: "blur",
      },
    ],
    dateOfIssue: [
      {
        required: true,
        message: "Выберите дату выдачи документа",
        trigger: "blur",
        type: "object",
      },
    ],
    surname: [
      {
        required: true,
        message: "Введите фамилию",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "Введите имя",
        trigger: "blur",
      },
    ],
    middleName: [
      {
        required: true,
        message: "Введите отчество",
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "Выберите дату рождения",
        trigger: "blur",
        type: "object",
      },
    ],
    addressOfThePolicyholder: [
      {
        required: true,
        message: "Укажите адрес",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Укажите электронную почту",
        trigger: "blur",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Номер телефона должен состоять из 10 цифр",
        trigger: "blur",
      },
    ],
    IPRegistrationDate: [
      {
        required: true,
        message: "Выберите дату регистрации ИП",
        trigger: "blur",
        type: "object",
      },
    ],
  });

  const rulesIPwithout = reactive({
    series: [
      {
        required: true,
        message: "Введите серию документа",
        trigger: "blur",
      },
      {
        min: 4,
        message: "Длина значения должна состоять из 4 символов",
        trigger: "blur",
      },
    ],
    documentNumber: [
      {
        required: true,
        message: "Введите номер документа",
        trigger: "blur",
      },
      {
        min: 6,
        message: "Длина значения должна состоять из 6 символов",
        trigger: "blur",
      },
    ],
    dateOfIssue: [
      {
        required: true,
        message: "Выберите дату выдачи документ",
        trigger: "blur",
        type: "object",
      },
    ],
    surname: [
      {
        required: true,
        message: "Введите фамилию",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "Введите имя",
        trigger: "blur",
      },
    ],
    middleName: [
      {
        required: true,
        message: "Введите отчество",
        trigger: "blur",
      },
    ],
    dateOfBirth: [
      {
        required: true,
        message: "Выберите дату рождения",
        trigger: "blur",
        type: "object",
      },
    ],
    addressOfThePolicyholder: [
      {
        required: true,
        message: "Укажите адрес",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Укажите электронную почту",
        trigger: "blur",
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Введите номер телефона",
        trigger: "blur",
      },
      {
        min: 10,
        message: "Номер телефона должен состоять из 10 цифр",
        trigger: "blur",
      },
    ],
    IPRegistrationDate: [
      {
        required: true,
        message: "Выберите дату регистрации ИП",
        trigger: "blur",
        type: "object",
      },
    ],
  });

  const rules = computed(() => {
    if (
      contract.value.counterpartyType == 1 &&
      contract.value.documentType == 2
    ) {
      return {
        ...rulesMain,
        ...rulesFIZwith,
      };
    } else if (
      contract.value.counterpartyType == 1 &&
      contract.value.documentType == 1
    ) {
      return {
        ...rulesMain,
        ...rulesFIZwithout,
      };
    } else if (contract.value.counterpartyType == 2) {
      return {
        ...rulesMain,
        ...rulesUR,
      };
    } else if (
      contract.value.counterpartyType == 3 &&
      contract.value.documentType == 1
    ) {
      return {
        ...rulesMain,
        ...rulesIPwithout,
      };
    } else if (
      contract.value.counterpartyType == 3 &&
      contract.value.documentType == 2
    ) {
      return {
        ...rulesMain,
        ...rulesIPwith,
      };
    }
  });

  const { resetFields, validate, validateInfos } = useForm(contract, rules);
  const onSubmit = () => {
    validate()
      .then(() => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          save();
          notification.success({
            message: "Договор сохранён",
          });
          router.push(`/journal/safeCarAccident`);
        }, 2000);
      })
      .catch((err) => {
        notification.error({
          message: "Ошибка валидации",
          description: "Заполните обязательные поля",
        });
      });
  };

  onMounted(() => {
    calcEndDate();
    if (props.contractId) {
      Object.assign(
        contract.value,
        contracts.value.find((row) => row.id == props.contractId)
          .contractInformation
      );
    }
  });

  const clearInsurantInfo = function () {
    contract.value.documentType = 2;
    contract.value.series = null;
    contract.value.documentNumber = null;
    contract.value.businessUnitCode = null;
    contract.value.placeOfBirth = null;
    contract.value.whoIssued = null;
    contract.value.dateOfIssue = null;
    contract.value.surname = null;
    contract.value.name = null;
    contract.value.middleName = null;
    contract.value.dateOfBirth = null;
    contract.value.nameOfCompany = null;
    contract.value.IPRegistrationDate = null;
    contract.value.INNRegistrationCode = null;
    contract.value.INN = null;
    contract.value.numberInTheUSRIP = null;
    contract.value.addressOfThePolicyholder = null;
    contract.value.FIASDoesntHaveAHouseNumber = false;
    contract.value.email = null;
    contract.value.phoneNumber = null;
    contract.value.EGRYL = null;
    contract.value.dateRegYL = null;
    contract.value.OGRN = null;
  };

  const checkStateRegistrationMark = function () {
    contract.value.stateRegistrationMark = String(
      contract.value.stateRegistrationMark
    ).toUpperCase();
    const symbols = [
      "А",
      "A",
      "В",
      "B",
      "Е",
      "E",
      "К",
      "K",
      "М",
      "M",
      "Н",
      "H",
      "О",
      "O",
      "Р",
      "P",
      "С",
      "C",
      "Т",
      "T",
      "У",
      "Х",
      "X",
    ];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let result = "";
    const checkField = contract.value.stateRegistrationMark.split("");
    checkField.map((symbol, index) => {
      if (!symbols.includes(symbol) && !numbers.includes(symbol)) {
        symbol = "";
      } else {
        result += symbol;
      }
    });

    if (result.length == 1) {
      if (!symbols.includes(result[0])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 2) {
      if (!numbers.includes(result[1])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 3) {
      if (!numbers.includes(result[2])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 4) {
      if (!numbers.includes(result[3])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 5) {
      if (!symbols.includes(result[4])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 6) {
      if (!symbols.includes(result[5])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 7) {
      if (!numbers.includes(result[6])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 8) {
      if (!numbers.includes(result[7])) {
        result = result.slice(0, -1);
      }
    }
    if (result.length == 9) {
      if (!numbers.includes(result[8])) {
        result = result.slice(0, -1);
      }
    }

    contract.value.stateRegistrationMark = result;
  };

  const onlySTR = function (field) {
    contract.value[field] = contract.value[field]
      .replace(/[^a-zA-ZА-Яа-яЁё]/gi, "")
      .replace(/\s+/gi, ", ");
  };

  const onlyINT = function (field) {
    contract.value[field] = contract.value[field].replace(/\D+/g, "");
  };

  const toUpper = function (field) {
    contract.value[field] = String(contract.value[field]).toUpperCase();
  };

  const changeModelVinReg = function () {
    contract.value.vehicleModel = null;
    contract.value.VIN = null;
    contract.value.stateRegistrationMark = null;
  };

  const save = function () {
    let insurant = null;
    if (contract.value.counterpartyType == 2) {
      insurant = `${contract.value.authorisedRepresentativeFIO}`;
    } else {
      insurant = `${contract.value.surname} ${contract.value.name} ${contract.value.middleName}`;
    }
    if (props.contractId) {
      Object.assign(
        contracts.value.find((row) => row.id == props.contractId),
        {
          id: props.contractId,
          insuranceProgram: contract.value.insuranceProgram,
          policy: contract.value.policy,
          policyNumber: contract.value.policyNumber,
          insurant: insurant,
          dateOfConclusionOfTheAgreement:
            contract.value.dateOfConclusionOfTheAgreement,
          startDate: contract.value.startDate,
          endDate: contract.value.endDate,
          insurancePrem: contract.value.insurancePrem,
          filial: user["filial"],
          user: user["name"],
          salesChannel: user["salesChannel"],
          status: contracts.value.find((row) => row.id == props.contractId)
            .status,
          contractInformation: {
            ...contract.value,
            insurancePrem: contract.value.insurancePrem,
          },
        }
      );
    } else {
      contracts.value.push({
        id: contracts.value.length + 1,
        insuranceProgram: contract.value.insuranceProgram,
        policy: contract.value.policy,
        policyNumber: contract.value.policyNumber,
        insurant: insurant,
        dateOfConclusionOfTheAgreement:
          contract.value.dateOfConclusionOfTheAgreement,
        startDate: contract.value.startDate,
        endDate: contract.value.endDate,
        insurancePrem: null,
        filial: user["filial"],
        user: user["name"],
        salesChannel: user["salesChannel"],
        status: "Проект",
        contractInformation: {
          ...contract.value,
          insurancePrem: null,
        },
      });
    }
  };

  const calc = function () {
    loading.value = true;
    const summ = Math.round(
      3975 *
        dictionaries.value.filial.entities.find(
          (row) => row.id == user["filial"]
        ).value *
        dictionaries.value.salesChannel.entities.find(
          (row) => row.id == user["salesChannel"]
        ).value
    );
    Object.assign(
      contracts.value.find((row) => row.id == props.contractId),
      {
        id: props.contractId,
        insuranceProgram: contract.value.insuranceProgram,
        policy: contract.value.policy,
        policyNumber: contract.value.policyNumber,
        insurant: contracts.value.find((row) => row.id == props.contractId)
          .insurant,
        dateOfConclusionOfTheAgreement:
          contract.value.dateOfConclusionOfTheAgreement,
        startDate: contract.value.startDate,
        endDate: contract.value.endDate,
        insurancePrem: summ,
        filial: user["filial"],
        user: user["name"],
        salesChannel: user["salesChannel"],
        status: "Оформлен",
        contractInformation: {
          ...contract.value,
          insurancePrem: summ,
        },
      }
    );

    setTimeout(() => {
      loading.value = false;
      notification.success({
        message: "Расчёт произведён",
      });
      router.push(`/journal/safeCarAccident`);
    }, 2000);
  };

  return {
    contract,
    columnsDocumentsTable,
    disabledDate,
    dictionaries,
    checkStateRegistrationMark,
    clearInsurantInfo,
    onlySTR,
    onlyINT,
    toUpper,
    changeModelVinReg,
    rules,
    formRef,
    onSubmit,
    validateInfos,
    save,
    loading,
    calc,
  };
}
