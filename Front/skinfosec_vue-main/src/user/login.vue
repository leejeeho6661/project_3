<template>
<v-container>
  <h1 class="text-center ma-5">로그인</h1>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card flat>
        <v-card-text>
          <v-text-field
            v-model="userid"
            @keyup.enter="submit()"
            label="아이디"
            required
            outlined
            counter="16"
            :rules="[
              v => !!v || 'ID를 입력해주세요.',
              v => !!v && v.length >= 5 || '아이디는 4자리가 넘어야합니다.',
              v => !!v && v.length <= 16 || '아이디는 16자리가 넘을 수 없습니다.',
              v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.'
              ]"
          ></v-text-field>
          <v-text-field
            v-model="userpwd"
            @keyup.enter="submit()"
            label="패스워드"
            type="password"
            required
            outlined
            counter="18"
            :rules="[
              v => !!v || '패스워드를 입력해주세요.',
              v => !!v && v.length >= 5 || '패스워드는 4자리가 넘어야합니다.',
              v => !!v && v.length <= 18 || '패스워드는 18자리 이하여야합니다.'
            ]"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="open_id_dialog"
            >
              아이디찾기
            </v-btn>
            <v-divider vertical class="ma-2"></v-divider>
            <v-btn
              text
              @click="open_pwd_dialog"
            >
              비밀번호찾기
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="$router.push('/user/signup')"
          >
            회원가입
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="submit()"
          >
            로그인
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-col>
  </v-row>

  <!-- 아이디 찾기 Dialog -->
  <v-dialog
    v-model="id_dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-toolbar
        color="#253F58"
        dark
      >
        아이디 찾기
        <v-spacer></v-spacer>
        <v-btn icon @click="id_close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
        ref="form_find_id"
        v-model="valid_id"
        lazy-validation
      >
      <v-card-text class="mt-5">
        <v-text-field
          v-model="find_name"
          label="이름"
          outlined
          :rules="[
              v => !!v || '성명을 입력해주세요.',
              v => !!v && v.length >= 1 || '이름은 1자리가 넘어야합니다.',
              v => !!v && v.length <= 10 || '이름은 10자리가 넘을 수 없습니다.',
              v => !/[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.',
              v => !/[0-9]/.test(v) || '이름에는 숫자를 사용할 수 없습니다.',
          ]"
        ></v-text-field>
        <v-row >
          <v-col cols="8" class="pb-0">
            <v-text-field
            v-model="find_email"
              label="이메일"
              outlined
              hint="가입시 입력했던 이메일 주소를 입력해주세요."
              :rules="[
                  v => !!v || '이메일을 입력해주세요.',
                  v => !!(v || '').match(/@/) || '이메일 형식에 맞게 작성해주세요.',
                  v => !!v && v.length <= 50 || '이메일은 50자리 이하여야합니다.',
                  v => !/[~!#$%^&*()+|<>?:{}=,/`;-]/.test(v) || '이메일에는 _ @ . 을 제외한 특수문자를 사용할 수 없습니다.'
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="pb-0">
            <v-btn
              v-if="isRunning"
              @click="timeReset(1)"
              height="55"
              color="#7A96A2"
              dark
            >재전송</v-btn>
            <v-btn
              v-else
              height="55"
              color="#7A96A2"
              dark
              @click="id_find_email()"
            >
              이메일 인증
            </v-btn>
          </v-col>
          <span
            v-if="isRunning"
            class="body-1 mt-4"
          >
            {{resTimeData}}
          </span>
        </v-row>
        <v-row>
          <v-col cols="12" sm="7" class="pb-0">
            <v-text-field
              v-model="input_code"
              label="인증번호"
              outlined
              hint="이메일주소로 인증번호가 전송되었습니다."
            ></v-text-field>
          </v-col>
          <v-col class="pb-0">
            <v-btn
              height="55"
              color="#7A96A2"
              dark
              @click="code_check()"
            >
              인증번호 확인
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="id_close()"
          color="grey darken-2"
          text
          outlined
          large
          >
          취소
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="id_code_state"
          @click="find_id_fn()"
          dark
          color="#F29F8F"
          large
        >
          아이디 확인하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="id_dialog2"
    width="500"
    persistent
  >
    <v-card
      flat 
      v-if="id_code_state"
      height="250"
    >
      <v-toolbar
        color="#253F58"
        dark
      >
        아이디 찾기
        <v-spacer></v-spacer>
        <v-btn icon @click="id_dialog2 = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="text-center">
        이것이 너의 아이디다 : {{id}}
      </v-card-title>
    </v-card>
  </v-dialog>

  <!-- 비밀번호 찾기 Dialog -->
  <v-dialog
    v-model="pwd_dialog"
    max-width="500"
    persistent
  >
    <v-card>
      <v-toolbar
        color="#253F58"
        dark
      >비밀번호 찾기</v-toolbar>
      <v-form
        ref="form_find_pw"
        v-model="valid_pw"
        lazy-validation
      >
      <v-card-text class="mt-5">
        <v-text-field
          v-model="find_name"
          label="이름"
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
          <v-col cols="12" sm="7" class="pb-0">
            <v-text-field
              v-model="find_id"
              label="아이디"
              outlined
              :rules="[
                  v => !!v || 'ID를 입력해주세요.',
                  v => !!v && v.length >= 5 || '아이디는 5자리가 넘어야합니다.',
                  v => !!v && v.length <= 16 || '아이디는 16자리가 넘을 수 없습니다.',
                  v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.'
              ]"
            ></v-text-field>
          </v-col>
          <v-col class="pb-0">
            <v-btn
              v-if="isRunning"
              @click="timeReset(2)"
              height="55"
              color="#7A96A2"
              dark
            >재전송</v-btn>
            <v-btn
              v-else
              height="55"
              color="#7A96A2"
              dark
              @click="find_pw_phone()"
            >
              핸드폰 인증
            </v-btn>
          </v-col>
          <span
            v-if="isRunning"
            class="body-1 mt-4"
          >
            {{resTimeData}}
          </span>
        </v-row>
        <v-row>
          <v-col cols="12" sm="7" class="pb-0">
            <v-text-field
              v-model="phone_input_code"
              label="인증번호"
              outlined
              hint="가입시 입력했던 핸드폰번호로 인증번호가 전송되었습니다."
            ></v-text-field>
          </v-col>
          <v-col class="pb-0">
            <v-btn
              height="55"
              color="#7A96A2"
              dark
              @click="find_pw_code_check()"
            >
              인증번호 확인
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="pw_close()"
          color="grey darken-2"
          text
          outlined
          large
          >
          취소
        </v-btn>
      </v-card-actions>

    </v-card>
    <v-card flat v-if="pw_code_state">
      <v-form
        ref="form2"
        v-model="valid2"
        lazy-validation
      >
      <v-divider class="ma-2"></v-divider>
      <v-card-title>비밀번호 재설정</v-card-title>
      <v-card-text>
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
            v => /[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함시켜야합니다.',
            v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.',
            v => !/(\w)\1\1/.test(v) || '같은 문자 3개 이상입니다.',
            v => passwordCheck(v) || '연속 문자 3개 이상입니다.',
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
            v => !!v || '비밀번호를 입력해주세요.',
            v => !!v && v.length >= 6 || '비밀번호는 6자리가 넘어야합니다.',
            v => !!v && v.length <= 18 || '비밀번호는 18자리 이하여야합니다.',
            v => /[~!@#$%^&*()_+|<>?:{}=.,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함시켜야합니다.',
            v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함시켜야 합니다.',
            v => !/(\w)\1\1/.test(v) || '같은 문자 3개 이상입니다.',
            v => passwordCheck(v) || '연속 문자 3개 이상입니다.',
          ]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="pw_close()"
          color="grey darken-2"
          text
          outlined
          large
          >
          취소
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="find_success_pw_change()"
          dark
          color="#F29F8F"
          large
        >
          완료
        </v-btn>
      </v-card-actions>
    </v-form>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data: () => ({
      valid: true,
      valid2:true,
      valid_id:true,
      valid_pw:true,
      find_name:'',
      find_email:'',
      find_id:'',
      input_code:'',
      answer_code:'',
      id:'',
      id_code_state:false,
      userid: '',
      userpwd: '',
      id_dialog: false,
      id_dialog2: false,
      pwd_dialog: false,
      upwd: '',
      upwdck:'',
      phone_answer_code:'',
      phone_input_code:'',
      pw_code_state:false,
      timeCounter: 120, // 2분
      resTimeData: '',
      isRunning: false,
    }),
    methods:{
      pw_close(){
        this.pwd_dialog = false;
        this.find_name = '';
        this.find_id = '';
        this.upwd = '';
        this.upwdck = '';
        this.phone_answer_code = '';
        this.phone_input_code = '';
        this.resTimeData = '',
        this.pw_code_state = false;
        this.isRunning = false,
        clearInterval(this.polling)
      },
      id_close(){
        this.id_dialog = false;
        this.find_name = '';
        this.find_email = '';
        this.input_code = '';
        this.answer_code = '';
        this.id = '';
        this.resTimeData = '',
        this.id_code_state = false;
        this.isRunning = false,
        clearInterval(this.polling)
      },
      submit(){
        if(this.$refs.form.validate()){
          this.login();
        }
        else{
          alert("아이디 및 패스워드를 올바르게 입력해주세요.")
        }
      },
      find_success_pw_change(){
        if(this.$refs.form2.validate()){
          var params = new URLSearchParams();
          params.append("uid", this.find_id);
          params.append("upwd", this.upwd);
          axios.post('/SkdevsecUser/find_pwd', params).then(response => {
            if(response.data == 0){
              alert('변경 실패');
            }
            else if(response.data == 1){
              alert('변경 성공');
              this.pw_close();
            }
          });
        }
      },
      find_pw_code_check(){
        if(this.phone_input_code != ''){
          if(this.regExp_text(this.phone_input_code)){
            if(this.phone_answer_code == this.phone_input_code){
              alert('인증 성공');
              this.pw_code_state = true;
            }
            else{
              alert('인증 실패');
              this.pw_code_state = false;
            }
          }else{
            alert('특수문자는 입력할 수 없습니다.');
          }
        }else{
          alert('인증번호를 입력해주세요.');
        }
      },
      find_pw_phone(){
        if(this.$refs.form_find_pw.validate()){
          if(this.find_id == '' || this.find_name == ''){
            alert('이름과 아이디를 모두 입력해주세요.');
          }else{
            if(this.regExp_text(this.find_id) & this.regExp_text(this.find_name)){
              var params = new URLSearchParams();
              params.append("uid", this.find_id);
              params.append("uname", this.find_name);
              axios.post('/SkdevsecUser/find_pwd_sms', params).then(response => {
                if(response.data == 0){
                  alert('해당 정보는 존재하지 않습니다.');
                }
                else{
                  alert('가입 휴대폰으로 인증번호가 전송되었습니다.');
                  this.phone_answer_code = response.data;
                  this.start();
                }
              });
            }else{
              alert('특수문자를 입력할 수 없습니다.');
            }
          }
        }
      },
      code_check(){
        if(this.input_code != ''){
          if(this.regExp_text(this.input_code)){
            if(this.answer_code == this.input_code){
              alert('인증 성공');
              this.id_code_state = true;
              this.timeStop();
            }
            else{
              alert('인증번호가 틀렸습니다.');
              this.id_code_state = false;
            }
          }else{
            alert('특수문자는 입력할 수 없습니다.');
          }
        }else{
          alert('인증번호를 입력해주세요.');
        }
      },
      find_id_fn(){
        this.id_dialog2=true;
        var params = new URLSearchParams();
        params.append("uname", this.find_name);
        params.append("umail", this.find_email);
        axios.post('/SkdevsecUser/find_id', params).then(response => {
          if(response.data == 0){
            alert('해당 정보는 존재하지 않습니다.');
          }
          else{
            this.id = response.data;
          }
        });
      },
      id_find_email(){
        if(this.$refs.form_find_id.validate()){
          if(this.find_name == '' || this.find_email == ''){
            alert('이름과 이메일 모두 입력해주세요.');
          }else{
            if(this.regExp_text(this.find_name) & this.regExp_text(this.find_email)){
              var params = new URLSearchParams();
              params.append("uname", this.find_name);
              params.append("umail", this.find_email);
              axios.post('/SkdevsecUser/find_id_email', params).then(response => {
                if(response.data == 0){
                  alert('해당 정보는 존재하지 않습니다.');
                }
                else{
                  alert('인증번호가 전송되었습니다.');
                  this.answer_code = response.data;
                  this.start();
                }
              });
            }else{
              alert('특수문자는 입력할 수 없습니다.');
            }
          }
        }
      },
      encrypt_data:function (input, password) {
            var crypto = require('crypto');
            var m = crypto.createHash('md5');
            m.update(password)
            var key = m.digest('hex');

            m = crypto.createHash('md5');
            m.update(password + key)
            var iv = m.digest('hex');

            var data = new Buffer(input, 'utf8').toString('binary');
            var cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));
            var encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
            var encoded = new Buffer(encrypted, 'binary').toString('base64');
            return encoded;
      },
      decrypt_data:function (input, password) {
            var crypto = require('crypto');
            var input = input.replace(/\-/g, '+').replace(/_/g, '/');
            var edata = new Buffer(input, 'base64').toString('binary')

            var m = crypto.createHash('md5');
            m.update(password)
            var key = m.digest('hex');

            m = crypto.createHash('md5');
            m.update(password + key)
            var iv = m.digest('hex');

            var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));
            var plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
            return JSON.parse(plaintext);
      },
      login(){
        var params = [
          {
            uid : this.userid,
            upwd : this.userpwd
          }
        ];
        var password = '000000000@fsadqega#fkdlsaiqu1235';
        var input = JSON.stringify(params);

        var re1 = this.encrypt_data(input, password);
        axios.post("/SkdevsecUser/login", [re1]).then(response => {
          var re2 = this.decrypt_data(response.data, password)
          console.log(re2);
            if(re2 == '0') {
              alert('아이디 및 패스워드가 틀렸습니다.');
            }
            else if(re2.ulock >= 5){
              alert('5회 이상 틀리셨습니다. 비밀번호 찾기를 통해서 재설정을 해주세요.');
            }
            else if(re2.login_check == 2 || re2.login_check == 1){
              alert('로그인 성공');
              this.$session.start();
              if(re2.login_check == 1){
                var rand_1_999 = Math.floor(Math.random() * 999) + 1;
                this.$store.commit('set_nickname', re2.unickname);
                this.$store.commit('set_level', rand_1_999);
                //this.$cookie.set("memberNick", 3, '3h');
                this.$session.set('jwt', rand_1_999);
              }
              else if(re2.login_check == 2){
                var rand_1000_9999 = Math.floor(Math.random() * 9999) + 1000;
                this.$store.commit('set_nickname', re2.unickname);
                this.$store.commit('set_level', rand_1000_9999);
                //this.$cookie.set("memberNick", 3, '3h');
                this.$session.set('jwt', rand_1000_9999);
              }
              location.href = "/";
            }
        });
      },
      open_id_dialog() {
        this.id_dialog=true
      },
      open_pwd_dialog() {
        this.pwd_dialog=true
      },
      regExp_text(data){
        var regExp1 = /[\{\}\[\]\/?,;:|\)*~`!^\-+<>\#$%&\\\=\(\'\"]/gi;
        if(regExp1.test(data)){
          return false;
        }else{
          return true;
        }
      },
      passwordCheck(data){
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
            if (this.id_code_state == false || this.pw_code_state == false) {
              alert('인증번호 유효시간이 지났습니다. 재전송 버튼을 눌러주세요.')
              this.answer_code='';
              this.id_code_state = false;
              this.pw_code_state = false;
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
      timeReset(num) { 
        clearInterval(this.polling) 
        this.timeCounter = 120;
        if (num == 1) {
          this.id_find_email();
        } else if (num == 2) {
          this.find_pw_phone();
        }
      },
    },
    watch:{
      id_dialog:function(){
        if(this.id_dialog == false){
          this.find_name = '';
          this.find_email = '';
          this.input_code = '';
          this.answer_code = '';
          this.id = '';
          this.id_code_state = false;
        }
      },
      pwd_dialog:function(){
        if(this.pwd_dialog == false){
          this.pwd_dialog = false;
          this.find_id = '';
          this.upwd = '';
          this.upwdck = '';
          this.phone_answer_code = '';
          this.phone_input_code = '';
          this.pw_code_state = false;
        }
      },
    },
    beforeDestroy() { 
      clearInterval(this.polling) 
    }
};
</script>