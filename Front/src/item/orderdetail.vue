<template>
  <v-container>
    <h1 class="text-center ma-5">주문 내역 상세보기</h1>
    <v-card
      flat
      outlined
      max-width="800"
      class="mx-auto mb-3"
    >
      <v-simple-table
        class="ma-5"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">제품명</th>
              <th class="text-center">가격</th>
              <th class="text-center">수량</th>
              <th class="text-center">총 금액</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order_list"
              :key="item.opid"
            >
              <td>
                <v-chip
                  class="ma-2"
                  color="#F29F8F"
                  small
                  pill
                  text-color="white"
                >{{item.pcate}}</v-chip>
                {{ item.pname }}
              </td>
              <td class="text-center">{{ item.pprice }}</td>
              <td class="text-center">{{ item.pcount }}</td>
              <td class="text-center">{{ item.pprice * item.pcount}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card
      outlined
      max-width="800"
      class="mx-auto"
    >
      <v-card-title>배송 정보</v-card-title>
      <v-card-text
        v-for="item in user_list"
        :key="item.oid"
        class="mx-auto"
      >
        <v-row>
          <v-col cols="6" sm="3"> 주문번호 </v-col>
          <v-col cols="6" sm="9"> {{item.oid}} </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="6" sm="3"> 주문자 </v-col>
          <v-col cols="6" sm="9"> {{item.oname}} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="3"> 핸드폰번호 </v-col>
          <v-col cols="6" sm="9"> {{item.ophone}} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="3"> 주소 </v-col>
          <v-col cols="6" sm="9"> {{item.oaddress}} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="3"> 주문일자 </v-col>
          <v-col cols="6" sm="9"> {{item.order_date}} </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="3"> 결제 금액 </v-col>
          <v-col cols="6" sm="9"> {{item.oprice}} </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="d-flex justify-center align-center ma-3">
      <v-btn
        outlined
        height="50"
        width="200"
        large
        @click="back_router()"
      >
        목록으로
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderDetail",
  data: () => ({
    order: [
      {
        oid: 1,
        oname: '주문자이름',
        ophone: '010-0000-0000',
        oaddress: '서울특별시 중구 서울특별시 중구 서울특별시 중구',
        order_date: '2021-05-06 00시 00분 00초',
        oprice: '30000원',
      }
    ],
    cards: [
      { oid:1, pid:1, pcate:'CPU', pname: 'Pre-fab homesPre-fab homesPre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', rating:3, pprice:1000, preview:20, pcount:1 },
      { oid:1, pid:2, pcate:'RAM', pname: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', rating:4.5, pprice:150000, preview:5, pcount:2 },
      { oid:1, pid:3, pcate:'ETC', pname: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', rating:2, pprice:200, preview:2, pcount:10 },
    ],
    order_list:[],
    user_list:[],
  }),
  methods:{
    order_data:function(){
      var params = new URLSearchParams();
      params.append('oid', this.$route.params.oid);
      axios.post('/SkdevsecOrderproduct/pay_result_output', params).then(response => {
        this.order_list = response.data;
      });
    },
    user_data:function(){
      var params = new URLSearchParams();
      params.append('oid', this.$route.params.oid);
      axios.post('SkdevsecOrderuser/user_paid_input', params).then(response => {
        this.user_list = response.data;
      });
    },
    back_router(){
      this.$router.go(-1);
    },
  },
  mounted(){
    this.order_data();
    this.user_data();
  },
}
</script>