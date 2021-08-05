<template>
  <v-container>
    <h1 class="text-center ma-5">글쓰기</h1>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-card flat>
          <v-card-text>
            <v-autocomplete
              v-model="category"
              :items="categories"
              label="Category"
              required
              outlined
              :rules="[
                  v => !!v || '카테고리를 선택해주세요.'
              ]"
            ></v-autocomplete>
            <v-text-field
              v-model="title"
              label="Title"
              required
              outlined
              :rules="[
                  v => !!v || '글 제목을 입력해주세요.',
                  v => !!v && v.length >= 2 || '글 제목은 2자 이상입니다.',
                  v => !!v && v.length <= 50 || '글 제목은 50자리가 넘을 수 없습니다.',
                  v => !/[@#$%^&*()_+|<>:{}=,/`;-]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                  ]"
            ></v-text-field>
            <v-textarea
              v-model="content"
              label="Content"
              required
              outlined
              no-resize
              :rules="[
                  v => !!v || '글 내용을 입력해주세요.',
                  v => !!v && v.length >= 2 || '글 제목은 2자 이상입니다.',
                  v => !!v && v.length <= 1000 || '글 내용은 1000자리가 넘을 수 없습니다.',
                  v => !/[()|<>:{}/`;]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                  ]"
            ></v-textarea>

            <form> 
              <input type="file" id="ex_file" ref='uploadImageFile'
                @change="onFileSelected()" accept="image/*"> 
            </form>

            <v-checkbox
              v-model="checkbox"
              label="비밀글"
              color="#F29F8F"
              hide-details
            ></v-checkbox>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn text @click="$router.push('/board/board')">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="summit()"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Write',
  data: () => ({
    valid:true,
    categories: ['자유게시판', '질문게시판'],
    category: null,
    title: null,
    content: null,
    files: [],
    checkbox: false,
    bimage:"",
    uploadImageFile:"",
  }),
  methods: {
    summit(){
      if(this.$refs.form.validate()){
        this.addboard();
      }
    },
    onFileSelected(event){ 
        this.uploadImageFile = this.$refs.uploadImageFile.files[0]
    },
    onSave(){
            if(this.uploadImageFile != ""){
                const fd = new FormData(); //반드시 필요 
                fd.append('file_save_name', this.uploadImageFile); //4번 
                axios.post('/FileModel/file_upload',fd).then(response => {
                    console.log(response.data);
                });
            }
        },
    addboard: function(){
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
      const p = new FormData();
      p.append("btitle", this.title);
      p.append("btext", this.content);
      if(this.uploadImageFile == ''){
        p.append("bfile", '0');
      }
      else if(this.uploadImageFile != ""){
        p.append('bfile', this.uploadImageFile)
      }
      p.append("bview", 0);
      p.append("bcomment", 0);
      p.append("unickname", this.$store.getters.get_nickname);
      p.append("bcreate_date", udate);
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
      axios.post('/SkdevsecBoard/board_upload', p).then(response => {
        if(response.data == 1){
          alert('글 작성 성공');
          location.href = "/board/board"
        }
        else{
          alert('글 작성 실패');
        }
      });
    },
  }
};
</script>