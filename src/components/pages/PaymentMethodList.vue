<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <q-spinner color="primary" size="3em" />
    </div>
    <div v-else class="row justify-center">
      <div
        v-for="paymentMethod in paymentMethodList"
        :key="paymentMethod.id"
        :class="[
          'col-3 col-sx-12 col-sm-6 col-md-4 payment-method-card',
          {
            active:
              selectedPaymentMethod &&
              selectedPaymentMethod.id === paymentMethod.id
          }
        ]"
        @click="selectPaymentMethod(paymentMethod)"
      >
        <div class="payment-method-img">
          <q-img :src="paymentMethod.img_url" />
        </div>
        <div class="payment-method-name text-center">
          {{ paymentMethod.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

const namespace = 'payment';
@Component
export default class PaymentMethodList extends Vue {
  @Prop({ required: true, default: false }) isLoading!: any[];
  @State(state => state.payment.paymentMethodList) paymentMethodList!: any[];
  @State(state => state.payment.selectedPaymentMethod)
  selectedPaymentMethod!: any[];
  @Action('selectPaymentMethod', { namespace })
  selectPaymentMethod!: Function;
}
</script>

<style lang="scss" scoped>
.payment-method-card {
  cursor: pointer;
  padding: 10px;
  min-width: 120px;
  max-width: 150px;
  .payment-method-img {
    padding: 5px;
    box-shadow: 0 5px 12px 0 rgba(43, 55, 64, 0.3);
    box-sizing: border-box;
    border-radius: 3px;
    position: relative;
    min-height: 60px;
    display: flex;
    align-items: center;
  }
  .payment-method-name {
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover,
  &.active {
    .payment-method-img {
      border: solid 2px #08151e;
      padding: 3px;
    }
  }

  &.active {
    .payment-method-img {
      &::before {
        content: ' ';
        display: block;
        position: absolute;
        left: -1px;
        top: -1px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 25px 30px 0 0;
        border-color: #08151e transparent transparent transparent;
        z-index: 99;
      }
      &::after {
        content: ' ';
        display: block;
        position: absolute;
        left: 5px;
        top: 1px;
        width: 5px;
        height: 9px;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        border-color: #fff;
        border-style: solid;
        z-index: 999;
      }
    }
  }
}
</style>
