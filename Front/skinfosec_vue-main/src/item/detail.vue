<template>
  <v-container>
    <v-card
      flat
      class="mx-auto my-12"
      max-width="900"
    >
      <br>
      <v-row>
        <v-col cols="12" md="6">
          <div class="d-flex justify-center align-content-center">
            <v-img
              max-height="500"
              max-width="500"
              :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/'+ p_item[0].pimage"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-list>
              <v-list-item
                v-for="item in p_item"
                :key="item.pname"
              >
                <v-list-item-content>
                  <v-row class="my-1">
                    <v-col cols="3" class="subtitle-1 text-truncate">상품명</v-col>
                    <v-col cols="9" class="subtitle-1">{{item.pname}}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="my-1">
                    <v-col cols="3" class="subtitle-1 text-truncate">가격</v-col>
                    <v-col cols="9" class="subtitle-1">{{item.pprice}}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="my-1">
                    <v-col cols="3" class="subtitle-1 text-truncate">상세설명</v-col>
                    <v-col cols="9" class="subtitle-1">{{item.ptext}}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="my-1">
                    <v-col cols="3" class="subtitle-1 text-truncate">평점</v-col>
                    <v-col cols="6">
                      <v-rating
                        v-model="item.preview_avg"
                        half-increments
                        color="#F29F8F"
                        background-color="#F29F8F"
                        dense
                        readonly
                      ></v-rating>
                    </v-col>
                    <v-col cols="3" class="subtitle-1">({{item.preview}})</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="my-1">
                    <v-col cols="3" class="subtitle-1 text-truncate">수량</v-col>
                    <v-col cols="9" class="subtitle-1">
                      <v-text-field
                        v-model="pcount"
                        type="number"
                        label="주문 수량"
                        min="1"
                        max="100"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <div
        class="d-flex justify-end ma-6"
      >
        <v-col cols="3">
        <v-btn
          outlined
          class="ma-2"
          width="100%"
          height="50"
          color="grey"
          @click='add_bag()'
        >
          <v-icon>mdi-cart</v-icon>
          ADD TO CART
        </v-btn>
        </v-col>
        <v-col cols="3">
        <v-btn
          depressed
          class="ma-2"
          width="100%"
          height="50"
          color="#F29F8F"
          dark
          @click='order()'
        >
          BUY NOW
        </v-btn>
        </v-col>
      </div>

      <div class="d-flex justify-center ma-3">
        <v-btn
          outlined
          text
          to="/item/itemlist"
        >
          목록
        </v-btn>
      </div>
      <v-divider class="my-4"></v-divider>

      <v-card-title>REVIEWS (cnt)</v-card-title>

      <v-list>
        <template v-for="review in review_list">
          <v-list-item
            :key="review.content"
          >
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>

            <v-row>
              <v-list-item-content>
                <v-col cols="2">
                  <div class="font-weight-normal mb-2">
                    <strong>{{ review.unickname }}</strong> 
                  </div>
                </v-col>
                <v-col cols="2">
                  {{review.rstar}}
                </v-col>
                <v-col cols="4">
                  <v-rating
                    v-model="review.rstar"
                    half-increments
                    color="#F29F8F"
                    background-color="#F29F8F"
                    dense
                    readonly
                  ></v-rating>
                </v-col>
                <v-col cols="2">
                  {{ review.rcreate_date }}
                </v-col>
                <v-col cols="2">
                  <v-btn
                    color="error"
                    plain
                    @click="review_del(review)"
                  >
                  삭제</v-btn>
                </v-col>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-row>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <v-card
      class="mx-auto ma-12 pa-3"
      max-width="900"
      outlined
    >
      <v-card-text>
        <v-row align="center" justify="center">
          <v-icon>mdi-emoticon</v-icon>
          <v-col cols="2">
            <div class="font-weight-normal">
              <strong>{{this.$store.getters.get_nickname}}</strong> 
            </div>
          </v-col>
          <v-col cols="1">
            {{preview}}
          </v-col>
          <v-col cols="4">
            <v-rating
              v-model="preview"
              half-increments
              color="#F29F8F"
              background-color="#F29F8F"
              hover
              dense
              large
            ></v-rating>
          </v-col>
          <v-col cols="2">
            {{udate}}
          </v-col>
          <v-col cols="2">
            <v-btn
              outlined
              @click="review_check()"
            >
              리뷰작성
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container> 
</template>

