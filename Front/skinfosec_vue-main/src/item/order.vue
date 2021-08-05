<template>
<v-container>
  <h1 class="text-center ma-5">상품 주문</h1>
  <v-row justify="center">
    <v-col
      cols="12"
      md="8"
    >
    <v-card-title class="text-center">
      상품 주문 내역
    </v-card-title>
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
            v-for="item in p_item"
            :key="item.pname"
          >
            <td
              @click="itemclick(item)"
            >
              <v-row align="center" justify="center">
                <v-col>
                {{item.pname}}
                </v-col>
              </v-row>
            </td>
            <td class="text-center">{{ item.pprice }}</td>
            <td class="text-center">{{ ocount }}</td>
            <td class="text-center">{{ p_item[0].pprice * ocount }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card ref="form" flat class="ma-2">
        <v-card-title>배송 정보</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="uname"
            label="이름"
            required
            placeholder="이름"
            outlined
            :rules="[
                v => !!v || '성명을 입력해주세요.',
                v => !!v && v.length >= 1 || '이름은 1자리가 넘어야합니다.',
                v => !!v && v.length <= 10 || '이름은 10자리가 넘을 수 없습니다.',
                v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.',
                v => !/[0-9]/.test(v) || '이름에는 숫자를 사용할 수 없습니다.',
            ]"
          ></v-text-field>
          <v-text-field
            v-model="address"
            label="주소"
            required
            placeholder="주소"
            outlined
            :rules="[
                v => !!v || '주소를 입력해주세요.',
                v => !!v && v.length >= 10 || '주소는 10자리가 넘어야합니다.',
                v => !!v && v.length <= 100 || '주소는 100자리가 넘을 수 없습니다.',
                v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '주소에는 특수문자를 사용할 수 없습니다.',
                ]"
          ></v-text-field> 
          <v-row>
            <v-col cols='8'>
              <v-text-field
                v-model="phone"
                label="핸드폰번호"
                required
                placeholder="핸드폰번호"
                outlined
                :rules="[
                  v => !!v || '핸드폰번호를 입력해주세요.',
                  v => !!v && v.length >= 10 || '핸드폰번호은는 10자리가 넘어야합니다.',
                  v => !!v && v.length <= 12 || '핸드폰번호는 12자리가 넘을 수 없습니다.',
                  v => /^[0-9]*$/.test(v) || '핸드폰 번호는 숫자만 입력 가능합니다.',
                ]"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn
                v-if="isRunning"
                @click="timeReset()"
                height="55"
                color="#7A96A2"
                dark
              >재전송</v-btn>
              <v-btn
                v-else
                @click="phone_check()"
                height="55"
                color="#7A96A2"
                dark
              >핸드폰 인증</v-btn>
            </v-col>
            <span
              v-if="isRunning"
              class="body-1 mt-4"
            >
              {{resTimeData}}
            </span>
          </v-row>

          <v-row>
            <v-col cols='8'>
              <v-text-field
                v-model="phonecode"
                label="핸드폰 인증번호"
                required
                placeholder="핸드폰 인증번호"
                outlined
                :rules="[
                  v => !!v || '인증번호를 입력해주세요.',
                  v => !!v && v.length <= 10 || '인증번호는 20자리 이하입니다.',
                  v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '인증번호에는 특수문자를 사용할 수 없습니다.'
                ]"
              >
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn 
                @click="code_check()"
                height="55"
                color="#7A96A2"
                dark
              >인증번호 확인</v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-title class="text-center">
          결제 예정 금액
        </v-card-title>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="3">
            상품 총 금액 {{ p_item[0].pprice * ocount}}원
          </v-col>
          <v-col cols="12" sm="1">
            <v-icon x-large>mdi-plus</v-icon>
          </v-col>
          <v-col cols="12" sm="3">
            배송비 {{price_re}}원
          </v-col>
          <v-col cols="12" sm="1">
            <v-icon x-large>mdi-equal</v-icon>
          </v-col>
          <v-col cols="12" sm="3">
            합계  {{oprice}}원
          </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>
        <v-card-actions>
          <v-btn
            @click="reset"
            color="grey"
            height="50"
            text
            outlined
            large
            >
            취소
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="#F29F8F"
            height="50"
            width="200"
            @click="form_check()"
            large
          >
            결제하기
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Order',
  data: () => ({
    p_item:[],
    uname:'',
    ocount:0,
    valid:true,
    phone: '',
    address:'',
    phonecode: '',
    answer_code:'',
    oprice:0,
    delivery_price:0,
    phone_ck:false,
    timeCounter: 120, // 2분
    resTimeData: '',
    isRunning: false,
  }),
  mounted(){
    this.itemData();
    this.ocount = Number(this.$route.params.pcount);
  },
  computed: {
    price_re: function(){
      if(this.p_item[0].pprice * this.ocount >= 50000){
        this.set_oprice(this.p_item[0].pprice * this.ocount)
        return 0;
      }
      else{
        this.set_oprice((this.p_item[0].pprice * this.ocount) + 2500)
        return 2500;
      }
    }
  },
  methods: {
    set_oprice(num){
      this.oprice = num;
    },
    itemData(){
      var params = new URLSearchParams();
      params.append('pid', this.$route.params.pid);
      axios.post('/SkdevsecProduct/product_inside', params).then(response => {
        this.p_item = response.data;
      });
    },
    form_check(){
      if(this.$refs.form.validate()){
        if(this.phone_ck == true){
          this.item_send();
        }
        else{
          alert('휴대폰 인증을 해주세요.');
        }
      }
    },
    item_send(){
      var product = [
        {
        'pid' : this.$route.params.pid,
        'pcount' : this.$route.params.pcount
        } 
      ];
      axios.post('SkdevsecOrderuser/temp_pay_info', product).then(response => {
        if(response.data == 1){
          this.submit();
        }
        else{
          alert('실패');
        }
      });
    },
    submit(){
      var d = new Date();
      var yy = d.getFullYear();
      var mm = d.getMonth() + 1;
      if(mm < 10){
          mm = "0" + String(mm);
      }
      var dd = d.getDate();
      if(dd < 10){
        dd = "0" + String(dd);
      }
      var hours = d.getHours(); // 시
      if(hours < 10){
        hours = "0" + String(hours);
      }
      var minutes = d.getMinutes(); //분
      if(minutes < 10){
        minutes = "0" + String(minutes);
      }
      var udate = String(yy) + "-" + mm + "-" + dd + " " + hours + ":" + minutes;
      let form = new FormData();
      form.append('unickname', this.$store.getters.get_nickname);
      form.append('oname', this.uname);
      form.append('ophone', this.phone);
      form.append('oaddress', this.address);
      form.append('oprice', String(this.oprice));
      form.append('order_date', udate);
      form.append('bagcode', '0');
      axios.post("SkdevsecOrderuser/kakaopay", form).then(res =>{
                let payUrl = res.data.next_redirect_pc_url;
                location.href = payUrl;
            }).catch(e =>{
                alert("에러가 발생했습니다. 다시 시도해주세요");
            })
    },
    reset(){
      this.$refs.form.reset()
      location.href="/item/cart"
    },
    phone_check(){
      var params = new URLSearchParams();
      params.append('ophone', this.phone);
      axios.post('/SkdevsecOrderuser/send_sms', params).then(response => {
        if(response.data == 0){
          alert('실패')
        }
        else{
          alert('인증번호가 전송되었습니다.');
          this.answer_code = response.data;
          this.start();
        }
      });
    },
    code_check() {
      if(this.phonecode == this.answer_code){
        alert('휴대폰 인증 성공');
        this.phone_ck = true;
        this.isRunning = false;
        this.timeStop();
      }
      else{
        alert('인증번호가 틀렸습니다. 인증 실패');
        this.phone_ck = false;
      }
    },
    itemclick(item) {
      this.$router.push('/item/detail/' + item.pid)
    },
    start() {
      this.isRunning = true;
      this.polling = setInterval( () =>{ 
        this.timeCounter--;
        this.resTimeData = this.prettyTime()
        if (this.timeCounter <= 0) {
          if (this.email_ck == false) {
            alert('인증번호 유효시간이 지났습니다. 재전송 버튼을 눌러주세요.')
            this.emailcode_answer='';
            this.email_ck = false;
          }
          clearInterval(this.polling) 
        }
      },1000) 
    },
    prettyTime() { 
      let time = this.timeCounter / 60 
      let minutes = parseInt(time) 
      let secondes = Math.round((time - minutes) * 60) 
      return this.pad(minutes, 2) + ":" + this.pad(secondes, 2) 
    },
    pad(n, width) { 
      n = n + ''; 
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n 
    }, 
    timeStop() { 
      clearInterval(this.polling) 
    },
    timeReset() { 
      clearInterval(this.polling) 
      this.timeCounter = 120;
      this.phone_check();
    },
  },
  beforeDestroy() { 
    clearInterval(this.polling) 
  },
};
</script>
