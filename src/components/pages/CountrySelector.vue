<template>
  <q-select
    dense
    outlined
    class="q-mb-sm"
    :value="selectedCountry"
    :options="countryOptions"
    option-value="code"
    option-label="country"
    emit-value
    map-options
    use-input
    :loading="isLoading"
    @filter="filterFn"
    @input="onSelectcountry"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, PropSync } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import CountryList from 'src/mock-data/CountryList';

const namespace = 'payment';
@Component
export default class CountrySelector extends Vue {
  @Prop({ required: true, default: false }) isLoading!: any[];
  @PropSync('isLoadingPaymentMethodList', { required: true, default: false })
  isLoadingPaymentMethod!: any;
  @State(state => state.payment.selectedCountry) selectedCountry!: string;
  @Action('setGeolocation', { namespace })
  setGeolocation!: Function;

  //Define data
  public countryOptions: any[] = CountryList;

  private filterFn(val: string, update: any) {
    update(() => {
      if (!val) this.countryOptions = CountryList;
      else {
        const needle = val.toLowerCase();
        this.countryOptions = CountryList.filter(v =>
          v.country.toLowerCase().includes(needle)
        );
      }
    });
  }

  private async onSelectcountry(value: string) {
    try {
      this.isLoadingPaymentMethod = true;
      await this.setGeolocation(value);
    } finally {
      this.isLoadingPaymentMethod = false;
    }
  }
}
</script>
