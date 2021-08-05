<template>
  <v-container>
    <h1 class="text-center ma-5">{{unickname}}님 주문내역</h1>
    <v-card outlined>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          sm="4"
        >
          <v-btn-toggle
            v-model="searchmonth"
            color="cyan darken-4"
            rounded
          >
            <v-btn @click="order_date_btn('1')">
              1주일
            </v-btn>

            <v-btn @click="order_date_btn('2')">
              1개월
            </v-btn>

            <v-btn @click="order_date_btn('3')">
              3개월
            </v-btn>

            <v-btn @click="order_date_btn('4')">
              6개월
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col
          cols="6"
          sm="3"
        >
          <v-menu
            v-model="startmenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startdate"
                label="검색 시작 날짜"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startdate"
              @input="startmenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="6"
          sm="3"
        >
          <v-menu
            v-model="endmenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="enddate"
                label="검색 끝 날짜"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="enddate"
              @input="endmenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="1">
          <v-btn
            dark
            color="#F29F8F"
            @click="historyorder"
          >
            조회
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-simple-table
      class="ma-5"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">주문일자</th>
            <th class="text-center">제품명</th>
            <th class="text-center">주문자</th>
            <th class="text-center">주문금액</th>
            <th class="text-center">주문처리상태</th>
            <th class="text-center">취소/교환/반품</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in orderdata"
            :key="item.oid"
            style="cursor:pointer"
            @click="itemclick(item)"
          >
            <td class="text-center">{{ item.order_date }}</td>
            <td v-if='item.product_count <= 1'>
                {{item.pname}}
            </td>
            <td v-if='item.product_count > 1'>
                {{item.pname}} 외 {{item.product_count}}건
            </td>
            <td class="text-center">{{ item.oname }}</td>
            <td class="text-center">{{ item.oprice }}</td>
            <td class="text-center">결제완료</td>
            <td class="text-center">
              <v-btn
                outlined
              >
                취소
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="text-center">
        <v-pagination
          v-model="page"
          :length="len"
          circle
          color="#F29F8F"
        ></v-pagination>
      </div>
      <br>
    <v-row align="center" justify="center">
      <v-btn
        outlined
        class="ma-2"
        height="50"
        width="200"
        color="grey"
        to="/item/itemlist"
      >
        <v-icon>mdi-cart</v-icon>
        쇼핑계속하기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderList",
  data: () => ({
    startdate: '',
    enddate: '',
    searchmonth: '',
    page:1,
    len:0,
    startmenu:false,
    endmenu:false,
    unickname:'',
    orderdata:[],
    search_state:false,
    search_date:false,
    code:'',
    orders: [
      { oid:1, pid:1, oname: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', order_date:'2021-05-02', pprice:'100,000', pcount:1, ostate:'배송준비중' },
      { oid:2, pid:2, oname: '두번째 주문', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', order_date:'2021-05-02', pprice:'100,000', pcount:1, ostate:'배송중' },
    ],
  }),
  methods: {
    itemclick(item) {
      this.$router.push('/item/orderdetail/' + item.oid)
    },
    historyorder(){
      this.search_state = true;
      var params = new URLSearchParams();
      params.append("unickname", this.unickname);
      params.append("opage", this.page);
      params.append("start_date", this.startdate);
      params.append("end_date", this.enddate);
      axios.post("/SkdevsecOrderuser/user_paid_date", params).then(response => {
                this.boardlength(response.data[0].order_count);
                response.data.shift()
                this.orderdata = response.data;
      });
    },
    order_list: function(){
      this.search_state = false;
      var params = new URLSearchParams();
      params.append("unickname", this.unickname);
      params.append("opage", this.page);
      axios.post("/SkdevsecOrderuser/user_paid_output", params).then(response => {
                this.boardlength(response.data[0].order_count);
                response.data.shift()
                this.orderdata = response.data;
      });
    },
    order_date_btn(code){
      this.code = code;
      this.search_state = false;
      this.search_date = true;
      var params = new URLSearchParams();
      params.append("unickname", this.unickname);
      params.append("opage", this.page);
      params.append("ocode", this.code);
      axios.post("/SkdevsecOrderuser/user_paid_date_code", params).then(response => {
                this.boardlength(response.data[0].order_count);
                response.data.shift()
                this.orderdata = response.data;
      });
    },
    boardlength(num){
          var num1 = parseInt(num) / 10;
          var num2 = parseInt(num) % 10;
          if(num2 > 0){
              this.len = num1 + 1;
          }
          else{
              this.len = num1;
          }
    },
  },
  mounted(){
    this.unickname = this.$store.getters.get_nickname;
    this.order_list();
  },
  watch:{
    page:function(){
      if(this.search_state == false){
        this.order_list();
      }
      if(this.search_state == true){
        this.historyorder();
      }
      if(this.search_date == true){
        this.order_date_btn(this.code);
      }
    }
  },
}
</script>