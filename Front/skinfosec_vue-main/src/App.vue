<template>
  <v-app>
    <v-app-bar
      color="#253F58"
      dark
      max-height="115"
      flat
    >
      <v-app-bar-nav-icon v-if="adminstate & loginstate"
      @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title @click='main_move()' style="cursor:pointer">7조 프로젝트</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        v-if="!loginstate"
        plain
        to="/user/signup"
      >
        SIGNUP
      </v-btn>
      <v-btn
        v-if="!loginstate"
        plain
        to="/user/login"
      >
        LOGIN
      </v-btn>
      <v-btn
        v-if="loginstate"
        plain
        @click='userLogout()'
      >
        LOGOUT
      </v-btn>
      <v-btn
        v-if="loginstate"
        plain
        to="/user/mypage"
        class="ma-2"
      >
        MYPAGE
      </v-btn>
      <v-badge
        v-if="loginstate"
        :content="bag_cnt"
        :value="bag_cnt"
        color="green"
        overlap
        offset-x="15"
        offset-y="15"
      >
        <v-btn
          icon
          to="/item/cart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>

      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="#253F58"
              dark
            >SEARCH</v-toolbar>
            <v-card-text>
              <v-form>
                <v-row align="center" justify="center">
                  <v-col cols="10">
                    <v-text-field
                      required
                      v-model="search"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="searchBtn"
              >Search</v-btn>
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      
      <template v-slot:extension>
        <v-tabs align-with-title fixed>
          <v-tab @click="move_item()">ITEM</v-tab>
          <v-tab @click="move_board()">BOARD</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      
    >
      <v-list-item>
        <v-list-item-avatar color="#F29F8F">
          <span class="white--text headline">A</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">ADMIN</v-list-item-title>
        </v-list-item-content>
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in adminMenu"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="mt-5 pa-2">
        <v-btn block dark>
          Logout
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        dark
        width="100%"
        class="text-center"
        color="#253F58"
      >

        <v-card-text class="white--text">
          SK_DEVSEC
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          2021 — <strong>7조</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data: () => ({
    bag_cnt:0,
    drawer: null,
    tab: null,
    search: '',
    loginstate:false,
    adminstate:false,
    dialog:false,
    mini: true,
    cartCount:'10',
    adminMenu: [
      { title: 'Home', icon: 'mdi-home', link: '/' },
      { title: 'Users', icon: 'mdi-account-box-multiple', link: '/admin/user' },
      { title: 'Items', icon: 'mdi-view-dashboard', link: '/admin/item' },
      { title: 'Orders', icon: 'mdi-clipboard-text', link: '/admin/orderadmin' },
    ],
  }),
  created(){
    this.user_check();
    this.bag_count();
  },
  methods:{
    get_user(){
      console.log(this.$store.getters.get_nickname);
    },
    start_timer2(){
      this.$store.commit('timer_reset');
      this.$store.commit('start_timer');
    },
    start_timer(){
      console.log(this.$store.getters.get_count);
      console.log(this.$store.getters.get_outSesstion);
    },
    move_item(){
      this.$router.push('/item/itemlist');
    },
    move_board(){
      this.$router.push('/board/board');
    },
    bag_count(){
      var params = new URLSearchParams();
          params.append('unickname', this.$store.getters.get_nickname);
          axios.post("/SkdevsecBag/bag_count", params).then(response => {
              this.bag_cnt = response.data.bag_count;
          });
    },
    user_check(){
      if(this.$session.get('jwt') > 0){
        this.loginstate = true;
        var s2 = this.$store.getters.get_level;
        if(s2 < 1000 & s2 > 0){
          this.adminstate = false;
        }
        else if(s2 >= 1000){
          this.adminstate = true;
        }
      }
      else{
        this.loginstate = false;
        this.adminstate = false;
        this.$store.commit('set_nickname', '');
        this.$store.commit('set_level', 0);
      }
      // console.log('레벨 : ' + this.$store.getters.get_level);
      // console.log('닉네임 : ' + this.$store.getters.get_nickname);
      // console.log('쿠키 : ' + this.$cookie.get('memberNick'));
    },
    userLogout() {
      //this.$cookie.delete('memberNick');
      this.$session.destroy();
      this.$store.commit('set_nickname', '');
      this.$store.commit('set_level', 0);
      this.loginstate = false;
      this.adminstate = false;
      alert('로그아웃 성공');
      location.href = "/";
    },
    main_move(){
      location.href = "/";
    },
    searchBtn(){
      this.dialog=false
      location.href="/search"
    },
    item_move(){
      location.href = "/item/itemlist"
    },
    board_move(){
      location.href = "/board/board"
    },
  }
};
</script>
