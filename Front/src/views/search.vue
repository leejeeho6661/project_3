<template>
  <v-container>
    <h1 class="text-center ma-5">검색 결과 페이지</h1>
    <v-text-field
      v-model="message"
      label="Regular"
      clearable
    ></v-text-field>
    <v-btn @click="encrypted()">
      암호화
    </v-btn>
    <v-btn @click="decrypted()">
      복호화
    </v-btn>
    <h1>
      남은 시간 {{resTimeData}}
    </h1>
    <v-btn
      v-if="isRunning"
      @click="timeReset()"
    >
      인증번호재전송
    </v-btn>
    <v-btn
      @click="start()"
      v-else
    >
      인증번호전송
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    message: '',
    encryptedText: '',
    decryptedText: [],
    aesKey : '00000000@fsadqega#fkdlsaiqu1235', // 32자리 키
    timeCounter: 10, // 2분
    resTimeData: '',
    isRunning: false,
  }),
  methods: {
    encrypted() {
      var params = [
        {
          uid : this.message
        },
        {
          uid : 'hyomin2'
        },
        {
          uid : 'hyomin3'
        },
      ];
      // var params2 = new URLSearchParams();
      // params2.append('uid', this.message);
      // this.encryptedText = this.CryptoJS.AES.encrypt(JSON.stringify(params), this.aesKey).toString();
      var data = {
        encry_str : params,
        encry_key : '00000000@fsadqega#fkdlsaiqu1235'
      }
      this.$store.commit('set_encry_json', data);
      console.log(this.$store.getters.get_encry_text);
    },
    decrypted() {
      // var bytes = this.CryptoJS.AES.decrypt(this.encryptedText, this.aesKey);
      // var dedate = JSON.parse(bytes.toString(this.CryptoJS.enc.Utf8));
      var data = {
        encry_str : 'Watds0AnCjC92kIspeyfQTi2XYu4XeM1Qr0zkRVnuvc=',
        encry_key : '00000000@fsadqega#fkdlsaiqu1235'
      }
      this.$store.commit('set_decry_str', data);
      console.log(this.$store.getters.get_decry_str);
    },
    start() {
      // 1초에 한번씩 start 호출 
      this.isRunning = true;
      this.polling = setInterval( () =>{ 
        this.timeCounter--
        this.resTimeData = this.prettyTime()
        if (this.timeCounter <= 0) this.timeStop() 
      },1000) 
    }, 
    // 시간 형식으로 변환 리턴 
    prettyTime() { 
      let time = this.timeCounter / 60 
      let minutes = parseInt(time) 
      let secondes = Math.round((time - minutes) * 60) 
      return this.pad(minutes, 2) + ":" + this.pad(secondes, 2) 
    }, 
    // 2자리수로 만들어줌 09,08... 
    pad(n, width) { 
      n = n + ''; 
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n 
    }, 
    timeStop() { 
      clearInterval(this.polling) 
    }, 
    // 재발행 
    timeReset() { 
      clearInterval(this.polling) 
      this.timeCounter = 10 
      this.start() 
    }, 
  },
  beforeDestroy() { 
    clearInterval(this.polling) 
  }
}
</script>