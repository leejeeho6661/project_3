<template>
  <v-container>
    <h1 class="text-center ma-5">회원 관리</h1>
    <v-simple-table
      class="ma-5"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">아이디</th>
            <th class="text-center">닉네임</th>
            <th class="text-center">이름</th>
            <th class="text-center">이메일</th>
            <th class="text-center">핸드폰번호</th>
            <th class="text-center">가입일자</th>
            <th class="text-center">권한</th>
            <th class="text-center">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in userdata"
            :key="item.uid"
          >
            <td class="text-center">{{item.uid}} </td>
            <td class="text-center">{{ item.unickname }}</td>
            <td class="text-center">{{ item.uname }}</td>
            <td class="text-center">{{ item.umail}}</td>
            <td class="text-center">{{ item.uphone}}</td>
            <td class="text-center">{{ item.ucreate_date}}</td>
            <td class="text-center">{{ item.authority}}</td>
            <td class="text-center">
              <v-btn
                icon
                @click="deleteItem(item)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this user?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="len"
              circle
              color="#F29F8F"
            ></v-pagination>
          </div>

    <v-row
      justify="center"
      class="my-5 mx-auto"
    >
      <v-col cols="12" sm="3">
        <v-select
          v-model="select"
          :items="usercate"
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
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          width="100"
          height="40"
          outlined
          dense
          @click="searchUser()"
        >
          검색
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "User",
  data: () => ({
    dialogDelete: false,
    search_state:false,
    search: '',
    page: 1,
    len: 0,
    itemsPerPage: 10,
    select:0,
    userdata:[],
    headers: [
      { text: '아이디', value: 'uid' },
      { text: '닉네임', value: 'unickname' },
      { text: '이름', value: 'uname' },
      { text: '이메일', value: 'uemail' },
      { text: '핸드폰번호', value: 'uphone' },
      { text: '가입일자', value: 'ucreate_date' },
      { text: '권한', value: 'authority' },
      { text: '탈퇴', value: 'actions', sortable: false },
    ],
    userlist: [
      {
        uid: 1,
        unickname: '닉네임은어려워',
        uname: 'PEANUTS',
        uemail: 'nick@test.com',
        uphone: '010-0000-1111',
        ucreate_date: '2021-05-04',
        authority: 0,
      },
      {
        uid: 2,
        unickname: '홈런볼조아',
        uname: '홈런볼',
        uemail: 'home@test.com',
        uphone: '010-1212-3434',
        ucreate_date: '2021-05-04',
        authority: 0,
      },
    ],
    usercate: [
      { name: '전체', id: 0 },
      { name: '이름', id: 1 },
      { name: '닉네임', id: 2 },
      { name: '아이디', id: 3 },
      { name: '이메일', id: 4 },
    ],
  }),
  methods: {
    user_List: function(){
      this.search_state = false;
      this.search = '';
      var params = new URLSearchParams();
      params.append('upage', this.page);
      params.append('authority', '1');
      params.append('unickname', 'admin');
      axios.post("/SkdevsecUser/admin_user_info", params).then(response => {
                this.boardlength(response.data[0].user_count);
                response.data.shift();
                this.userdata = response.data;
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
    searchUser(){
      if(this.regExp_text(this.search)){
        if(this.search.length > 40){
          alert('검색단어는 20자 아래로 입력해주세요.');
        }else{
          this.search_state = true;
          var params = new URLSearchParams();
          params.append('authority', '1');
          params.append('unickname', 'admin');
          params.append("ucode", this.select);
          params.append('usearch', this.search);
          params.append('upage', this.page);
          axios.post('/SkdevsecUser/admin_user_search', params).then(response => {
            if(response.data == 0){
              alert('검색 결과가 없습니다.');
            }
            else{
              this.boardlength(response.data[response.data.length-1].user_count);
              response.data.pop();
              this.userdata = response.data;
            }
          });
        }
      }else{
        alert('특수문자는 검색할 수 없습니다.');
      }
    },
    deleteItem (item) {
      console.log(item)
      this.dialogDelete = true;
    },
    closeDelete () {
      this.dialogDelete = false;
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
  mounted(){
    this.user_List();
  },
  watch:{
    page:function(){
      if(this.search_state == false){
        this.user_List();
      }
      else if(this.search_state == true){
        this.searchUser();
      }
    },
  },
}
</script>