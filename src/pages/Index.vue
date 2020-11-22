<template>
  <div class="">
    <q-layout
      view="lHh lpr lFf"
      container
      :style="{ minHeight: `${pageHeight}px` }"
      class="shadow-2"
    >
      <q-header elevated class="bg-black">
        <q-toolbar style="height: 55px; padding: 0 30px">
          <q-img
            src="statics/paymentwall-logo.svg"
            style="width: 180px; height: 23px"
          />
        </q-toolbar>
      </q-header>

      <q-footer elevated class="bg-black">
        <q-toolbar>
          <div class="q-mx-auto">
            <q-img
              src="statics/paymentwall-logo.svg"
              style="width: 108px; height: 14px"
            />
            © Powered by Paymentwall.
            <a
              href="https://www.paymentwall.com/en/privacypolicy"
              target="_blank"
              rel="Privacy Policy"
            >
              Privacy Policy</a
            >
          </div>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page class="payment-container q-pa-md q-pa-sm-lg">
          <div class="row">
            <div class="col-sm-5 col-12">
              <div class="component-title">Select payment method</div>
              <country-selector
                :isLoading="isLoadingGeoLocaction"
                :isLoadingPaymentMethodList.sync="isLoadingPaymentMethodList"
              />
              <payment-method-list :isLoading="isLoadingPaymentMethodList" />
            </div>
            <div class="col-sm-7 col-12 q-pl-none q-pl-sm-xl">
              <div class="component-title">
                Payment form:
                {{ selectedPaymentMethod && selectedPaymentMethod.name }}
              </div>
              <payment-form :isLoading="isLoadingPaymentMethodList" />
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
    PaymentMethodList: () => import('@Components/pages/PaymentMethodList.vue'),
    PaymentForm: () => import('@Components/pages/PaymentForm.vue')
  }
})
export default class Payment extends Vue {
  @State(state => state.payment.selectedCountry) selectedCountry!: string;
  @State(state => state.payment.paymentMethodList) paymentMethodList!: any[];
  @State(state => state.payment.selectedPaymentMethod)
  selectedPaymentMethod!: any[];
  @Action('getGeolocation', { namespace }) getGeolocation!: Function;

  public isLoadingGeoLocaction: boolean = false;
  public isLoadingPaymentMethodList: boolean = false;
  public pageHeight: number = 0;

  async created() {
    this.onResize();
    if (!this.selectedCountry)
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
