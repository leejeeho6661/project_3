<template>
	<v-container class="fill-height">
    <v-row justify="center">
      <v-card flat class="text-center">
        <h1>
					페이지를 찾을 수 없습니다.
				</h1>
        <br>
        <v-card-actions class="justify-center">
          <v-btn
            dark
            color="#F29F8F"
            height="50"
            width="200"
            @click="back_router()"
            large
          >
            뒤로가기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
	name: 'PageNotFound',
	methods: {
		back_router(){
      this.$router.go(-1);
    },
	}
}
</script>