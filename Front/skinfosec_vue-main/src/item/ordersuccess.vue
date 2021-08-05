<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-card flat>
        <h1 class="d-flex justify-center align-center">결제 성공</h1>
        <br>
        <v-card-actions>
          <v-btn
            dark
            color="#F29F8F"
            height="50"
            width="200"
            @click="submit()"
            large
          >
            주문 내역 보기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderResult",
  mounted(){
    this.payseuccess();
  },
  methods: {
    payseuccess(){
      var params = new URLSearchParams();
      axios.post('/SkdevsecOrderuser/pay_success', params).then(response => {
        console.log(response.data);
      });
    },
    submit(){
      this.$router.push("/item/orderlist");
    },
  }
}
</script>