<template>
  <v-container>
    <h1 class="text-center">{{mydata.unickname}}님 회원 정보 수정</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
      <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-card ref="form" flat>
          <v-card-text>
            <v-text-field
              v-model="uname"
              label="이름"
              outlined
              disabled
            ></v-text-field>
            <v-text-field
              v-model="uid"
              label="아이디"
              outlined
              disabled
            ></v-text-field>
            <v-row>
              <v-col cols='8'>
                <v-text-field
                  v-model="uemail"
                  label="이메일"
                  required
                  placeholder="이메일"
                  outlined
                  :rules="[
                    v => !!v || '이메일을 입력해주세요.',
                    v => !!(v || '').match(/@/) || '이메일 형식에 맞게 작성해주세요.',
                    v => !!v && v.length <= 50 || '이메일은 50자까지 입력할 수 있습니다.',
                    v => !/[^\w@._]/.test(v) || '이메일에는 @ _ . 을 제외한 특수문자를 사용할 수 없습니다.'
                  ]"
                >
                </v-text-field>
              </v-col>
              <v-col cols='4'>
                <v-btn
                 v-if="isRunning"
                  @click="timeReset()"
                  height="55"
                  color="#7A96A2"
                  dark
                >재전송</v-btn>
                <v-btn
                  v-else
                  @click="email_check()"
                  height="55"
                  color="#7A96A2"
                  dark
                >이메일 인증</v-btn>
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
                v-model="uemailcode"
                label="이메일 인증번호"
                required
                placeholder="이메일 인증번호"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols='4'>
              <v-btn 
                @click="code_check()"
                height="55"
                color="#7A96A2"
                dark
              >인증번호 확인</v-btn>
            </v-col>
          </v-row>

            <v-row>
              <v-col cols='8'>
                <v-text-field
                  v-model="unickname"
                  label="닉네임"
                  required
                  placeholder="닉네임"
                  outlined
                  :rules="[
                    v => !!v || '닉네임을 입력해주세요.',
                    v => !!v && v.length >= 1 || '닉네임은 1자리가 넘어야합니다.',
                    v => !!v && v.length <= 10 || '닉네임은 10자리가 넘을 수 없습니다.',
                    v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '닉네임에는 특수문자를 사용할 수 없습니다.',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn 
                  @click="nickname_check()"
                  height="55"
                  color="#7A96A2"
                  dark
                >닉네임 중복검사</v-btn>
              </v-col>
            </v-row>
            <v-text-field
              v-model="uphone"
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
          </v-card-text>
          <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="primary"
                text
                outlined
                to="/user/mypage"
              >
                취소
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                outlined
                @click="submit()"
              >
                정보 수정
              </v-btn>
            </v-card-actions>
        </v-card>
        </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Modify',
  data: () => ({
    valid:true,
    mydata:[],
    uname: '',
    uid:'',
    unickname: '',
    uemail: '',
    uphone: '',
    uemailcode:'',
    email_state:true,
    nickname_state:true,
    emailcode_anser:'',
    timeCounter: 120, // 2분
    resTimeData: '',
    isRunning: false,
  }),
  mounted(){
    this.mydatas()
  },
  methods:{
    submit(){
      if(this.$refs.form.validate()){
        if(this.email_state == true){
          if(this.nickname_state == true){
            this.update_myinfo();
          }
          else{
            alert('닉네임 중복확인을 해주세요.');
          }
        }
        else{
          alert('이메일 인증을 해주세요.');
        }
      }
    },
    mydatas:function(){
      var params = new URLSearchParams();
      params.append("unickname", this.$store.getters.get_nickname);
      axios.post('/SkdevsecUser/view_info', params).then(response =>{
        this.mydata = response.data;
        this.unickname = this.mydata.unickname;
        this.uemail = this.mydata.umail;
        this.uphone = this.mydata.uphone;
        this.uname = this.mydata.uname;
        this.uid = this.mydata.uid;
      });
    },
    update_myinfo:function(){
      var params = new URLSearchParams();
      params.append("unickname", this.unickname);
      params.append("umail", this.uemail);
      params.append("uphone", this.uphone);
      params.append("uid", this.uid);
      axios.post('/SkdevsecUser/change_info', params).then(response =>{
        if(response.data == 1){
          alert('회원 정보 수정 완료');
          this.$cookie.delete('memberNick');
          var rand_1_999 = Math.floor(Math.random() * 999) + 1;
          this.$store.commit('set_nickname', this.unickname);
          this.$store.commit('set_level', rand_1_999);
          this.$cookie.set("memberNick", 3, '3h');
          this.$router.push('/user/mypage');
        }
        else{
          alert('회원 정보 수정 실패');
        }
      });
    },
    email_check: function(){
      var params = new URLSearchParams();
      params.append('umail', this.uemail);
      axios.post('/SkdevsecUser/email_check', params).then(response => {
        if(response.data == 1){
          alert('사용 중인 이메일입니다.');
          this.email_state = false;
        }
        else{
          alert('인증번호가 전송되었습니다.');
          this.emailcode_anser = response.data;
          this.start();
        }
      })
    },
    code_check: function(){
      if(this.uemailcode == this.emailcode_anser){
        alert('이메일 인증 완료')
        this.email_state = true;
        this.isRunning = false;
        this.timeStop();
      }
      else{
        alert('인증번호가 올바르지 않습니다.')
        this.email_state = false;
      }
    },
    nickname_check: function(){
        var params = new URLSearchParams();
        params.append('unickname', this.unickname)
        axios.post("/SkdevsecUser/nickname_check", params).then(response => {
            if(response.data == 0){
                this.nickname_state = true;
                alert('사용가능한 닉네임입니다.')
              }
              else{
                this.nickname_state = false;
                alert('이미 사용중인 닉네임입니다.')
              }
        });
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
      this.email_check();
    },
  },
  watch:{
    uemail: function(){
      if(this.uemail == this.mydata.umail){
        this.email_state = true;
      }
      else{
        this.email_state = false;
      }
    },
    unickname: function(){
      if(this.unickname == this.mydata.unickname){
        this.nickname_state = true;
      }
      else{
        this.nickname_state = false;
      }
    },
    uphone: function(){
      if(this.uphone == this.mydata.uphone){
        this.phone_state = true;
      }
      else{
        this.phone_state = false;
      }
    },
  },
  beforeDestroy() { 
    clearInterval(this.polling) 
  },
};
</script>