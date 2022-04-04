import { ref, reactive, watch } from "vue";

export default function KASKO() {
  const contract = ref({
    vehicleModel: null, // Марка/Модель ТС
    modification: null, // Модификация
    stampVehicleModelOnThePolicy: null, // Марка/Модель ТС на полисе
    yearOfRelease: null, // Год выпуска
    insuranceAmount: null, // Страховая сумма
    newVehicle: false, // Новое ТС
    removedFromRegistrationPolice: false, // ТС снято с регистрационного учета в ГИБДД
    IprRequirementsAreMet: 1, // Выполнены требования ПУС
    EPS: null, // ЭПС
    immobilizer: null, // Иммобилайзер
    mbuOnTheHood: null, // МБУ на капот
    mbuOnTheSteeringWheel: null, // МБУ на руль
    mbuOnTheCheckpoint: null, // МБУ на КПП
    satelliteSystem: null, // Спутниковая система
    radioSearchSystem: null, // Радиопоисковая система
    other: null, // Иная
    incompleteInsurance: null, // Неполное страхование
    actualCostOfTheVehicle: null, // Действительная стоимость ТС
    registrationPlate: null, // Регистрационный знак
    mileage: null, // Пробег
    VIN: null, // VIN
    chassis: null, // Шасси (рама)№
    bodywork: null, // Кузов №
    engineCapacity: null, // Объём двигателя
    permittedMaximumWeight: null, // Разрешённая максимальная масса
    numberOfPassengerSeats: null, // Количество пассажирских мест
    equipment: {
      cd: false, // CD-чейнджер
      wheelRimsIsCast: false, // Диски колёс: литые
      protectiveArchesIsThresholds: false, // Защитные дуги: пороги
      navigationSystem: false, // Навигационная система
      parkingSensorsIsFront: false, // Парктроник: передний
      interiorIsVelour: false, // Салон: велюр
      LEDHeadlamps: false, // Светодиодные LED-фары
      sunBlindsIsRear: false, // Солнцезащитные шторки: задняя
      headlightsIsFogLights: false, // Фары: противотуманные
      CDorDVD: false, // CD/DVD-проигрыватель
      wheelRimsIsStamped: false, // Диски колёс: штампованные
      rearViewCamera: false, // Камера заднего вида
      panoramicRoof: false, // Панорамная крыша
      frontCenterArmrest: false, // Передний центральный подлокотник
      interiorIsLeather: false, // Салон: кожа
      allAroundViewSystem: false, // Система кругового обзора
      TV: false, // Телевизор
      electricWindscreenHeating: false, // Электрообогрев лобового стекла
      wheelRimsIsForged: false, // Диски колёс: кованые
      protectiveArchesIsRear: false, // Защитные дуги: задние
      radioStation: false, // Магнитола
      parkingSensorsIsRear: false, // Парктроник: задний
      programmablePreheater: false, // Программируемый предпусковой отопитель
      interiorIsFabric: false, // Салон: ткань
      sunBlindsIsSidePanels: false, // Солнцезащитные шторки: боковые
      headlightsIsXenon: false, // Фары: ксенон
      numberOfTVs: null, // Количество телевизоров
    },
    documents: [],
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

  return {
    contract,
    columnsDocumentsTable,
  };
}