<script>
import axios from 'axios';
export default {
  name: 'Itemdetail',
  data: () => ({
    pid: '',
    preview: 0,
    pcount: 1,
    udate: '',
    review_list: [],
    p_item: [],
    items: [
        {
          pname: 'Brunch this weekend?',
          pcate: 'CPU',
          ptext: '이 상품 좋아요~<br> 어떤 점이 좋을까요? <br> 저도 잘 모르겠어요... <br>직접 사용해보시고 후기 남겨주세요^^',
          pprice: 100000,
          preview_avg: 3.5,
        },
    ],
    reviews: [
      {
        unickname: '안녕',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        preview: 3.5,
        time: '2021-04-27',
      },
      {
        unickname: 'tester',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        preview: 1.5,
        time: '2021-04-27',
      },
      {
        unickname: '닉네임몰라요',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        preview: 4,
        time: '2021-04-27',
      },
    ],
  }),
  mounted(){
    this.itemList();
    this.reviewList();
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
    var udate = String(yy) + "-" + mm + "-" + dd;
    this.udate = udate;
  },
  methods:{
    order: function(){
      this.$router.push('/item/order/' + this.$route.params.pid + '/' + this.pcount)
    },
    itemList(){
      var params = new URLSearchParams();
      params.append('pid', this.$route.params.pid);
      axios.post('/SkdevsecProduct/product_inside', params).then(response => {
        this.p_item = response.data;
      });
    },
    reviewList(){
      var params = new URLSearchParams();
      params.append('pid', this.$route.params.pid);
      axios.post('/SkdevsecReview/review_output', params).then(response => {
        this.review_list = response.data;
      });
    },
    add_bag(){
      var params = new URLSearchParams();
      params.append('pid', this.$route.params.pid);
      params.append('unickname', this.$store.getters.get_nickname);
      params.append('bcount', this.pcount);
      axios.post('/SkdevsecBag/bag_add', params).then(response => {
        if(response.data == 1){
          alert('장바구니 등록 성공');
        }
        else{
          alert('장바구니 등록 실패(수량이 너무 많습니다.)');
        }
      });
    },
    review_check(){
      var params = new URLSearchParams();
      params.append('pname', this.$route.params.pid);
      params.append('unickname', this.$store.getters.get_nickname);
      axios.post('/SkdevsecReview/review_certified', params).then(response => {
        if(response.data == 0){
          this.review_add();
        }
        else{
          alert('상품 주문 1개당 리뷰작성 가능 횟수는 한 번입니다.');
        }
      });
    },
    review_del(data){
      if(this.$store.getters.get_nickname == data.unickname){
        var params = new URLSearchParams();
        params.append('pid', this.$route.params.pid);
        params.append('rid', data.rid);
        params.append('unickname', this.$store.getters.get_nickname);
        axios.post('/SkdevsecReview/comment_delete', params).then(response => {
        if(response.data == 1){
            alert('리뷰 삭제 성공');
            this.reviewList();
          }
          else{
            alert('리뷰 삭제 실패');
          }
        });
      }else{
        alert('본인이 작성한 리뷰가 아닙니다.');
      }
    },
    review_add(){
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
      params.append('pid', this.$route.params.pid);
      params.append('rstar', this.preview);
      params.append('rcreate_date', udate);
      params.append('unickname', this.$store.getters.get_nickname);
      axios.post('/SkdevsecReview/review_write', params).then(response => {
        if(response.data == 1){
          alert('리뷰 등록 성공');
          this.reviewList();
        }
        else{
          alert('리뷰 등록 실패');
        }
      });
    },
  }
}
</script>
