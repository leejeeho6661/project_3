<template>
  <v-container>
    <h1 class="text-center my-5">
      내 게시물
    </h1>
    <v-card flat>
      <v-chip-group
        v-model="selectBcate"
        active-class="primary--text"
        column
        multiple
      >
        <v-chip>
          자유게시판 = 1
        </v-chip>
        <v-chip>
          질문게시판 = 2
        </v-chip>
      </v-chip-group>
      <v-data-table
        :headers="headers"
        :items="myboardData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        style="cursor:pointer"
        @click:row="boardclick"
        @page-count="len = $event"
      ></v-data-table>

      <v-row
        justify="center"
        class="my-5 mx-auto"
      >
        <v-col>
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
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Myboard',
  data: () => ({
    search: '',
    page: 1,
    bcate: 1,
    len: 0,
    itemsPerPage: 10,
    myboardData:[],
    selectBcate: [],
    search_state:false,
    headers: [
      { text: '분류', value: 'bcate' },
      { text: '번호', value: 'bid' },
      { text: '제목', value: 'btitle' },
      { text: '작성자', value: 'unickname' },
      { text: '작성일', value: 'bcreate_date' },
      { text: '조회', value: 'bview' },
    ],
    myboardlist: [
      {
        bcate: '자유게시판',
        bid: 1,
        btitle: '첫 게시물',
        unickname: 'PEANUTS',
        bcreate_date: '2021-04-29',
        bview: 10,
      },
      {
        bcate: '질문게시판',
        bid: 2,
        btitle: '오늘 저녁은 고기~',
        unickname: 'HAPPY',
        bcreate_date: '2021-04-29',
        bview: 10,
      },
    ],
  }),
  methods: {
    boardclick(item) {
      this.$router.push('/board/detail/' + item.bid)
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
    searchBoard() {
      if(this.regExp_text(this.search)){
        if(this.search.length > 40){
          alert('검색단어는 20자 이하로 검색해주세요.');
        }else{
          this.search_state = true;
          var params = new URLSearchParams();
          params.append("unickname", this.$store.getters.get_nickname);
          params.append('bpage', this.page);
          params.append('bsearch', this.search);
          axios.post("/SkdevsecBoard/my_board_search", params).then(response => {
                    this.boardlength(response.data[response.data.length-1].board_count);
                    response.data.pop();
                    this.myboardData = response.data;
          });
        }
      }else{
        alert('특수문자는 검색할 수 없습니다.');
      }
      
    },
    myboardList: function(){
      this.search_state = false;
      var params = new URLSearchParams();
      params.append("unickname", this.$store.getters.get_nickname);
      params.append('bpage', this.page);
      axios.post("/SkdevsecBoard/my_board", params).then(response => {
                this.boardlength(response.data[0].board_count);
                response.data.shift();
                this.myboardData = response.data;
      });
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
    this.myboardList();
  },
  watch:{
    page:function(){
      if(this.search_state == false){
        this.myboardList();
      }
      else if(this.search_state == true){
        this.searchBoard();
      }
    },
  },
};
</script>