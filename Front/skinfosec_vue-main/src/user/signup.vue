<template>
  <v-container>
    <h1 class="text-center ma-5">회원가입</h1>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        sm="8"
      >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card ref="form" flat class="ma-2">
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
            <v-row>
              <v-col cols='8'>
                <v-text-field
                  v-model="uid"
                  label="아이디"
                  required
                  placeholder="아이디"
                  outlined
                  counter="16"
                  :rules="[
                  v => !!v || 'ID를 입력해주세요.',
                  v => !!v && v.length >= 5 || '아이디는 5자리가 넘어야합니다.',
                  v => !!v && v.length <= 16 || '아이디는 16자리가 넘을 수 없습니다.',
                  v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn 
                  @click="id_check()"
                  height="55"
                  color="#7A96A2"
                  dark
                >아이디 중복검사</v-btn>
              </v-col>
            </v-row>
            <v-text-field
              v-model="upwd"
              label="패스워드"
              required
              placeholder="패스워드"
              outlined
              type="password"
              counter="18"
              :rules="[
                v => !!v || '비밀번호를 입력해주세요.',
                v => !!v && v.length >= 6 || '비밀번호는 6자리가 넘어야합니다.',
                v => !!v && v.length <= 18 || '비밀번호는 18자리 이하여야합니다.',
                v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.',
                v => /[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함시켜야합니다.',
                v => !/(\w)\1\1/.test(v) || '같은 문자 3개 이상입니다.',
                v => password_check(v) || '연속 문자 3개 이상입니다.',
              ]"
            ></v-text-field>
            <v-text-field
              v-model="upwdck"
              label="패스워드 확인"
              required
              placeholder="패스워드 확인"
              outlined
              type="password"
              counter="18"
              :rules="[
                v => v == upwd || '비밀번호가 일치하지 않습니다.',
                v => !!v || '비밀번호를 입력해주세요.',
                v => !!v && v.length >= 6 || '비밀번호는 6자리가 넘어야합니다.',
                v => !!v && v.length <= 18 || '비밀번호는 18자리 이하여야합니다.',
                v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.',
                v => /[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함시켜야합니다.',
                v => !/(\w)\1\1/.test(v) || '같은 문자 3개 이상입니다.',
                v => password_check(v) || '연속 문자 3개 이상입니다.',
              ]"
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
                  v => !/[^\w@._]/.test(v) || '이메일에는 @ _ .을 제외한 특수문자를 사용할 수 없습니다.'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols='3'>
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
                  :rules="[
                    v => !!v || '인증번호를 입력해주세요.',
                    v => !!v && v.length <= 10 || '인증번호는 10자리가 넘을 수 없습니다.',
                    v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '인증번호에는 특수문자를 사용할 수 없습니다.'
                  ]"
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
                  v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '닉네임은 특수문자를 사용할 수 없습니다.'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
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
          <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || '체크 해주세요.']"
              label="회원가입을 동의하십니까?"
              required
              ></v-checkbox>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              @click="reset"
              color="primary"
              text
              outlined
              large
              >
              초기화
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              outlined
              @click="submit()"
              large
            >
              회원가입
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
  name: 'Login',
  data: () => ({
    valid:true,
    checkbox: null,
    uname: '',
    uid:'',
    upwd: '',
    upwdck: '',
    unickname: '',
    uemail: '',
    uphone: '',
    uemailcode: '',
    emailcode_anwser:'',
    id_ck : false,
    nick_ck: false,
    email_ck:false,
    timeCounter: 120, // 2분
    resTimeData: '',
    isRunning: false,
    conf_id: '',
    conf_nickname:'',
    conf_email:'',
  }),
  methods: {
    submit () {
      if(this.$refs.form.validate()){
        if(this.id_ck == true & this.nick_ck == true & this.upwd == this.upwdck){
          if(this.email_ck == true){
            if(this.conf_id == this.uid & this.conf_nickname == this.unickname & this.conf_email == this.uemail){
              this.userAdd();
            }else{
              alert('중복확인 후 변경된 데이터가 있습니다.');
            }
          }
          else{
            alert('이메일 인증을 해주세요.')
          }
        }
        else{
          alert('아이디, 닉네임, 패스워드 확인을 해주세요.')
        } 
      }
      else{
          alert("회원가입 양식을 제대로 입력 해주세요.")
      }
    },
    reset(){
      this.$refs.form.reset()
    },
    code_check: function(){
      if(this.uemailcode == this.emailcode_answer){
        alert('이메일 인증 완료')
        this.email_ck = true;
        this.isRunning = false;
        this.conf_email = this.uemail;
        this.timeStop();
      }
      else{
        alert('인증번호가 올바르지 않습니다.')
        this.email_ck = false;
      }
    },
    userAdd(){
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
      var params = new URLSearchParams();
      params.append("uname", this.uname);
      params.append("uid", this.uid);
      params.append("unickname", this.unickname);
      params.append("umail", this.uemail);
      params.append("uphone", this.uphone);
      params.append("upwd", this.upwd);
      params.append("ucreate_date", udate);
      params.append("authority", 0);
      axios.post("/SkdevsecUser/create_user", params).then(response => {
          var result = response.data;
          if(result == 1){
              alert("회원 가입이 완료되었습니다.");
              location.href = "/";
          }
          else{
              alert("회원가입 실패");
          }
      });
    },
    email_check: function(){
      if(this.uemail == ''){
        alert('이메일을 입력해주세요.');
      }
      else{
        var regExp_email = /[\{\}\[\]\/?,;:|\)*~`!^\-+<>\#$%&\\\=\(\'\"]/gi;
        if(regExp_email.test(this.uemail)){
          alert('@와 _를 제외한 특수문자가 포함되어 있습니다.');
        }else{
          //특수문자 존재하지 않음
          var params = new URLSearchParams();
          params.append('umail', this.uemail);
          axios.post('/SkdevsecUser/email_check', params).then(response => {
            if(response.data == 1){
              alert('사용 중인 이메일입니다.');
            }
            else{
              alert('인증번호가 전송되었습니다.');
              this.emailcode_answer = response.data;
              this.start();
            }
          });
        }
      }
    },
    id_check: function(){
      if(this.uid == ''){
        alert('아이디를 입력해주세요.');
      }
      else{
        if(this.regExp_text(this.uid)){
          var params = new URLSearchParams();
          params.append('uid', this.uid);
          axios.post("/SkdevsecUser/id_check", params).then(response => {
              if(response.data == 0){
                this.id_ck = true;
                this.conf_id = this.uid;
                alert('사용가능한 아이디입니다.')
              }
              else{
                this.id_ck = false;
                this.conf_id = '';
                alert('이미 사용중인 아이디입니다.')
              }
          });
        }else{
          alert('특수문자가 포함되어 있습니다.');
        }
      }
    },
    nickname_check: function(){
      if(this.unickname == ''){
        alert('닉네임을 입력해주세요.');
      }
      else{
        if(this.regExp_text(this.uid)){
          var params = new URLSearchParams();
          params.append('unickname', this.unickname)
          axios.post("/SkdevsecUser/nickname_check", params).then(response => {
              if(response.data == 0){
                  this.nick_ck = true;
                  this.conf_nickname = this.unickname;
                  alert('사용가능한 닉네임입니다.')
                }
                else{
                  this.nick_ck = false;
                  this.conf_nickname = '';
                  alert('이미 사용중인 닉네임입니다.')
                }
          });
        }else{
          alert('특수문자가 포함되어 있습니다.');
        }
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
    password_check(data){
      var cnt = 0;
          var cnt2 = 0;
          var tmp = "";
          var tmp2 = "";
          var tmp3 = "";
          for (var i = 0; i < data.length; i++) {
             tmp = data.charAt(i);
             tmp2 = data.charAt(i + 1);
             tmp3 = data.charAt(i + 2);
 
             if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) == 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == 1) {
               cnt = cnt + 1;
             }
             if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) == -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == -1) {
                cnt2 = cnt2 + 1;
             }
          }
          if (cnt > 0 || cnt2 > 0) {
        return false
          }
      return true
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
  beforeDestroy() { 
    clearInterval(this.polling) 
  }
};
</script>