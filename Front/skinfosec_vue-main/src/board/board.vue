<template>
  <v-container>
    <v-tabs vertical color="#253F58">
      <div class="mt-15" >
        <v-tab @click='freeboardList()'>
          <v-icon left>
            mdi-account
          </v-icon>
          자유게시판
        </v-tab>
        <v-tab @click='qnaboardList()'>
          <v-icon left>
            mdi-lock
          </v-icon>
          질문게시판
        </v-tab>
        <v-tab @click='noticeboardList()'>
          <v-icon left>
            mdi-access-point
          </v-icon>
          공지사항
        </v-tab>
      </div>

      <v-tab-item>
        <h1 class="text-center my-5">
          자유게시판
          <v-btn
            class="ma-2"
            fab        
            dark
            small
            color="#F29F8F"
            @click="write_move()"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </h1>
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="freelist"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @click:row="boardclick"
            style="cursor:pointer"
            @page-count="len = $event"
          >
          </v-data-table>

          <v-row
            justify="center"
            class="my-5 mx-auto"
          >
            <v-col cols="12" sm="3">
              <v-select
                v-model="select"
                :items="boardcate"
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
                @keyup.enter="searchBoard()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn
                width="100"
                height="40"
                outlined
                dense
                @click="searchBoard()"
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
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <h1 class="text-center">
          질문게시판
          <v-btn
            class="pa-2"
            fab        
            dark
            small
            color="#F29F8F"
            @click="write_move()"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </h1>
        <v-card flat>
          <v-card-title>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="qnalist"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @click:row="boardclick"
            style="cursor:pointer"
            @page-count="len = $event"
          ></v-data-table>

          <v-row
            justify="center"
            class="my-5 mx-auto"
          >
            <v-col cols="12" sm="3">
              <v-select
                v-model="select"
                :items="boardcate"
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
                @keyup.enter="searchBoard()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn
                width="100"
                height="40"
                outlined
                dense
                @click="searchBoard()"
              >
                검색
              </v-btn>
            </v-col>
          </v-row>

          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="len"
              circle
              color="#F29F8F"
            ></v-pagination>
          </div>
        </v-card>
      </v-tab-item>


      <v-tab-item>
        <h1 class="text-center">
          공지사항
          <v-btn
            class="pa-2"
            fab        
            dark
            small
            color="#F29F8F"
            @click="write_move()"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </h1>
        <v-card flat>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="noticelist"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @click:row="boardclick"
            style="cursor:pointer"
            @page-count="len = $event"
          >
          </v-data-table>

          <v-row
            justify="center"
            class="my-5 mx-auto"
          >
            <v-col cols="12" sm="3">
              <v-select
                v-model="select"
                :items="boardcate"
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
                @keyup.enter="searchBoard()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn
                width="100"
                height="40"
                outlined
                dense
                @click="searchBoard()"
              >
                검색
              </v-btn>
            </v-col>
          </v-row>


          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :length="len"
              circle
              color="#F29F8F"
            ></v-pagination>
          </div>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Board',
  data: () => ({
    search: '',
    page: 1,
    bcate: 1,
    len: 0,
    itemsPerPage: 10,
    select:0,
    boardcate: [
      { name: '전체', id: 0 },
      { name: '제목', id: 1 },
      { name: '내용', id: 2 },
      { name: '작성자', id: 3 },
      { name: '제목 + 내용', id: 4 },
    ],
    headers: [
      { text: '번호', value: 'bid' },
      { text: '제목', value: 'btitle' },
      { text: '작성자', value: 'unickname' },
      { text: '작성일', value: 'bcreate_date' },
      { text: '조회', value: 'bview' },
    ],
    freelist: [],
    qnalist:[],
    noticelist:[],
    search_state:false,
    freelist2: [
      {
        bid: 1,
        btitle: '첫 게시물',
        unickname: 'PEANUTS',
        bcreate_date: '2021-04-29',
        bview: 10,
      },
      {
        bid: 2,
        btitle: '오늘 저녁은 고기~',
        unickname: 'HAPPY',
        bcreate_date: '2021-04-29',
        bview: 10,
      },
    ],
  }),
  created(){
    this.freeboardList();
  },
  methods: {
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
    boardclick(item) {
      this.$router.push('/board/detail/' + item.bid)
    },
    write_move: function(){
      if(this.$store.getters.get_nickname == null){
        alert('로그인을 해주세요.')
      }
      else{
        this.$router.push("/board/write");
      }
    },
    freeboardList: function(){
      this.search_state = false;
      this.bcate = 1;
      this.search = '';
      var params = new URLSearchParams();
      params.append("bcate", this.bcate);
      params.append('bpage', this.page);
      axios.post("/SkdevsecBoard/board_output", params).then(response => {
                this.boardlength(response.data[0].board_count);
                response.data.shift();
                this.freelist = response.data;
      });
    },
    qnaboardList: function(){
      this.search_state = false;
      this.bcate = 2;
      this.search = '';
      var params = new URLSearchParams();
      params.append("bcate", this.bcate);
      params.append('bpage', this.page)
      axios.post("/SkdevsecBoard/board_output", params).then(response => {
                this.boardlength(response.data[0].board_count);
                response.data.shift()
                this.qnalist = response.data;
      });
    },
    noticeboardList: function(){
      this.search_state = false;
      this.bcate = 3;
      this.search = '';
      var params = new URLSearchParams();
      params.append("bcate", this.bcate);
      params.append('bpage', this.page)
      axios.post("/SkdevsecBoard/board_output", params).then(response => {
                this.boardlength(response.data[0].board_count);
                response.data.shift()
                this.noticelist = response.data;
      });
    },
    searchBoard(){
      if(this.regExp_text(this.search)){
        if(this.search.length > 40){
          alert('검색단어는 20자 이상 입력할 수 없습니다.');
        }
        else{
          this.search_state = true;
          var params = new URLSearchParams();
          params.append("bcode", this.select);
          params.append('bsearch', this.search);
          params.append('bcate', this.bcate);
          params.append('bpage', this.page);
          axios.post('/SkdevsecBoard/board_search', params).then(response => {
            if(response.data == 0){
              alert('검색 결과가 없습니다.')
            }
            else{
              this.boardlength(response.data[response.data.length-1].board_count);
              response.data.pop();
              if(this.bcate == 1){
                this.freelist = response.data;
              }
              else if(this.bcate == 2){
                this.qnalist = response.data;
              }
              else if(this.bcate == 3){
                this.noticelist = response.data;
              }
            }
          });
        }
      }
      else{
        alert('특수문자는 검색할 수 없습니다.');
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
      if(this.bcate == 1){
        this.freeboardList();
      }
      else if(this.bcate == 2){
        this.qnaboardList();
      }
      else if(this.bcate == 3){
        this.noticeboardList();
      }
      if(this.search_state == true){
        this.searchBoard();
      }
    }
  },
};
</script>