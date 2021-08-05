<template>
  <v-container>
    <h1 class="text-center ma-5">주문 관리</h1>
    <v-simple-table
      class="ma-5"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">주문일자</th>
            <th class="text-center">아이디</th>
            <th class="text-center">주문자</th>
            <th class="text-center">주문금액</th>
            <th class="text-center">주문처리상태</th>
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
            <td>
              {{item.uid}}
            </td>
            <td class="text-center">{{ item.oname }}</td>
            <td class="text-center">{{ item.oprice }}</td>
            <td class="text-center">결제완료</td>
          </tr>
          </tbody>
      </template>
    </v-simple-table>

    <v-row
      justify="center"
      class="my-5 mx-auto"
    >
      <v-col cols="12" sm="3">
        <v-select
          v-model="select"
          :items="searchcate"
          item-text="name"
          item-value="id"
          outlined
          dense
          label="SEARCH"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="7">
        <v-text-field
          v-model="search"
          outlined
          dense
          @keyup.enter="searc_order()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          width="100"
          height="40"
          outlined
          dense
          @click="searc_order()"
        >
          검색
        </v-btn>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="len"
        circle
        color="#F29F8F"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderAdmin",
  data: () => ({
    search_state:false,
    search: '',
    page: 1,
    len: 0,
    select:0,
    orderdata:[],
    searchcate: [
      { name: '전체', id: 0 },
      { name: '아이디', id: 1 },
      { name: '주문자', id: 2 },
    ]
  }),
  mounted(){
    this.order_List();
  },
  methods: {
    itemclick(item) {
      this.$router.push('/item/orderdetail/' + item.oid)
    },
    searchOrder() {
      alert(this.select + this.search)
    },
    order_List: function(){
      this.search_state = false;
      this.search = '';
      var params = new URLSearchParams();
      params.append('opage', this.page);
      axios.post("/SkdevsecOrderuser/admin_paid_output", params).then(response => {
                this.boardlength(response.data[0].order_count);
                response.data.shift();
                this.orderdata = response.data;
      });
    },
    searc_order(){
      if(this.regExp_text(this.search)){
        if(this.search.length > 40){
          alert('검색단어는 20자 아래로 입력해주세요.');
        }
        else{
          this.search_state = true;
          var params = new URLSearchParams();
          params.append("ocode", this.select);
          params.append('osearch', this.search);
          params.append('opage', this.page);
          axios.post('/SkdevsecOrderuser/admin_paid_search', params).then(response => {
            if(response.data == 0){
              alert('검색 결과가 없습니다.');
            }
            else{
              this.boardlength(response.data[response.data.length-1].order_count);
              response.data.pop();
              this.orderdata = response.data;
            }
          });
        }
      }else{
        alert('특수문자는 검색할 수 없습니다.');
      }
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
    regExp_text(data){
      var regExp1 = /[\{\}\[\]\/?.,;:|\)*~`!@^\-+<>\#$%&\\\=\(\'\"]/gi;
      if(regExp1.test(data)){
        return false;
      }else{
        return true;
      }
    },
  },
  watch:{
    page:function(){
      if(this.search_state == false){
        this.order_List();
      }
      else if(this.search_state == true){
        this.searc_order();
      }
    }
  },
}
</script>