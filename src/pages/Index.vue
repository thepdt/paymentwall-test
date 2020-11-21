<template>
  <div class="">
    <q-layout
      view="lHh lpr lFf"
      container
      :style="{ minHeight: `${pageHeight}px` }"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-black">
        <q-toolbar style="height: 55px; padding: 0 30px">
          <q-img
            src="statics/paymentwall-logo.svg"
            style="width: 180px; height: 23px"
          />
          <q-space />
          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-footer elevated class="bg-black">
        <q-toolbar>
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page style="padding: 25px" class="payment-container">
          <div class="row">
            <div class="col-sm-5 col-12">
              <div class="component-title">Select payment method</div>
              <country-selector
                :isLoading="isLoadingGeoLocaction"
                :isLoadingPaymentMethodList.sync="isLoadingPaymentMethodList"
              />
              <payment-method-list :isLoading="isLoadingPaymentMethodList" />
            </div>
            <div class="col-sm-7 col-12">
              <div class="component-title">Payment form</div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

const namespace = 'payment';
@Component({
  components: {
    CountrySelector: () => import('@Components/pages/CountrySelector.vue'),
    PaymentMethodList: () => import('@Components/pages/PaymentMethodList.vue')
  }
})
export default class Payment extends Vue {
  @Action('getGeolocation', { namespace }) getGeolocation!: Function;
  @State(state => state.payment.paymentMethodList) paymentMethodList!: any[];

  public isLoadingGeoLocaction: boolean = true;
  public isLoadingPaymentMethodList: boolean = true;
  public pageHeight: number = 0;

  async created() {
    this.onResize();
    try {
      this.isLoadingGeoLocaction = true;
      this.isLoadingPaymentMethodList = true;
      await this.getGeolocation();
    } finally {
      this.isLoadingGeoLocaction = false;
      this.isLoadingPaymentMethodList = false;
    }
  }

  mounted() {
    window.addEventListener('resize', this.onResize);
  }
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }

  public onResize() {
    this.pageHeight = window.innerHeight;
  }
}
</script>

<style lang="scss" scoped>
.payment-container {
  max-width: 1100px;
  margin: auto;
  .component-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 23px;
  }
}
</style>
