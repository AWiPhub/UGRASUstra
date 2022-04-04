<template>
  <div class="main" id="mainDocument">
    <a-row type="flex" justify="end">
      <a-col :span="9" style="font-size: 12.65px">
        <span
          ><b>БА№12 {{ contract.contractInformation.policyNumber }}</b></span
        >
      </a-col>
      <a-col style="font-size: 12.65px">
        <span><b>37/21</b></span>
      </a-col>
    </a-row>

    <a-row type="flex" justify="end">
      <a-col :span="7" style="font-size: 12.65px">
        <span><b>СТРАХОВОЙ ПОЛИС</b></span>
      </a-col>
    </a-row>

    <a-row type="flex" justify="end">
      <a-col style="font-size: 12.65px">
        <span
          ><b>{{
            getDateContract(
              contract.contractInformation.dateOfConclusionOfTheAgreement
            )
          }}</b></span
        >
      </a-col>
    </a-row>

    <a-row type="flex" justify="center">
      <a-col>
        <span style="font-size: 12.65px">
          <b>
            Полис страхования от несчастных случаев «Безопасный автомобиль»
          </b>
        </span>
      </a-col>
    </a-row>

    <a-row type="flex" justify="start">
      <a-col>
        <p
          style="
            text-indent: 30px;
            font-size: 12.65px;
            margin-bottom: 0px;
            line-height: 15px;
          "
        >
          По настоящему Полису, выданному на основании устного заявления
          Страхователя в соответствии с Правилами добровольного страхования от
          несчастных случаев и болезней (No12 от 20.05.2020), АО «Группа
          страховых компаний «Югория» (Лицензия СЛ No3211 от 26.08.2019, г.
          Ханты-Мансийск, улица Комсомольская, дом 61), (далее – Страховщик),
          обязуется за обусловленную страховую премию при наступлении страхового
          случая произвести страховую выплату в соответствии с условиями
          настоящего Полиса.
        </p>
      </a-col>
    </a-row>

    <a-row type="flex" justify="start">
      <table>
        <tr>
          <td class="tableFirstText">
            <b>СТРАХОВАТЕЛЬ</b>
          </td>
          <template v-if="contract.contractInformation.counterpartyType != 2">
            <td colspan="5" class="tableSecondText">
              {{
                getInsurant({
                  surname: contract.contractInformation.surname,
                  name: contract.contractInformation.name,
                  middleName: contract.contractInformation.middleName,
                })
              }}, {{ getDate(contract.contractInformation.dateOfBirth) }}
            </td>
          </template>
          <template v-else>
            <td colspan="5" class="tableSecondText">
              {{ contract.contractInformation.authorisedRepresentativeFIO }}
            </td>
          </template>
        </tr>

        <tr>
          <template v-if="contract.contractInformation.counterpartyType != 2">
            <td colspan="6" class="tableSecondText">
              Адрес:
              {{ contract.contractInformation.addressOfThePolicyholder }};
              Телефон: {{ contract.contractInformation.phoneNumber }};
              {{
                getDocument({
                  documentType: contract.contractInformation.documentType,
                  series: contract.contractInformation.series,
                  documentNumber: contract.contractInformation.documentNumber,
                  dateOfIssue: contract.contractInformation.dateOfIssue,
                  whoIssued: contract.contractInformation.whoIssued,
                })
              }}
            </td>
          </template>
          <template v-else>
            <td colspan="6" class="tableSecondText">
              Адрес:
              {{ contract.contractInformation.addressOfThePolicyholder }};
              Телефон: {{ contract.contractInformation.phoneNumber }}; ЕГРЮЛ:
              {{ contract.contractInformation.EGRYL }}; Дата регистрации ЮЛ:
              {{ getDate(contract.contractInformation.dateRegYL) }}; ИНН:
              {{ contract.contractInformation.INNRegistrationCode }}; ОГРН:
              {{ contract.contractInformation.OGRN }};
            </td>
          </template>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ЗАСТРАХОВАННОЕ ЛИЦО</b></td>
          <td colspan="5" class="tableSecondText">
            Водитель легкового транспортного средства
            {{ contract.contractInformation.vehicleBrand }},
            {{ contract.contractInformation.vehicleModel }}, VIN
            {{ contract.contractInformation.VIN }}, гос. Рег. Знак
            {{ contract.contractInformation.stateRegistrationMark }} (далее по
            тексту ТС), управляющий им на законных основаниях (далее по тексту
            Водитель)
          </td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ПРОГРАММА СТРАХОВАНИЯ</b></td>
          <td colspan="5" class="tableSecondText">
            {{
              getDictValue(
                "insuranceProgram",
                contract.contractInformation.insuranceProgram
              )
            }}
          </td>
        </tr>
        <tr>
          <td class="tableFirstText">
            <b
              >СТРАХОВОЙ РИСК/ СТРАХОВОЙ СЛУЧАИ. <br />
              РАЗМЕР СТРАХОВОЙ ВЫПЛАТЫ</b
            >
          </td>
          <td colspan="5" class="tableSecondText">
            <b>Постоянная утрата общей трудоспособности Застрахованным лицом</b>
            – инвалидность, установленная впервые в результате несчастного
            случая, произошедшего в период страхования (<b>риск А1</b>) –
            выплата производится в % от страховой суммы* в зависимости от
            установленной группы инвалидности: I группа, категория
            «ребенок-инвалид» – 80%; II группа – 50%; III группа – 30%.
            <br />
            <b>Смерть Застрахованного лица</b> в результате несчастного случая,
            произошедшего в период страхования (<b>риск А2</b>) – выплата
            производится в размере 100% от страховой суммы*. <br />
            <b>Временная утрата трудоспособности</b> Застрахованным лицом
            (расстройство здоровья) в результате несчастного случая,
            произошедшего в период страхования (<b>риск А3</b>) – в % от
            страховой суммы* в размере 0,2% от страховой суммы на Застрахованное
            лицо за каждый день непрерывного лечения, начиная с 11 дня, но не
            более 15% от страховой суммы на Застрахованное лицо.
            <br />
            Под «несчастным случаем» понимается нарушение анатомической
            целостности тканей или органов Застрахованного лица с расстройством
            их функций в результате дорожно-транспортного происшествия с
            участием указанного в настоящем Полисе транспортного средства.
            <br />
            *от установленной на Застрахованное лицо страховой суммы,
            уменьшенной на сумму ранее произведенных страховых выплат (п.п. 5.5,
            12.6 Правил страхования).
          </td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>СРОК ДЕЙСТВИЯ ПОЛИСА</b></td>
          <td colspan="5" class="tableSecondText">
            с даты выдачи Полиса по дату, указанную как дата окончания периода
            страхования
          </td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ПЕРИОД СТРАХОВАНИЯ</b></td>
          <td colspan="5" class="tableSecondText">
            Время нахождения в ТС
            {{ contract.contractInformation.vehicleBrand }},
            {{ contract.contractInformation.vehicleModel }}, VIN
            {{ contract.contractInformation.VIN }}, гос. Рег. знак
            {{ contract.contractInformation.stateRegistrationMark }}
            управляемом Водителем, с
            {{ getDate(contract.contractInformation.startDate) }} по
            {{ getDate(contract.contractInformation.endDate) }}
          </td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ТЕРРИТОРИЯ ДЕЙСТВИЯ ПОЛИСА</b></td>
          <td colspan="5" class="tableSecondText">
            РФ, салон ТС {{ contract.contractInformation.vehicleBrand }},
            {{ contract.contractInformation.vehicleModel }}, VIN
            {{ contract.contractInformation.VIN }}, гос. Рег. знак
            {{ contract.contractInformation.stateRegistrationMark }}
          </td>
        </tr>
        <tr>
          <td class="tableFirstText">
            <b>СТРАХОВАЯ СУММА на одно Застрахованное лицо, Руб.</b>
          </td>
          <td colspan="3" class="tableSecondText" align="center">
            {{
              getDictValue(
                "insuranceAmount",
                contract.contractInformation.insuranceAmount
              )
            }}
          </td>
          <td rowspan="2" class="tableFirstText" align="center">
            <b
              >СТРАХОВАЯ ПРЕМИЯ <br />
              Итого по полису, руб.</b
            >
          </td>
          <td rowspan="2" class="tableSecondText" align="center">
            {{ contract.contractInformation.insurancePrem }}
          </td>
        </tr>
        <tr>
          <td class="tableFirstText">
            <b
              >СТРАХОВАЯ СУММА <br />
              Итого по Полису, Руб.</b
            >
          </td>
          <td colspan="3" class="tableSecondText" align="center">
            {{
              getDictValue(
                "insuranceAmount",
                contract.contractInformation.insuranceAmount
              )
            }}
          </td>
        </tr>
        <tr>
          <td class="tableFirstText">
            <b>ПОРЯДОК УПЛАТЫ СТРАХОВОЙ ПРЕМИИ</b>
          </td>
          <td class="tableSecondText" align="center">Единовременно</td>
          <td class="tableFirstText" align="center"><b>ВИД ОПЛАТЫ</b></td>
          <td class="tableSecondText" align="center">
            {{
              getDictValue(
                "paymentMethod",
                contract.contractInformation.paymentMethod
              )
            }}
          </td>
          <td class="tableFirstText" align="center">
            <b>ПЛАТЕЖНЫЙ ДОКУМЕНТ</b>
          </td>
          <td class="tableSecondText" align="center">-</td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ВЫГОДОПРИОБРЕТАТЕЛЬ</b></td>
          <td colspan="5" class="tableSecondText">
            Выгодоприобретателями по риску А2 признаются наследники по закону,
            по риску А1 и А3 – Застрахованное лицо
          </td>
        </tr>
        <tr>
          <td class="tableFirstText"><b>ОСОБЫЕ УСЛОВИЯ</b></td>
          <td colspan="5" class="tableSecondText">Нет</td>
        </tr>
        <tr>
          <td colspan="6" style="font-size: 9px; padding: 0 10px">
            Настоящим подтверждаю, что Застрахованное лицо не является
            инвалидом, не имеет нервно-психических заболеваний; не употребляет
            наркотики, токсические вещества с целью наркотического и
            токсического опьянения; не страдает алкоголизмом; не состоит на
            учете психоневрологическом или наркологическом диспансере; не
            проходит службу в вооруженных силах; не отбывает наказание в виде
            лишения или ограничения свободы, не находится под арестом, в
            отношении Застрахованного лица не производятся оперативно- розыскные
            мероприятия, не возбуждено уголовное дело. При возникновении
            указанных выше обстоятельств, увеличивающих степень риска, что может
            повлечь за собой доплату страховой премии, обязуюсь сообщить в
            трехдневный срок Страховщику и следовать его указаниям. <br />
            В целях исполнения договора страхования, продвижения услуг
            Страховщика, урегулирования убытка, проверки сведений о состоянии
            здоровья даю согласие на обработку любыми законными способами всех
            предоставляемых или относящихся ко мне персональных данных (в том
            числе, специальных категорий), а также на запрос и получение (в том
            числе после смерти) в любых бюро кредитных и/или страховых историй,
            медицинских, лечебных учреждениях, ФФОМС, правоохранительных
            органах, от третьих лиц относящихся ко мне сведений, включая
            сведений о состоянии здоровья и его изменениях, как на дату
            подписания настоящего согласия, так и в течение предшествующих 5
            (пяти) лет и в течение всего срока действия настоящего согласия,
            составляющего 10 (десять) лет; о праве досрочного отзыва согласия и
            его изменении посредством письменного обращения к Страховщику
            извещен*. Подтверждаю согласие на обработку персональных данных на
            тех же условиях и на тот же срок лиц, указанных в настоящем Полисе и
            обязуюсь предоставить их Страховщику по первому требованию*. <br />
            Подтверждаю, что мне предоставлена вся информация согласно «Базовому
            стандарту защиты прав и интересов физических и юридических лиц –
            получателей финансовых услуг, оказываемых членами саморегулируемых
            организаций, объединяющих страховые организации», в том числе, о
            заключении (п.2.1.2) и исполнении договора (п.3.3.1) (<a
              href="https://ugsk.ru/about/Standart"
              >https://ugsk.ru/about/Standart</a
            >). <br />
            Настоящим подтверждаю, что с Правилами, c Таблицей размеров
            страховых выплат No1, с лицевой и оборотной сторонами Полиса
            ознакомлен и согласен, на руки Полис, Правила и Таблицу размеров
            страховых выплат No1 получил. Мне разъяснено, что вручение Правил
            страхования обеспечивается также посредством доступа к их тексту на
            официальном сайте Страховщика по постоянно действующей ссылке
            <a href="https://ugsk.ru/about/pravila/"
              >https://ugsk.ru/about/pravila/</a
            >. Подтверждаю, что мне разъяснено право на получение Правил
            страхования в любое время по моему требованию, в том числе, в
            электронной форме. Страхователь заявляет, что информация в полисе не
            должна обеспечиваться защитой согласно Внутреннего стандарта ВСС
            «Обеспечение защиты конфиденциальной информации при осуществлении
            страховой деятельности». <br />
            * для дополнения или изменения содержания условий согласия
            необходимо обратиться к представителю Страховщика.
          </td>
        </tr>
        <tr>
          <td class="tableFirstText" colspan="5" style="padding-top: 5px">
            <a-row>
              <a-col :span="10">
                <b>СТРАХОВАТЕЛЬ</b>
              </a-col>
              <a-col>
                <span>__________________</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :offset="11">
                <span>(подпись)</span>
              </a-col>
            </a-row>
          </td>
          <td
            align="center"
            class="tableSecondText"
            rowspan="2"
            style="width: 110px"
          >
            М.П.
          </td>
        </tr>
        <tr>
          <td class="tableFirstText" colspan="5" style="padding-top: 5px">
            <a-row>
              <a-col :span="10">
                <b>ПРЕДСТАВИТЕЛЬ СТРАХОВЩИКА</b>
              </a-col>
              <a-col>
                <span>__________________</span>
              </a-col>
              <a-col :offset="2">
                <span>{{ getUser(contract.user) }}</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :offset="11">
                <span>(подпись)</span>
              </a-col>
              <a-col :offset="5">
                <span>(ФИО)</span>
              </a-col>
            </a-row>
          </td>
        </tr>
      </table>
    </a-row>
  </div>
  <a-button @click="generateContract" class="download" size="large">
    <template #icon>
      <DownloadOutlined />
    </template>
    Скачать
  </a-button>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import contracts from "./contracts.json";
