<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-card flat>
        <h1 class="d-flex justify-center align-center">결제 실패</h1>
        <br>
        <v-card-actions>
          <v-btn
            dark
            outlined
            color="#F29F8F"
            height="50"
            width="200"
            @click="submit()"
            large
          >
            메인으로 돌아가기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderResult",
  methods: {
    submit() {
      location.href="/"
    }
  }
}
</script>