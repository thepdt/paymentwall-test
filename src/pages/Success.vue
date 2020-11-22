<template>
  <div
    class="payment-success-page text-center"
    :style="{ minHeight: `${pageHeight}px` }"
  >
    <div style="margin:auto">
      <img
        src="statics/icons/success.svg"
        class="q-mb-lg"
        style="width:50vw;max-width:84px;"
      />
      <div class="page-title q-mb-md">Payment Successful</div>
      <div class="page-detail q-mb-md">Thank you for your purchase !</div>
      <div
        class="back-btn text-primary cursor-pointer text-uppercase"
        @click="backToWebsite"
      >
        Back to Website
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Success extends Vue {
  public pageHeight: number = 0;

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  }
  public onResize() {
    this.pageHeight = window.innerHeight;
  }

  public backToWebsite() {
    this.$router.push({ name: 'home' });
  }
}
</script>

<style lang="scss" scoped>
.payment-success-page {
  max-width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  .page-title {
    font-size: 30px;
    font-weight: 900;
  }
  .page-detail {
    font-size: 20px;
  }
  .back-btn {
    font-weight: 600;
    font-size: 18px;
    :hover {
      text-decoration: underline;
    }
  }
}
</style>
