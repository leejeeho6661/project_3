<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-card flat class="text-center">
        <h1>{{nickname}}님 비밀번호 변경</h1>
        <br>
        <v-col
          cols="12"
        >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card ref="form" flat>
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
                  v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함해야 합니다.',
                  v => /[~!@#$%^&*()_+|<>?:{}=,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함해야 합니다.',
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
                  v => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(v) || '영어 대문자, 소문자, 숫자, 특수문자를 반드시 포함해야 합니다.',
                  v => /[~!@#$%^&*()_+|<>?:{}=,/`;-]/.test(v) || '비밀번호에는 특수문자를 반드시 포함해야 합니다.',
                  v => !/(\w)\1\1/.test(v) || '같은 문자 3개 이상입니다.',
                  v => password_check(v) || '연속 문자 3개 이상입니다.',
                ]"
            ></v-text-field>
            <v-divider class="my-3"></v-divider>
            <v-card-actions>
              <v-btn 
                outlined
                color="grey"
                to='/user/mypage'
              >
                돌아가기
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn 
                dark 
                color="#F29F8F" 
                @click="summit()"
              >
                비밀번호변경
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'pwdChange',
  data: () => ({
    upwd:'',
    upwdck:'',
    nickname:'',
    valid:true,
  }),
  mounted(){
    this.nickname = this.$store.getters.get_nickname;
  },
  methods:{
    summit(){
      if(this.$refs.form.validate()){
        if(this.upwd == this.upwdck){
          this.pwd_change();
        }
        else{
          alert('입력 비밀번호와 비밀번호 확인이 서로 맞지 않습니다.');
        }
      }
    },
    pwd_change:function(){
      var params = new URLSearchParams();
      params.append("unickname", this.nickname);
      params.append("upwd", this.upwd);
      axios.post('/SkdevsecUser/change_pwd', params).then(response => {
        if(response.data == 1){
          alert('비밀번호 변경 성공');
          this.$router.push('/user/mypage');
        }
        else{
          alert('비밀번호 변경 실패');
        }
      })
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
  }
};
</script>