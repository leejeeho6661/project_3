<template>
  <v-container>
    <h1 class="text-center ma-5">{{nickname}}님 마이페이지</h1>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="$router.push('/item/orderlist')"
        >
          <v-card-title>
            주문 내역
          </v-card-title>
          <v-card-subtitle>
            주문한 상품 내역을 확인하고, 배송 정보를 확인할 수 있습니다.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="$router.push('/item/cart')"
        >
          <v-card-title>
            장바구니
          </v-card-title>
          <v-card-subtitle>
            장바구니에 넣은 상품 목록을 확인하고, 주문할 수 있습니다.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="open_input_pw(1)"
        >
          <v-card-title>
            개인 정보 수정
          </v-card-title>
          <v-card-subtitle>
            개인 정보를 수정할 수 있습니다.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="$router.push('/board/myboard')"
        >
          <v-card-title>
            내 게시물
          </v-card-title>
          <v-card-subtitle>
            본인이 작성한 게시물 확인하고 관리할 수 있습니다.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="open_input_pw(2)"
        >
          <v-card-title>
            비밀번호 변경
          </v-card-title>
          <v-card-subtitle>
            비밀번호를 주기적으로 변경해 개인정보를 보호합시다.
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card
          color="#7A96A2"
          dark
          height="100%"
          @click="open_input_pw(3)"
        >
          <v-card-title>
            회원탈퇴
          </v-card-title>
          <v-card-subtitle>
            정말 탈퇴하시겠습니까?
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-card-actions>
      <div data-app>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                <span class="headline">본인 인증 패스워드 확인</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="itext"
                        label="비밀번호"
                        outline
                        type="password"
                        counter="18"
                        @keyup.enter="myinfo_update"
                        :rules="[
                          v => !!v || '비밀번호를 입력해주세요.',
                          v => !!v && v.length >= 6 || '비밀번호는 6자리가 넘어야합니다.',
                          v => !!v && v.length <= 18 || '비밀번호는 18자리 이하여야합니다.'
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closebtn()"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="myinfo_update()"
                >
                  비밀번호 확인
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </div>
    </v-card-actions>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Mypage',
  data: () => ({
    nickname:'',
    valid:true,
    dialog:false,
    itext:'',
    num:'',
  }),
  mounted(){
    this.nickname = this.$store.getters.get_nickname;
  },
  methods:{
    open_input_pw:function(num){
      this.dialog = true;
      this.num = num;
    },
    user_del(){
      var conf = confirm('정말 회원 탈퇴를 하시겠습니까 ?');
      if(conf == true){
        this.user_out();
      }
      else if(conf == false){
        alert('회원 탈퇴 취소');
      }
    },
    user_out: function(){
      var params = new URLSearchParams();
      params.append('unickname', this.nickname);
      axios.post('/SkdevsecUser/delete_user', params).then(response => {
        if(response.data == 1){
          this.$cookie.delete('memberNick');
          this.$store.commit('set_nickname', '');
          this.$store.commit('set_level', 0);
          alert('회원 탈퇴 성공');
          location.href = "/";
        }
        else{
          alert('회원 탈퇴 실패');
        }
      });
    },
    myinfo_update: function(){
      if(this.$refs.form.validate()){
        var params = new URLSearchParams();
          params.append('upwd', this.itext)
          params.append('unickname', this.$store.getters.get_nickname);
          axios.post("/SkdevsecUser/before_change", params).then(response => {
              if(response.data == 1){
                if(this.num == 1){
                  location.href = "/user/modify";
                }
                else if(this.num == 2){
                  location.href = "/user/pwdChange";
                }
                else if(this.num == 3){
                  this.user_del();
                }
              }
              else{
                alert('비밀번호가 틀렸습니다.')
              }
          });
      }
    },
    closebtn(){
          this.dialog = false;
          this.itext = '';
      },
  },
};
</script>