import moment from "moment";
import Dictionaries from "@/components/testData/dictionaries.json";
import html2pdf from "html-to-pdf-js";
import { DownloadOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    DownloadOutlined,
  },
  props: ["id"],
  setup(props) {
    const contract = computed(() =>
      contracts.find((row) => row.id == props.id)
    );
    const dictionaries = ref(Dictionaries);

    const getDateContract = function (date) {
      return moment(date).lang("ru").format("LL");
    };

    const getInsurant = function (insurant: { surname; name; middleName }) {
      const FIO =
        `${insurant.surname} ${insurant.name} ${insurant.middleName}`.toUpperCase();
      return FIO;
    };

    const getDate = function (date) {
      return moment(date).format("DD.MM.YYYY");
    };

    const getDictValue = function (dictionary, valueId) {
      return dictionaries.value[dictionary].entities.find(
        (row) => row.id === valueId
      ).name;
    };

    const getDocument = function (params: {
      documentType;
      series;
      documentNumber;
      dateOfIssue;
      whoIssued;
    }) {
      const docType = dictionaries.value.documentType.entities.find(
        (row) => row.id === params.documentType
      ).name;
      const date = moment(params.dateOfIssue).format("DD.MM.YYYY");

      return `${docType} ${params.series} ${
        params.documentNumber
      } выдан ${date} ${params.whoIssued ? params.whoIssued : ""}`;
    };

    const pdfOptions = {
      margin: 15,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: { scale: 3 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "p",
      },
    };

    const generateContract = function () {
      var element = document.getElementById("mainDocument");
      html2pdf(element);
    };

    const getUser = function (FIO) {
      const array = FIO.split(" ");
      return `${array[0]} ${array[1][0]}. ${array[2][0]}.`;
    };

    return {
      contract,
      getDateContract,
      getInsurant,
      getDate,
      getDocument,
      getDictValue,
      generateContract,
      pdfOptions,
      getUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 800px;
  height: 1120px;
  border: 1px solid #ccc;
  padding: 15px;
  font-family: "Times New Roman", Times, serif;
}
td,
th {
  padding: 3px;
  border: 1px solid black;
}
.tableFirstText {
  font-size: 14px;
  line-height: 16px;
}
.tableSecondText {
  font-size: 12px;
  line-height: 14px;
}
.download {
  position: fixed;
  right: 50px;
  top: 73px;
}
</style>
