<template>
  <v-container>
    <v-card
      flat
      class="mx-auto my-12"
      max-width="800"
    >
    자유게시판
    <v-card-title class="d-flex justify-center align-center">{{detail_data.btitle}}</v-card-title>

    <v-card-text>
      <v-row
        class="d-flex justify-space-between ma-2"
      >
        <div class="subtitle-1">
          작성자 : {{detail_data.unickname}}
        </div>
        <div>
          {{detail_data.bcreate_date}}
        </div>
      </v-row>
      <v-row
        class="d-flex justify-end ma-2"
      >
        <div class="mr-5">
          조회수 {{detail_data.bview}}
        </div>

        <div>
          댓글수 {{detail_data.bcomment}}
        </div>

      </v-row>
      <v-divider class="my-4"></v-divider>
    </v-card-text>

    <v-card-text v-if="detail_data.b_lock == 0 || b_user_state">
      <div>{{detail_data.btext}}</div>
      <div
        class="d-flex justify-center align-center"
      >
        <v-img
          class="ma-5"
          max-height="500"
          max-width="500"
          :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/' + detail_data.bfile"
          @error="onImgError"
        ></v-img>
      </div>
    </v-card-text>

    <v-card-text v-else>
      비밀글입니다.
    </v-card-text>
    
    <div
      class="d-flex justify-end ma-6"
    >
      <v-btn
        plain
        class="mr-3"
        @click="update()"
        v-if='b_user_state'
      >
        <v-icon>mdi-pencil</v-icon>
        수정
      </v-btn>
      <v-btn
        color="error"
        plain
        v-if='b_user_state'
        @click="board_del()"
      >
        <v-icon>mdi-delete</v-icon>
        삭제
      </v-btn>
    </div>
    <div class="d-flex justify-center ma-3">
      <v-btn
        outlined
        text
        to="/board/board"
      >
        목록
      </v-btn>
    </div>
    <v-divider class="my-4"></v-divider>

    <v-card-title>Comments</v-card-title>

    <v-list>
      <template v-for="(item) in items">
        <v-list-item
          :key="item.content"
        >
          <v-list-item-avatar>
            <v-icon v-if="item.clock == 1" large color="red lighten-1">mdi-lock</v-icon>
            <v-icon v-else large>mdi-account</v-icon>
          </v-list-item-avatar>

          <v-row>
            <v-list-item-content>
              <v-card flat>
                <v-row align="center">
                  <v-col cols="10">
                    <v-card-text>
                      <v-row class="mt-1">
                        <strong>{{ item.unickname }}</strong>
                        <v-spacer></v-spacer>
                        {{ item.ccreate_date }}
                      </v-row>
                    </v-card-text>
                    <v-card-text>
                      <div v-if="item.clock == 0 || nick == item.unickname">{{item.ctext}}</div>
                      <div v-else>비밀 댓글입니다.</div>
                    </v-card-text>
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      plain
                      @click='comment_delete(item.cid, item.unickname)'
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-row>
        </v-list-item>
      </template>
    </v-list>

    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="len"
        circle
        color="#F29F8F"
      ></v-pagination>
    </div>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        onsubmit="return false;"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="message"
                :rules="[
                  v => !!v || '댓글을 입력해주세요.',
                  v => !!v && v.length >= 2 || '댓글은 2자 이상입니다.',
                  v => !!v && v.length <= 300 || '댓글은 300자리가 넘을 수 없습니다.',
                ]"
                :append-icon="block ? 'mdi-lock' : 'mdi-lock-open-variant'"
                label="Comment"
                outlined
                prepend-icon="mdi-emoticon"
                append-outer-icon="mdi-send"
                @keyup.enter="submit()"
                @click:append-outer="submit()"
                @click:append="lockMarker()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Detail',
  data: () => ({
    valid:true,
    page: 1,
    len: 0,
    b_user_state:false,
    detail_data : [],
    nick:'',
    message:'',
    items: [],
    block: false,
  }),
  mounted () {
    this.nick = this.$store.getters.get_nickname;
    this.detailList();
    this.comment_list();
  },
  methods: {
    onImgError: function(event) {
      event.target.src = '../에러.png';
    },
    lockMarker () {
      this.block = !this.block
    },
    update() {
      this.$router.push('/board/update/' + this.$route.params.bid);
    },
    submit(){
      if(this.$refs.form.validate()){
        this.add_comment();
      }
    },
    board_del(){
      var p = new URLSearchParams();
      p.append("bid", this.$route.params.bid);
      axios.post('/SkdevsecBoard/board_delete', p).then(response => {
        if(response.data == 1){
          alert('게시물 삭제 성공');
          this.$router.push('/board/board');
        }
        else{
          alert('게시물 삭제 실패');
        }
      });
    },
    detailList(){
      var params = {
        bid : this.$route.params.bid
      }
      axios.post('/SkdevsecBoard/board_inside', params).then(response =>{
        this.detail_data = response.data;
        this.userCheck();
      });
    },
    userCheck: function(){
      if(this.detail_data.unickname == this.$store.getters.get_nickname){
        this.b_user_state = true;
      }
      else{
        this.b_user_state = false;
      }
    },
    comment_list:function(){
      var p = new URLSearchParams();
      p.append("bid", this.$route.params.bid);
      p.append("cpage", this.page);
      axios.post('/SkdevsecComment/view_comment', p).then(response => {
        this.commentlength(response.data[0].comment_count);
        response.data.shift();
        this.items = response.data;
      });
    },
    add_comment: function(){
      if(this.$cookie.get('memberNick') == null){
        alert('로그인이 필요합니다.');
      }
      else{
        if(this.regExp_text(this.message)){
          if(this.message > 200){
            alert('댓글은 100자 이상 입력할 수 없습니다.');
          }
          else{
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
            var block_send = 0;
            if(this.block == false){
              block_send = '0';
            }
            else if(this.block == true){
              block_send = '1';
            }
            var params = {
              bid : this.$route.params.bid,
              unickname : this.$store.getters.get_nickname,
              ctext : this.message,
              ccreate_date : udate,
              clock : block_send
            };
            axios.post('/SkdevsecComment/comment_write', params).then(response =>{
              if(response.data == 1){
                alert('댓글 작성 성공');
                this.message = '';
                this.comment_list();
              }
              else{
                alert('댓글 작성 실패');
              }
            });
          }
        }else{
          alert('허용되지 않는 특수문자를 입력하였습니다.');
        }
      }
    },
    comment_delete: function(c_num, c_nickname){
      if(this.$store.getters.get_nickname == c_nickname){
        var p = new URLSearchParams();
        p.append("bid", this.$route.params.bid);
        p.append("cid", c_num);
        axios.post('/SkdevsecComment/comment_delete', p).then(response => {
          if(response.data == 1){
            alert('댓글 삭제 성공');
            this.comment_list();
          }
          else{
            alert('댓글 삭제 실패');
          }
        });
      }
      else{
        alert('본인이 작성한 댓글이 아닙니다.');
      }
      
    },
    commentlength(num){
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
      var regExp1 = /[\{\}\[\]\/;:|\)*`^\-+<>\#$%&\\\=\(\'\"]/gi;
      if(regExp1.test(data)){
        return false;
      }else{
        return true;
      }
    },
  }
};
</script>