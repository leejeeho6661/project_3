<template>
  <v-container>
    <h1 class="text-center ma-5" style="cursor:pointer" @click="item_list()">상품 관리</h1>
    
    <!-- 새 상품 등록 / 기존 상품 수정 Dialog -->
      <v-dialog
        v-model="dialog"
        max-width="600"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-row justify="end" class="mb-5 mr-5">
            <v-btn 
              v-bind="attrs"
              v-on="on"
              dark
              color="#7A96A2"
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              New Item
            </v-btn>
          </v-row>
        </template>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card ref="form">
            <v-toolbar
              color="#253F58"
              dark
              class="headline"
            >
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text class="my-3">
              <v-select
                v-model="editedItem.pcate"
                label="카테고리"
                :items="pcates"
                outlined
                required
                :rules="[
                  v => !!v || '카테고리를 선택 해주세요.'
                ]"
              ></v-select>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="editedItem.pname"
                    label="상품명"
                    outlined
                    required
                    :rules="[
                      v => !!v || '상품명을 입력 해주세요.',
                      v => !!v && v.length >= 2 || '상품명은 2자 이상입니다.',
                      v => !!v && v.length <= 50 || '상품명은 50자리가 넘을 수 없습니다.',
                      v => !/[@#$%^&*()_+|<>:{}=,/`;-]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="pb-0">
                  <v-btn
                    v-if="editedIndex == -1"
                    height="55"
                    color="#7A96A2"
                    dark
                    @click="itemname_check()"
                  >
                    상품 중복 확인
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.pprice"
                  label="가격 (원)"
                  outlined
                  required
                  :rules="[
                   v => !!v || '가격을 입력 해주세요.',
                   v => !!v && v.length >= 20 || '가격이 너무 높습니다.',
                   v => /^[0-9]*$/.test(v) || '가격은 숫자만 입력 가능합니다.',
                  ]"
                ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.pcount"
                  label="수량 (개)"
                  outlined
                  required
                  :rules="[
                   v => !!v || '수량을 입력 해주세요.',
                   v => !!v && v.length >= 10 || '수량이 너무 높습니다.',
                   v => /^[0-9]*$/.test(v) || '수량은 숫자만 입력 가능합니다.',
                  ]"
                ></v-text-field>
                </v-col>
              </v-row>
                <v-textarea
                  v-model="editedItem.ptext"
                  label="상세 설명"
                  outlined
                  no-resize
                  required
                  :rules="[
                   v => !!v || '상세설명을 입력 해주세요.',
                   v => !!v && v.length >= 2 || '상세설명은 2자 이상입니다.',
                   v => !!v && v.length <= 1000 || '상세설명은 1000자리가 넘을 수 없습니다.',
                   v => !/[()|<>:{}/`;]/.test(v) || '허용되지 않은 특수문자가 있습니다.',
                  ]"
                ></v-textarea>

                <div
                class="d-flex justify-center align-center"
              >
                <v-img
                  class="ma-5"
                  max-height="400"
                  max-width="400"
                  :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/' + editedItem.pimage"
                ></v-img>
              </div>

                <input type="file" id="ex_file" ref='uploadImageFile' @change="onFileSelected()"
                 accept="image/*">
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="close()"
              >Cancel</v-btn>
              <v-btn
                text
                @click="save_if()"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

    <!-- 상품 목록 -->
    <v-data-table
      :headers="headers"
      :items="itemData"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :expanded.sync="expanded"
      show-expand
      item-key="pname"
      @page-count="len = $event"
      hide-default-footer
      class="elevation-1"
    >
      <!-- 상품 상세보기 -->
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <div class="d-flex align-center justify-center">
            <v-img
              max-height="500"
              max-width="500"
              class="ma-5"
              :src="'http://ec2-50-18-81-3.us-west-1.compute.amazonaws.com:8000/'+ item.pimage"
            ></v-img>
          </div>
          <div class="ma-5">
            {{ item.ptext }}
          </div>
        </td>
      </template>

      <!-- 상품 수정 / 삭제 버튼 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="cyan darken-1"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red accent-1"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- 상품 삭제 확인 Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500">
      <v-alert
        border="top"
        colored-border
        type="warning"
        prominent
        class="ma-0"
      >
        해당 상품을 삭제하시겠습니까?
        <v-row justify="end" class="mt-3">
          <v-btn
            color="blue darken-1"
            text
            @click="closeDelete()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteItemConfirm()"
          >
            OK
          </v-btn>
        </v-row>
        <v-spacer></v-spacer>
      </v-alert>
    </v-dialog>

    <!-- Paginatoin -->
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="len"
        circle
        color="#F29F8F"
      ></v-pagination>
    </div>

    <!-- 검색 -->
    <v-row
      justify="center"
      class="mx-auto mt-3"
    >
      <v-col cols="12" sm="3">
        <v-select
          v-model="select"
          :items="itemcate"
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
          @keyup.enter="search_product()"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          width="100"
          height="40"
          outlined
          dense
          @click="search_product()"
        >
          검색
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "Item",
  data: () => ({
    valid:true,
    dialog: false,
    dialogDelete: false,
    search_state:false,
    img_state:false,
    itemsPerPage: 10,
    item_name_state:false,
    page: 1,
    len: 0,
    files: [],
    expanded: [],
    itemData:[],
    uploadImageFile:'',
    search: '',
    select: 0,
    itemcate: [
      { name: '전체', id: 0 },
      { name: '상품명', id: 1 },
      { name: '카테고리', id: 2 },
    ],
    headers: [
      { text: '번호', value: 'pid' },
      { text: '카테고리', value: 'pcate' },
      { text: '상품명', value: 'pname' },
      { text: '가격', value: 'pprice' },
      { text: '수량', value: 'pcount' },
      { text: '등록날짜', value: 'pcreate_date' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' },
    ],
    editedIndex: -1,
    editedItem: {
      pcate: "",
      pcount: 0,
      pcreate_date: "",
      pid: '',
      pimage: "",
      pname: "",
      pprice: 0,
      preview: 0,
      preview_avg: 0,
      ptext: "",
    },
    defaultItem: {
      pcate: "",
      pcount: 0,
      pcreate_date: "",
      pid: '',
      pimage: "",
      pname: "",
      pprice: 0,
      preview: 0,
      preview_avg: 0,
      ptext: "",
    },
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
    del_code:0,
  }),
  computed: {
    formTitle(){
      return this.editedIndex == -1 ? '상품 추가' : '상품 수정'
    },
  },
  mounted(){
    this.item_list();
  },
  methods: {
    save_if(){
      if(this.editedIndex == -1){
        this.save();
      }
      else if(this.editedIndex == 1){
        this.item_update();
      }
    },
    item_update(){
      const p = new FormData();
      p.append("pid", this.editedItem.pid);
      p.append("pname", this.editedItem.pname);
      p.append("pcate", this.editedItem.pcate);
      if(this.uploadImageFile == ''){
        p.append('pimage', this.editedItem.pimage);
      }
      else if(this.uploadImageFile != ''){
        p.append('pimage', this.uploadImageFile);
      }
      p.append("ptext", this.editedItem.ptext);
      p.append("pprice", Number(this.editedItem.pprice));
      p.append("pcreate_date", this.editedItem.pcreate_date);
      p.append("preview", this.editedItem.preview);
      p.append("preview_avg", this.editedItem.preview_avg);
      p.append("pcount", this.editedItem.pcount);
      axios.post('/SkdevsecProduct/change_product', p).then(response => {
        if(response.data == 1){
          alert('상품 수정 성공');
          this.close();
          this.item_list();
        }
        else{
          alert('수정 실패');
        }
      });
    },
    itemname_check(){
      var params = new URLSearchParams();
      params.append("pname", this.editedItem.pname);
      axios.post('/SkdevsecProduct/product_check', params).then(response => {
        if(response.data == 1){
          alert('사용가능한 상품 이름입니다.');
          this.item_name_state = true;
        }
        else{
          alert('이미 사용중인 상품 이름입니다.');
          this.item_name_state = false;
        }
      });
    },
    item_list(){
      this.search_state = false;
      this.search = '';
      var params = new URLSearchParams();
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/item_list', params).then(response => {
        this.boardlength(response.data[0].product_count);
        response.data.shift();
        this.itemData = response.data;
      });
    },
    search_product(){
      this.search_state = true;
      var params = new URLSearchParams();
      params.append("pcode", this.select);
      params.append('psearch', this.search);
      params.append('ppage', this.page);
      axios.post('/SkdevsecProduct/admin_product_search', params).then(response => {
        if(response.data == 0){
          alert('검색 결과가 없습니다.')
        }
        else{
          this.boardlength(response.data[response.data.length-1].product_count);
          response.data.pop();
          this.itemData = response.data;
        }
      });
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
    editItem(item){
      // this.editedIndex = this.items.indexOf(item)
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item){
      this.del_code = item.pid;
      this.dialogDelete = true;
    },
    deleteItemConfirm(){
      var params = new URLSearchParams();
      axios.post('/SkdevsecProduct/product_delete', params).then(response => {
        if(response.data == 1){
          alert('상품 삭제 성공');
        }
        else{
          alert('상품 삭제 실패');
        }
      });
      this.closeDelete();
      this.del_code = 0;
    },
    closeDelete(){
      this.dialogDelete = false;
      this.editedIndex = -1;
    },
    save(){
      if(this.item_name_state == true){
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
        p.append("pname", this.editedItem.pname);
        p.append("pcate", this.editedItem.pcate);
        p.append('pimage', this.uploadImageFile)
        p.append("ptext", this.editedItem.ptext);
        p.append("pprice", Number(this.editedItem.pprice));
        p.append("pcreate_date", udate);
        p.append("preview", 0);
        p.append("preview_avg", 0);
        p.append("pcount", this.editedItem.pcount);
        axios.post('/SkdevsecProduct/product_upload', p).then(response => {
          if(response.data == 1){
            alert('상품 추가 성공');
            this.close();
            this.item_list();
          }
          else{
            alert('상품 추가 실패');
          }
        });
      }
      else{
        alert('상품 이름 중복확인을 해주세요.');
      }
      
    },
    close(){
      this.dialog = false;
      this.uploadImageFile = '';
      this.item_name_state = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    onFileSelected(event){ 
        this.uploadImageFile = this.$refs.uploadImageFile.files[0]
    },
  },
  watch:{
    page(){
      if(this.search_state == false){
        this.item_list();
      }
      else if(this.search_state == true){
        this.search_product();
      }
    }
  }
}
</script>