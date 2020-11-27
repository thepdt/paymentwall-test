<template>
  <q-form v-if="selectedPaymentMethod" ref="testPaymentMethodForm">
    <q-input
      label="Name on card"
      v-model="testPaymentMethodData.cardName"
      outlined
      class="q-mb-md"
      :rules="[
        val => (val && val.length > 0) || 'Please enter your name on the card',
        val => /^[A-Za-z\s]+$/.test(val) || 'Please enter characters only'
      ]"
    />
    <q-input
      v-model="testPaymentMethodData.cardNumber"
      label="Card Number"
      outlined
      class="q-mb-md"
      :rules="cardNumberRules"
      lazy-rules
      mask="#### #### #### ####"
      unmasked-value
    />
    <div class="row">
      <q-input
        label="Expiration date"
        v-model="testPaymentMethodData.expirationDate"
        outlined
        class="q-mb-md col-12 col-sm-6 q-pr-sm-xs"
        mask="##/####"
        lazy-rules
        :rules="expirationDateRules"
      >
      </q-input>
      <q-input
        label="CVV"
        v-model="testPaymentMethodData.cvvNumber"
        outlined
        class="q-mb-md col-12 col-sm-6 q-pl-sm-xs"
        v-on:keypress="isNumber($event)"
        type="password"
        :rules="[
          val =>
            (val && val.length > 0) ||
            'Please enter your cvv number on the card'
        ]"
      >
        <template v-slot:append>
          <img
            src="statics/icons/credit-card-with-cvv-code.svg"
            style="width: 50px"
          />
        </template>
      </q-input>
    </div>
    <q-btn
      class="full-width q-mt-lg"
      :label="`Pay ${billAmount}${billCurrency}`"
      icon="lock"
      color="orangish"
      text-color="black"
      size="20px"
      no-caps
      unelevated
      @click="submitForm"
    />
  </q-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import moment from 'moment';

@Component
export default class PaymentForm extends Vue {
  $refs!: { testPaymentMethodForm: HTMLFormElement };

  @Prop({ required: true, default: false }) isLoading!: any[];
  @State(state => state.payment.selectedPaymentMethod)
  selectedPaymentMethod!: any[];

  //Define data
  public billAmount = '99.89';
  public billCurrency = '$';
  public testPaymentMethodData = {
    cardName: null,
    cardNumber: null,
    expirationDate: null,
    cvvNumber: null
  };

  public cardNumberRules = [
    (value: any) => !!value || 'Required',
    (value: any) => this.luhnChecksum(value) === 0 || 'Invalid'
  ];

  luhnChecksum(code: string) {
    var len = code.length;
    var parity = len % 2;
    var sum = 0;
    for (var i = len - 1; i >= 0; i--) {
      var d = parseInt(code.charAt(i));
      if (i % 2 == parity) {
        d *= 2;
      }
      if (d > 9) {
        d -= 9;
      }
      sum += d;
    }
    return sum % 10;
  }

  public expirationDateRules = [
    (val: any) =>
      !val ||
      moment(val, 'MM/YYYY', true).isValid() ||
      moment(val, 'MM/YY', true).isValid() ||
      'Invalid date format',
    (val: any) =>
      moment(val, 'MM/YYYY').isAfter(moment().subtract(1, 'months')) ||
      moment(val, 'MM/YY').isAfter(moment().subtract(1, 'months')) ||
      'Please enter a future date'
  ];

  public isNumber(e: any) {
    let number = String.fromCharCode(e.keyCode);
    if (/^[0-9]+$/.test(number)) return true;
    else e.preventDefault();
  }

  public submitForm() {
    this.$refs.testPaymentMethodForm
      .validate()
      .then(async (success: boolean) => {
        if (success) {
          this.$router.push({ name: 'success' });
        }
      });
  }
}
</script>
