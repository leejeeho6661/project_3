import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

// npm install crypto-js
var CryptoJS = require("crypto-js");

// aes 256
const nacl = require('tweetnacl');
const utils = require('tweetnacl-util');
const encodeBase64 = utils.encodeBase64;

var crypto = require('crypto');

Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: { // 공통 관리되는 상태값을 관리
        level:0,
        unickname:'',
        admin_state:false,
        login_state:false,
        login_date:'',
        encry_text:'',
        decry_data:[],
        decry_str:'',
        // timeCounter: null,
        // out_session:false,
    },
    getters: { // 공유되는 상태 값을 조회 로직을 관리
        get_level(state){
            return state.level;
        },
        get_nickname(state){
            return state.unickname;
        },
        get_adminstate(state){
            return state.admin_state;
        },
        get_loginstate(state){
            return state.login_state;
        },
        get_logindate(state){
            return state.login_date;
        },
        // 타이머 값 가져오기
        // get_count(state){
        //     return state.timeCounter;
        // },
        // get_outSesstion(state){
        //     return state.out_session;
        // },
        // get_encry_text(state){ // 암호화 된 문자열 값 반환
        //     return state.encry_text;
        // },
        // get_decry_json(state){ // 복호호 된 데이터json 값 반환
        //     return state.decry_data;
        // },
        // get_decry_str(state){ // 복호화 된 스트링 값 반환
        //     return state.decry_str;
        // },
    },
    mutations: { // 상태 값을 변경하는 로직을 관리
        set_level(state, payload){
            state.level = payload;
        },
        set_nickname(state, payload){
            state.unickname = payload;
        },
        set_adminstate(state, payload){
            state.admin_state = payload;
        },
        set_loginstate(state, payload){
            state.login_state = payload;
        },
        set_logindate(state, payload){
            state.login_date = payload;
        },
        // // string 암호화
        // set_encry_str(state, payload){
        //     state.encry_text = CryptoJS.AES.encrypt(payload, key_1).toString();
        // },
        // // string 복호화
        // set_decry_str(state, payload){
        //     var keys = CryptoJS.enc.Base64.parse(payload.encry_str).toString(CryptoJS.enc.Utf8)
        //     state.decry_str = CryptoJS.AES.decrypt(keys, payload.encry_key).toString(CryptoJS.enc.Utf8);
        // },
        // json 암호화
        // set_encry_json(state, payload){
        //     var encJson = CryptoJS.AES.encrypt(JSON.stringify(payload.encry_str), payload.encry_key).toString();
        //     state.encry_text = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
        // },
        // // json 복호화
        // set_decry_json(state, payload){
        //     var bytes = CryptoJS.AES.decrypt(payload, key_1);
        //     state.decry_data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // },
        // 타이머 시작
        // timer_reset(state){
        //     clearInterval(this.polling);
        //     state.out_session = false;
        //     state.timeCounter = 0;
        // },
        // start_timer(state){
        //     // 1초에 한번씩 start 호출 
        //     this.polling = setInterval( () =>{ 
        //     state.timeCounter++
        //       if (state.timeCounter >= 1200){
        //         clearInterval(this.polling);
        //         state.out_session = true;
        //       } 
        //     },1000)
        // },
    },
    actions: { 

    }
});