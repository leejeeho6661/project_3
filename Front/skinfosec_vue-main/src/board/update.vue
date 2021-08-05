<template>
  <v-container>
    <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
          <v-card flat>
            <v-card-title class="justify-center">글 수정</v-card-title>
            <v-card-text>
              <v-autocomplete
                v-model="category"
                :items="categories"
                label="Category"
                required
              ></v-autocomplete>
              <v-text-field
                v-model="detail_data.btitle"
                label="Title"
                required
                :rules="[
                  v => !!v || '글 제목을 입력해주세요.',
                  v => !!v && v.length >= 2 || '글 제목은 2자 이상입니다.',
                  v => !!v && v.length <= 50 || '글 제목은 50자리가 넘을 수 없습니다.',
                  v => !/[@#$%^&*()_+|<>:{}=,/`;-]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                  ]"
              ></v-text-field>
              <v-textarea
                v-model="detail_data.btext"
                label="Content"
                required9
                no-resize
                :rules="[
                  v => !!v || '글 내용을 입력해주세요.',
                  v => !!v && v.length >= 2 || '글 제목은 2자 이상입니다.',
                  v => !!v && v.length <= 1000 || '글 내용은 1000자리가 넘을 수 없습니다.',
                  v => !/[()|<>:{}/`;]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                  ]"
              ></v-textarea>

              <div
                class="d-flex justify-center align-center"
              >
                <v-img
                  v-if="img_state"
                  class="ma-5"
                  max-height="500"
                  max-width="500"
                  :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/' + detail_data.bfile"
                ></v-img>
              </div>

              <form v-if="!img_state"> 
                <input type="file" id="ex_file" ref='uploadImageFile'
                  @change="onFileSelected()" accept="image/*"> 
              </form>

              <div class="d-flex justify-center ma-2">
                <v-btn outlined v-if="img_state" @click="img_del()">이미지 삭제</v-btn>
              </div>
            </v-card-text>
            <v-checkbox
              v-model="checkbox"
              label="비밀글"
              color="#F29F8F"
              hide-details
            ></v-checkbox>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
              <v-btn
                text
                to='/board/board/'
              >
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="update_board()"
              >
                수정완료
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Update',
  data: () => ({
    valid:true,
    categories: ['자유게시판', '질문게시판'],
    category: '',
    checkbox: false,
    img_state:false,
    detail_data : [],
    uploadImageFile:"",
  }),
  mounted () {
    this.bid = this.$route.params.bid;
    this.detailList();
  },
  methods: {
    update_board:function(){
      const p = new FormData();
      p.append("bid", this.$route.params.bid);
      p.append("btitle", this.detail_data.btitle);
      p.append("btext", this.detail_data.btext);
      if(this.uploadImageFile == '' & this.img_state == false){
        p.append("bfile", '0');
      }
      else if(this.uploadImageFile == '' & this.img_state == true){
        p.append('bfile', this.detail_data.bfile)
      }
      else if(this.uploadImageFile != ""){
        p.append('bfile', this.uploadImageFile)
      }
      p.append("bview", this.detail_data.bview);
      p.append("bcomment", this.detail_data.bcomment);
      p.append("unickname", this.detail_data.unickname);
      p.append("bcreate_date", this.detail_data.bcreate_date);
      if(this.category == '자유게시판'){
        p.append("bcate", '1');
      }
      else if(this.category == '질문게시판'){
        p.append("bcate", '2');
      }
      if(this.checkbox == false){
        p.append("b_lock", '0');
      }
      else if(this.checkbox == true){
        p.append("b_lock", '1');
      }
      axios.post('/SkdevsecBoard/change_board', p).then(response => {
        if(response.data == 1){
          alert('수정 성공');
          this.$router.push('/board/detail/' + this.$route.params.bid);
        }
        else{
          alert('수정 실패');
        }
      });
    },
    img_del(){
      var p = new URLSearchParams();
      p.append("bid", this.$route.params.bid);
      axios.post('/SkdevsecBoard/file_delete', p).then(response => {
        if(response.data == 1){
          this.img_state = false;
          this.detailList();
        }
        else{
          alert('에러');
        }
      });
    },
    detailList(){
      var params = {
        bid : this.$route.params.bid
      }
      axios.post('/SkdevsecBoard/board_inside', params).then(response =>{
        this.detail_data = response.data;
        if(this.detail_data.bcate == '1'){
          this.category = '자유게시판';
        }
        else if(this.detail_data.bcate == '2'){
          this.category = '질문게시판';
        }
        if(this.detail_data.b_lock == '0'){
          this.checkbox = false;
        }
        else if(this.detail_data.b_lock == '1'){
          this.checkbox = true;
        }
        if(this.detail_data.bfile == '0'){
          this.img_state = false;
        }
        else{
          this.img_state = true;
        }
      });
    },
    onFileSelected(event){ 
        this.uploadImageFile = this.$refs.uploadImageFile.files[0]
    },
    submit(){
      if(this.$refs.form.validate()){
        this.update_board();
      }
    },
  }
};
</script>