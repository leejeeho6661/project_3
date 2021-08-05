<template>
  <v-container>
    <h1 class="text-center ma-3">상품목록</h1>
    <v-card
      flat
    >
      <v-card-text>
        <v-row align="center" justify="space-between" class="mx-3">
          <v-text-field
            v-model="search"
            hide-details
            prepend-inner-icon="mdi-magnify"
            outlined
            shaped
            class="ma-3"
            @keyup.enter="searchItem()"
          ></v-text-field>
          <v-btn
            class="ma-2" 
            height="50"
            color="#7A96A2" 
            dark
            @click="searchItem()"
          > 검색 </v-btn>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row
          align="center"
          justify="center"
          class="mx-3"
        >
          <v-col cols="2">
            카테고리 선택
          </v-col>
          <v-col cols="10">
            <v-chip-group
              v-model="selectPcate"
              column
              multiple
            >
              <v-chip
                v-for="tag in pcates"
                :key="tag"
                :input-value="active"
                class="ma-2"
                filter
                active-class="cyan darken-4 white--text" 
              >
                {{tag}}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider class="mb-5"></v-divider>
    <v-row
      align="center"
      justify="end"
    >
      <v-btn text @click="latest_item_list()">
        최신순
      </v-btn>
      |
      <v-btn text @click="best_item_list()">
        인기순
      </v-btn>
      |
      <v-btn text @click="high_item_list()">
        높은가격순
      </v-btn>
      |
      <v-btn text @click="low_item_list()">
        낮은가격순
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        v-for="card in itemData"
        :key="card.pname"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card @click="itemclick(card.pid)">
          <v-img
            :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/' + card.pimage"
            @error="onImgError"
            height="200px"
          >
          </v-img>
          <v-chip
            class="ma-2"
            color="#F29F8F"
            small
            pill
            text-color="white"
          >
            {{card.pcate}}
          </v-chip>
          <v-card-title v-text="card.pname"></v-card-title>
          <v-card-text>
            {{card.pprice}}원
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-rating
              readonly
              v-model="card.preview_avg"
              background-color="orange"
              color="orange"
              dense
              half-increments
              size="20"
            ></v-rating>
            <span class="text--lighten-1 body-2 mx-2">
              ({{card.preview_avg}})
            </span>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="text--lighten-1 body-2 mx-2">
              Reviews {{ card.preview }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center ma-5">
      <v-pagination
        v-model="page"
        :length="len"
        circle
        color="#F29F8F"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Itemlist',
  data: () => ({
    selectPcate: [],
    sortBoard: '',
    search:'',
    active: false,
    rating: 4.3,
    page: 1,
    len: 0,
    itemData:[],
    search_state:false,
    cards: [
      { pid:1, pcate:'CPU', title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', rating:3, price:'100,000', preview:10 },
      { pid:2, pcate:'RAM', title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', rating:4.5, price:'150,000', preview:5 },
      { pid:3, pcate:'ETC', title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', rating:2, price:'1,111,100', preview:2 },
      { pid:4, pcate:'SSP', title: 'b', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', rating:3, price:'100,010', preview:0 },
      { pid:5, pcate:'CPU', title: 'a', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', rating:3, price:'10,000,000', preview:10 },
    ],
    pcates: [
        'CPU',
        'RAM',
        'VGA',
        'SSP',
        'MAINBOARD',
        'CASE',
        'POWER',
        'ETC',
      ],
    limit_code:0,
  }),
  created(){
    this.item_list();
  },
  // computed:{
  //   img_src(){
  //     return (data) => {
  //       if(this.failed_image == false){
  //         return 'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/'+ data;
  //       }
  //       else{
  //         this.failed_image = false;
  //         return '../에러.png'
  //       }
  //     }
  //   }
  // },
  methods: {
    onImgError: function(event) {
      console.log('img_error');
    },
    item_list(){
      this.limit_code = 0;
      this.search_state = false;
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    latest_item_list(){
      this.limit_code = 1;
      this.search_state = false;
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/latest_item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    best_item_list(){
      this.limit_code = 2;
      this.search_state = false;
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/best_item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    high_item_list(){
      this.limit_code = 3;
      this.search_state = false;
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/highest_item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    low_item_list(){
      this.limit_code = 4;
      this.search_state = false;
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/rowest_item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    itemclick(pcode) {
      this.$router.push('/item/detail/' + pcode);
    },
    searchItem(){
      if(this.regExp_text(this.search)){
        if(this.search.length > 40){
          alert('검색어는 20자 이하로 검색해주세요.');
        }
        else{
          this.search_state = true;
          var data = [];
          for(var i = 0; i < this.selectPcate.length; i++){
            data.push(this.pcates[this.selectPcate[i]])
          }
          data.unshift(this.search);
          data.unshift(this.page);
          axios.post('/SkdevsecProduct/product_search', data).then(response => {
            if(response.data == 0){
              alert('검색결과가 없습니다.')
            }
            else{
              this.boardlength(response.data[response.data.length-1].product_count);
              response.data.pop();
              this.itemData = response.data;
            }
          });
        }
      }
      else{
        alert('특수문자는 검색할 수 없습니다.');
      }
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
      if(this.search_state == false){
        this.item_list();
      }
      else if(this.search_state == true){
        this.searchItem();
      }
      if(this.limit_code == 1){
        this.latest_item_list();
      }
      else if(this.limit_code == 2){
        this.best_item_list();
      }
      else if(this.limit_code == 3){
        this.high_item_list();
      }
      else if(this.limit_code == 4){
        this.low_item_list();
      }
    },
  }
}
</script>
