<template>
  <div v-if="selectedPaymentMethod">
    <div v-if="selectedPaymentMethod.id === 'test'">
      <q-input
        label="Name on card"
        v-model="testPaymentMethodData.cardName"
        outlined
        class="q-mb-md"
        :rules="[
          val =>
            (val && val.length > 0) || 'Please enter your name on the card',
          val => /^[A-Za-z]+$/.test(val) || 'Please enter characters only'
        ]"
      />
      <q-input
        v-model="testPaymentMethodData.cardNumber"
        label="Card Number"
        :rules="rules"
        mask="#### #### #### ####"
        outlined
      >
        <template v-slot:append v-if="cardType">
          <img
            :src="`statics/imgs/cardTypes/${cardType}.png`"
            style="width: 50px"
          /> </template
      ></q-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, PropSync } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import CardValidator from 'card-validator';

const namespace = 'payment';
@Component
export default class PaymentForm extends Vue {
  @Prop({ required: true, default: false }) isLoading!: any[];
  @State(state => state.payment.selectedPaymentMethod)
  selectedPaymentMethod!: any[];

  //Define data
  public testPaymentMethodData = {
    cardName: null,
    cardNumber: null,
    expirationDate: null,
    cvvNumber: null
  };

  public get result() {
    console.log(CardValidator.number(this.testPaymentMethodData.cardNumber));

    return CardValidator.number(this.testPaymentMethodData.cardNumber);
  }

  public get cardType() {
    return this.result.card
      ? this.result.card.niceType.toLowerCase().replace(/\s/g, '')
      : '';
  }

  public rules = [
    (value: any) => !!value || 'Required',
    () => this.result.isValid || 'Invalid'
  ];
}
</script>
