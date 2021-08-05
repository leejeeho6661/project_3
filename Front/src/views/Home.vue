<template>
  <v-card
    flat
    tile
  >
    <v-carousel
      cycle
      height="600"
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-card
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3" v-html="slide">
              {{ slide }}
            </div>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-card flat min-height="600">
        <v-card-title class="display-1 justify-center">
          ABOUT PROJECT
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <div class="text-center ma-3">
          클라우드, 웹 어플리케이션 구축을 통한 취약점 진단과 시큐어 코딩
        </div>
        <v-row justify="center">
          <v-col cols="12" sm="4">
            <v-card flat class="ma-5 text-center">
              <v-icon size="100">
                mdi-web
              </v-icon>
              <v-card-title class="justify-center">
                개발
              </v-card-title>
              <div>
                Django를 이용하여 웹 어플리케이션 기능을 restful API로 구축,
                Vue.js를 이용한 반응형 웹 어플리케이션 구축
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card flat class="ma-5 text-center">
              <v-icon size="100">
                mdi-database-check
              </v-icon>
              <v-card-title class="justify-center">
                취약점 진단
              </v-card-title>
              <div>
                가이드라인에 따른 WEB 취약점 수동진단 및 동적 자동화 점검 실시
              </div>
              <v-card-action>
              </v-card-action>
            </v-card>
            <v-row justify="center" align="center">
              <v-btn
                class="mt-5"
                outlined
                @click="result1_move()"
              >
                진단 결과보기
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card flat class="ma-5 text-center">
              <v-icon size="100">
                mdi-security
              </v-icon>
              <v-card-title class="justify-center">
                시큐어 코딩
              </v-card-title>
              <div>
                취약점 결과에 따른 모든 취약점에 대한 시큐어 코딩을 실시하여 취약점 조치
              </div>
            </v-card>
            <v-row justify="center" align="center">
              <v-btn
                class="mt-5"
                outlined
                @click="result2_move()"
              >
                시큐어 코딩 결과
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-card
      flat
      width="100%"
      color="grey lighten-4"
    >
      <v-container>
        <v-card-title class="display-1 justify-center">
          TEAM MEMBERS
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-row justify="center" align="center">
          <v-col
            v-for="member in members"
            :key="member.name"
            cols="12"
            sm="4"
          >
            <v-card
              class="text-center pa-5"
              color="grey lighten-4"
              flat
            >
              <v-avatar size="150" rounded="circle">
                <img
                  :src="member.src"
                  @click="open_info(member)"
                >
              </v-avatar>
              <v-card-title
                class="justify-center"
                @click="open_info(member)"
              >
                <v-avatar
                  v-if="member.crown"
                  size="36px"
                  class="mr-2"
                >
                  <img
                    alt="CROWN"
                    :src="member.crown"
                  >
                </v-avatar>
                {{member.name}}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-3">
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="100">
              <v-img :src="data.src"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title 
                class="display-1"
              >
                {{data.name}}
                <v-avatar
                  v-if="data.crown"
                  size="50px"
                  class="mr-2"
                >
                  <img
                    alt="CROWN"
                    :src="data.crown"
                  >
                </v-avatar>
              </v-list-item-title>
              <v-list-item-subtitle>{{data.email}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                @click="dialog = false"
              >
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider class="ma-3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              담당 역할
            </v-col>
            <v-col cols="9">
              {{data.role[0]}}
              <br> {{data.role[1]}}
              <br> {{data.role[2]}}
              <br> {{data.role[3]}}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      overlay: false,
      dialog: false,
      model: null,
      members: [
        { crown: '../crown.png',
          name: '길효민', 
          email: 'bigjoy22@naver.com', 
          role: ['WEB 백엔드 개발','WEB 취약점 진단', '클라우드 취약점 진단', '시큐어 코딩'], 
          src: "../효민.jpg" },
        { name: '이지호', 
          email: 'leejeeho6661@naver.com', 
          role: ['클라우드 API 개발', 'WEB 취약점 진단', '클라우드 취약점 진단', '시큐어 코딩'], 
          src: "../지호.jpg" },
        { name: '이지선', 
          email: 'wia_hawm@naver.com', 
          role: ['WEB 프론트 엔드 개발', 'WEB 취약점 진단', '클라우드 취약점 진단', '시큐어 코딩'], 
          src: "../지선.jpg" },
        { name: '박진환', 
          email: 'zkzlaptb@naver.com', 
          role: ['클라우드 API 개발', 'WEB 취약점 진단', '클라우드 취약점 진단', '시큐어 코딩'], 
          src: "../진환.jpg" },
        { name: '김경한', 
          email: 'jobapplication010@gmail.com', 
          role: ['클라우드 구축', '웹 취약점 진단', '클라우드 취약점 진단', '클라우드 취약점 조치'], 
          src: "../경한.png" },
      ],
      colors: [
        'primary',
        'green',
        'yellow darken-2',
      ],
      slides: [
        'WELCOME TO DEVSEC MALL',
        'SK_DEVSEC',
        'Development + Security',
      ],
      data:[],
    }),
    mounted(){
      this.data = this.members[0];
    },
    methods: {
      getImage() {
        const min = 550;
        const max = 560;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      itemclick(pcode) {
        this.$router.push('/item/detail/' + pcode);
      },
      open_info(datas) {
        this.dialog = true;
        this.data = datas;
      },
      result1_move(){
        window.open('/result1');
      },
      result2_move(){
        window.open('/result2');
      }
    },
  }
</script>