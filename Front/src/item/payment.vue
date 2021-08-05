<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">결제하기</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">결제 정보 입력</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="6">
                                <v-select
                                :items="items"
                                v-model="value"
                                label="충전금액*"
                                required
                                ></v-select>
                            </v-col>
                            </v-row>
                        </v-container>
                    <small>결제는 카카오페이로 진행됩니다</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="pay">결제</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Payment',
    data: () => ({
      dialog: false,
      items: [5000, 10000, 20000],
      value:''
    }),
    methods:{
        pay(){
            //let baseUrl = "http://127.0.0.1:8000/"
            let form = new FormData()
            form.append('amount', this.value)
            axios.post("SkdevsecOrderuser/kakaopay", form)
        }
    }
}
</script>