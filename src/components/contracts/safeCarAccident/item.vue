<template>
  <div class="main_layout">
    <transition name="fade">
      <div v-if="loading" class="loader">
        <a-spin :indicator="indicator" tip="Загрузка" />
      </div>
    </transition>
    <a-form
      ref="formRef"
      :model="contract"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-divider orientation="left" style="border-color: #004990" dashed>
        УСЛОВИЯ СТРАХОВАНИЯ
      </a-divider>

      <a-row class="row">
        <a-col :span="8">
          <a-row>
            <span class="text-label">Программа страхования</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.insuranceProgram"
              style="width: 650px"
              defaultActiveFirstOption
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.insuranceProgram.entities"
                :key="dictionary.id"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
        <a-col :span="8" :offset="1">
          <a-row>
            <span class="text-label">Страховая сумма</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.insuranceAmount"
              style="width: 650px"
              defaultActiveFirstOption
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.insuranceAmount.entities"
                :key="dictionary.id"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
      </a-row>

      <a-divider orientation="left" style="border-color: #004990" dashed>
        ПАРАМЕТРЫ ДОГОВОРА
      </a-divider>

      <a-row class="row">
        <a-col :span="9">
          <div>
            <span class="text-label">Номер полиса</span>
            <a-form-item
              name="policyNumber"
              v-bind="validateInfos.policyNumber"
            >
              <a-input
                class="input"
                addon-before="37/22 - БА№12"
                v-model:value="contract.policyNumber"
                :maxlength="7"
                placeholder="0000000"
                @change="onlyINT('policyNumber')"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="6">
          <a-row>
            <span class="text-label">Дата заключения договора</span>
          </a-row>
          <a-row class="input">
            <a-date-picker
              placeholder="Выберите дату"
              v-model:value="contract.dateOfConclusionOfTheAgreement"
              disabled
              :format="'DD.MM.YYYY'"
            />
          </a-row>
        </a-col>

        <a-col :span="5">
          <a-row>
            <span class="text-label">Период страхования</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.insurancePeriod"
              style="width: 650px"
              defaultActiveFirstOption
            >
              <a-select-option value="1 год"> 1 год </a-select-option>
            </a-select>
          </a-row>
        </a-col>

        <a-col :span="6" :offset="1">
          <a-row>
            <span class="text-label">Дата начала</span>
          </a-row>
          <a-row class="input">
            <a-date-picker
              placeholder="Выберите дату"
              v-model:value="contract.startDate"
              :format="'DD.MM.YYYY'"
              :allowClear="false"
              :disabled-date="disabledDate"
            />
          </a-row>
        </a-col>

        <a-col :span="6">
          <a-row>
            <span class="text-label">Дата окончания</span>
          </a-row>
          <a-row class="input">
            <a-date-picker
              placeholder="Выберите дату"
              v-model:value="contract.endDate"
              :format="'DD.MM.YYYY'"
              disabled
            />
          </a-row>
        </a-col>
      </a-row>

      <a-divider orientation="left" style="border-color: #004990" dashed>
        СТРАХОВАТЕЛЬ
      </a-divider>

      <a-row class="row">
        <a-col :span="5">
          <a-row>
            <span class="text-label">Тип контрагента</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.counterpartyType"
              style="width: 650px"
              @change="clearInsurantInfo"
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.counterpartyType.entities"
                :key="dictionary.id"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
        <a-col :span="5" :offset="1" v-if="contract.counterpartyType != 2">
          <a-row>
            <span class="text-label">Тип документа</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.documentType"
              style="width: 231.25px"
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.documentType.entities"
                :key="dictionary.id"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
        <a-col :span="5" :offset="1" v-if="contract.counterpartyType != 2">
          <div>
            <span class="text-label">Серия</span>
            <a-form-item
              ref="series"
              name="series"
              v-bind="validateInfos.series"
            >
              <a-input
                class="input"
                v-model:value="contract.series"
                :maxlength="4"
                placeholder="Серия документа"
                @change="onlyINT('series')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="5" :offset="1" v-if="contract.counterpartyType != 2">
          <div>
            <span class="text-label">Номер</span>
            <a-form-item
              name="documentNumber"
              v-bind="validateInfos.documentNumber"
            >
              <a-input
                class="input"
                v-model:value="contract.documentNumber"
                :maxlength="6"
                placeholder="Номер документа"
                @change="onlyINT('documentNumber')"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-row
        class="row"
        v-if="contract.documentType == 2 && contract.counterpartyType != 2"
      >
        <a-col :span="5">
          <div>
            <span class="text-label">Код подразделения</span>
            <a-form-item
              name="businessUnitCode"
              v-bind="validateInfos.businessUnitCode"
            >
              <a-input
                class="input"
                v-model:value="contract.businessUnitCode"
                :maxlength="6"
                placeholder="000000"
                @change="onlyINT('businessUnitCode')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="11" :offset="1">
          <div>
            <span class="text-label">Место рождения</span>
            <a-form-item
              name="placeOfBirth"
              v-bind="validateInfos.placeOfBirth"
            >
              <a-input
                class="input"
                v-model:value="contract.placeOfBirth"
                placeholder=""
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-row
        class="row"
        v-if="contract.documentType == 2 && contract.counterpartyType != 2"
      >
        <a-col :span="11">
          <div>
            <span class="text-label"
              >Кем выдан документ, удостоверяющий личность</span
            >
            <a-form-item name="whoIssued" v-bind="validateInfos.whoIssued">
              <a-input
                class="input"
                v-model:value="contract.whoIssued"
                placeholder=""
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="11" :offset="1">
          <div>
            <a-row>
              <span class="text-label"
                >Дата выдачи документа, удостоверяющего личность</span
              >
            </a-row>
            <a-row class="input">
              <a-form-item
                name="dateOfIssue"
                v-bind="validateInfos.dateOfIssue"
              >
                <a-date-picker
                  placeholder="Выберите дату"
                  v-model:value="contract.dateOfIssue"
                  :format="'DD.MM.YYYY'"
                  style="width: 460px"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row class="row" v-if="contract.documentType == 1">
        <a-col :span="11">
          <div>
            <a-row>
              <span class="text-label"
                >Дата выдачи документа, удостоверяющего личность</span
              >
            </a-row>
            <a-row class="input">
              <a-form-item
                name="dateOfIssue"
                v-bind="validateInfos.dateOfIssue"
              >
                <a-date-picker
                  placeholder="Выберите дату"
                  v-model:value="contract.dateOfIssue"
                  :format="'DD.MM.YYYY'"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row class="row" v-if="contract.counterpartyType == 2">
        <a-col :span="14">
          <div>
            <span class="text-label">Наименование организации</span>
            <a-form-item
              name="nameOfCompany"
              v-bind="validateInfos.nameOfCompany"
            >
              <a-input
                class="input"
                v-model:value="contract.nameOfCompany"
                placeholder="Введите наименование организации"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="8" :offset="1">
          <div>
            <span class="text-label">ИНН (Код регистрации)</span>
            <a-form-item
              name="INNRegistrationCode"
              v-bind="validateInfos.INNRegistrationCode"
            >
              <a-input
                class="input"
                v-model:value="contract.INNRegistrationCode"
                @change="onlyINT('INNRegistrationCode')"
                :maxlength="10"
                placeholder="0000000000"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-row class="row" v-if="contract.counterpartyType == 2">
        <a-col :span="7">
          <div>
            <span class="text-label">Номер записи в ЕГРЮЛ</span>
            <a-form-item name="EGRYL" v-bind="validateInfos.EGRYL">
              <a-input
                class="input"
                v-model:value="contract.EGRYL"
                @change="onlyINT('EGRYL')"
                :maxlength="13"
                placeholder="0000000000000"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="7" :offset="1">
          <div>
            <span class="text-label">ОГРН</span>
            <a-form-item name="OGRN" v-bind="validateInfos.OGRN">
              <a-input
                class="input"
                v-model:value="contract.OGRN"
                @change="onlyINT('OGRN')"
                :maxlength="13"
                placeholder="0000000000000"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="7" :offset="1">
          <div>
            <a-row>
              <span class="text-label">Дата регистрации</span>
            </a-row>
            <a-row class="input">
              <a-form-item name="dateRegYL" v-bind="validateInfos.dateRegYL">
                <a-date-picker
                  placeholder="Выберите дату"
                  v-model:value="contract.dateRegYL"
                  :format="'DD.MM.YYYY'"
                  style="width: 460px"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row class="row" v-if="contract.counterpartyType != 2">
        <a-col :span="5">
          <div>
            <span class="text-label">Фамилия</span>
            <a-form-item name="surname" v-bind="validateInfos.surname">
              <a-input
                class="input"
                v-model:value="contract.surname"
                placeholder=""
                @change="onlySTR('surname')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <span class="text-label">Имя</span>
            <a-form-item name="name" v-bind="validateInfos.name">
              <a-input
                class="input"
                v-model:value="contract.name"
                placeholder=""
                @change="onlySTR('name')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <span class="text-label">Отчество</span>
            <a-form-item name="middleName" v-bind="validateInfos.middleName">
              <a-input
                class="input"
                v-model:value="contract.middleName"
                placeholder=""
                @change="onlySTR('middleName')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <a-row>
              <span class="text-label">Дата рождения</span>
            </a-row>
            <a-row class="input">
              <a-form-item
                name="dateOfBirth"
                v-bind="validateInfos.dateOfBirth"
              >
                <a-date-picker
                  placeholder="Выберите дату"
                  v-model:value="contract.dateOfBirth"
                  :format="'DD.MM.YYYY'"
                  style="width: 460px"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row class="row" v-if="contract.counterpartyType === 3">
        <a-col :span="5">
          <div>
            <a-row>
              <span class="text-label">Дата регистрации ИП</span>
            </a-row>
            <a-row class="input">
              <a-form-item
                name="IPRegistrationDate"
                v-bind="validateInfos.IPRegistrationDate"
              >
                <a-date-picker
                  placeholder="Выберите дату"
                  v-model:value="contract.IPRegistrationDate"
                  :format="'DD.MM.YYYY'"
                  style="width: 460px"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
        <a-col :span="7" :offset="1">
          <div>
            <span class="text-label">ИНН</span>
            <a-form-item name="INN" v-bind="validateInfos.INN">
              <a-input
                class="input"
                v-model:value="contract.INN"
                placeholder="Введите ИНН"
                :maxlength="12"
                @change="onlyINT('INN')"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="7" :offset="1">
          <div>
            <span class="text-label">Номер записи в ЕГРИП</span>
            <a-form-item
              name="numberInTheUSRIP"
              v-bind="validateInfos.numberInTheUSRIP"
            >
              <a-input
                class="input"
                v-model:value="contract.numberInTheUSRIP"
                placeholder="000000000000000"
                :maxlength="15"
                @change="onlyINT('numberInTheUSRIP')"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <div style="margin-top: 10px" v-if="contract.counterpartyType == 2">
        <hr />
        <b class="text-label">Уполномоченный представитель</b>
        <a-row class="row">
          <a-col :span="23">
            <div>
              <span class="text-label">ФИО</span>
              <a-form-item
                name="authorisedRepresentativeFIO"
                v-bind="validateInfos.authorisedRepresentativeFIO"
              >
                <a-input
                  class="input"
                  v-model:value="contract.authorisedRepresentativeFIO"
                  placeholder="Фамилия Имя Отчество"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="11">
            <div>
              <span class="text-label">Должность</span>
              <a-form-item
                name="authorisedRepresentativePosition"
                v-bind="validateInfos.authorisedRepresentativePosition"
              >
                <a-input
                  class="input"
                  v-model:value="contract.authorisedRepresentativePosition"
                  placeholder="Должность"
                />
              </a-form-item>
            </div>
          </a-col>
          <a-col :span="11" :offset="1">
            <div>
              <span class="text-label"
                >Документ, на основании которого действует представитель</span
              >
              <a-form-item
                name="authorisedRepresentativeDocument"
                v-bind="validateInfos.authorisedRepresentativeDocument"
              >
                <a-input
                  class="input"
                  v-model:value="contract.authorisedRepresentativeDocument"
                  placeholder="Документ/Доверенность"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <hr />
      </div>

      <a-row class="row">
        <a-col :span="23">
          <div>
            <a-row>
              <span class="text-label">Адрес страхователя</span>
            </a-row>
            <a-row class="input">
              <a-form-item
                name="addressOfThePolicyholder"
                v-bind="validateInfos.addressOfThePolicyholder"
              >
                <a-textarea
                  v-model:value="contract.addressOfThePolicyholder"
                  placeholder=""
                  :rows="3"
                />
              </a-form-item>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col>
          <a-checkbox v-model:checked="contract.FIASDoesntHaveAHouseNumber">
            <span class="text-label"> В ФИАС отсутствует номер дома </span>
          </a-checkbox>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="10">
          <div>
            <span class="text-label">Email</span>
            <a-form-item name="Email" v-bind="validateInfos.email">
              <a-input
                class="input"
                v-model:value="contract.email"
                placeholder=""
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="10" :offset="1">
          <div>
            <span class="text-label">Телефон</span>
            <a-form-item name="phoneNumber" v-bind="validateInfos.phoneNumber">
              <a-input
                class="input"
                v-model:value="contract.phoneNumber"
                placeholder=""
                :maxlength="10"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-divider orientation="left" style="border-color: #004990" dashed>
        ПАРАМЕТРЫ ЛЕГКОВОГО ТС
      </a-divider>

      <a-row class="row">
        <a-col :span="5">
          <a-row>
            <span class="text-label">Марка легкового ТС</span>
          </a-row>
          <a-row class="input">
            <a-form-item
              name="vehicleBrand"
              v-bind="validateInfos.vehicleBrand"
            >
              <a-select
                v-model:value="contract.vehicleBrand"
                style="width: 231.25px"
                show-search
                @change="changeModelVinReg"
              >
                <a-select-option
                  :value="vehicleBrand"
                  v-for="vehicleBrand of dictionaries.vehicleBrand.entities"
                  :key="vehicleBrand"
                >
                  {{ vehicleBrand }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-row>
            <span class="text-label">Модель легкового ТС</span>
          </a-row>
          <a-row class="input">
            <a-form-item
              name="vehicleModel"
              v-bind="validateInfos.vehicleModel"
            >
              <a-select
                v-model:value="contract.vehicleModel"
                style="width: 231.25px"
                show-search
                :disabled="!contract.vehicleBrand"
              >
                <a-select-option
                  :value="vehicleModel"
                  v-for="vehicleModel of dictionaries.vehicleModel.entities[
                    contract.vehicleBrand
                  ]"
                  :key="vehicleModel"
                >
                  {{ vehicleModel }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <span class="text-label">VIN</span>
            <a-form-item name="VIN" v-bind="validateInfos.VIN">
              <a-input
                class="input"
                v-model:value="contract.VIN"
                placeholder=""
                :maxlength="17"
                @change="toUpper('VIN')"
                :disabled="!contract.vehicleModel"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <span class="text-label">Государственный рег. знак</span>
            <a-form-item
              name="stateRegistrationMark"
              v-bind="validateInfos.stateRegistrationMark"
            >
              <a-input
                class="input"
                v-model:value="contract.stateRegistrationMark"
                placeholder="А000АА00"
                :maxlength="9"
                @change="checkStateRegistrationMark"
                :disabled="!contract.vehicleModel"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <a-divider orientation="left" style="border-color: #004990" dashed>
        ОПЛАТА
      </a-divider>

      <a-row class="row">
        <a-col :span="5">
          <a-row>
            <span class="text-label">Скидка по договору</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.contractDiscount"
              style="width: 650px"
              defaultActiveFirstOption
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.contractDiscount.entities"
                :key="dictionary.id"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
        <a-col :span="5" :offset="1">
          <div>
            <span class="text-label">Коэффициент андеррайтера</span>
            <a-input
              class="input"
              v-model:value="contract.underwriterRatio"
              placeholder=""
            />
          </div>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="5">
          <a-row>
            <span class="text-label">Способ оплаты</span>
          </a-row>
          <a-row class="input">
            <a-select
              v-model:value="contract.paymentMethod"
              style="width: 650px"
              defaultActiveFirstOption
            >
              <a-select-option
                :value="dictionary.id"
                v-for="dictionary of dictionaries.paymentMethod.entities"
                :key="dictionary.id"
                :disabled="dictionary.name === 'Наличные по квинтанции А7'"
              >
                {{ dictionary.name }}
              </a-select-option>
            </a-select>
          </a-row>
        </a-col>
        <a-col :span="4" :offset="1">
          <div>
            <span class="text-label">Номер документа</span>
            <a-form-item
              name="paymentDocumentNumber"
              v-bind="validateInfos.paymentDocumentNumber"
            >
              <a-input
                class="input"
                v-model:value="contract.paymentDocumentNumber"
                placeholder=""
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="4" :offset="1">
          <div>
            <span class="text-label">Сумма</span>
            <a-form-item name="paymentSum" v-bind="validateInfos.paymentSum">
              <a-input
                class="input"
                v-model:value="contract.paymentSum"
                placeholder=""
                suffix="₽"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="4" :offset="1">
          <div>
            <span class="text-label">Подтверждение</span>
            <a-form-item
              name="paymentConfirmation"
              v-bind="validateInfos.paymentConfirmation"
            >
              <a-input
                class="input"
                v-model:value="contract.paymentConfirmation"
                placeholder=""
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>

      <div class="actionsButtons">
        <a-row type="flex" justify="center">
          <a-button @click="onSubmit" size="small" type="primary">
            <template #icon><SaveOutlined /></template>
            Сохранить
          </a-button>
        </a-row>
        <a-row type="flex" justify="center">
          <a-button
            @click="calc"
            size="small"
            type="primary"
            style="margin: 10px 0"
            :disabled="!contract.status == 'Проект' || !contractId"
          >
            <template #icon><CalculatorOutlined /></template>
            Рассчитать
          </a-button>
        </a-row>
        <a-row type="flex" justify="center">
          <a-button
            @click="onSubmit"
            size="small"
            type="danger"
            :disabled="true"
          >
            <template #icon><CheckOutlined /></template>
            Продать
          </a-button>
        </a-row>
      </div>

      <Card :contract="contract" />
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";

import {
  SaveOutlined,
  CalculatorOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import safeCarAccident from "./safeCarAccident";

import Card from "./card.vue";

export default defineComponent({
  components: {
    Card,
    SaveOutlined,
    CheckOutlined,
    CalculatorOutlined,
  },
  props: ["contractId"],
  setup(props) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: "48px",
        color: "#fff",
      },
      spin: true,
    });

    return {
      indicator,
      ...safeCarAccident(props),
    };
  },
});
</script>

<style lang="scss" scoped>
.main_layout {
  width: 1140px;
  height: auto;
  background-color: #fff;
  padding: 15px;
}
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
.ant-form-item {
  margin-bottom: 0px !important;
}
.ant-calendar-picker {
  width: 231.25px !important;
}
textarea {
  width: 1065px !important;
}
.ant-form-item-explain {
  min-height: 0px !important;
}
.actionsButtons {
  width: 170px;
  height: 120px;
  margin-left: 100px;
  background-color: #005394;
  border-top: 3px red solid;
  border-right: 3px red solid;
  border-left: 3px red solid;
  position: fixed;
  left: 0;
  bottom: 46.55px;
  overflow: auto;
  z-index: 20;
  padding-top: 13px;
}
.loader {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.ant-spin {
  color: #ffffff !important;
  font-size: 18px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
