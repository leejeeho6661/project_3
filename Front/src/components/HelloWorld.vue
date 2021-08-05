<template>
  <v-card
    flat
    tile
  >
    <v-carousel
      cycle
      height="400"
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-container
      v-for="type in types"
      :key="type"
      class="grey lighten-4"
      fluid
    >
      <v-subheader>{{ type }}</v-subheader>

      <v-slide-group
        class="my-4 d-none d-sm-flex"
        show-arrows
      >
        <v-slide-item
          v-for="card in cards"
          :key="card"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="ma-3">
            <v-img
              :src="`https://picsum.photos/200/300?image=${getImage()}`"
              class="white--text align-end"
              height="200px"
            >
              <v-card-title
                class="headline white--text pl-4 pt-4 d-inline-block"
                v-text="card.title"
              ></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
      types: ['WEEKLY BEST', 'NEW ARRIVALS'],
      cards: [
        { title: 'item 1'},
        { title: 'item 2'},
        { title: 'item 3'},
        { title: 'item 4'},
        { title: 'item 5'},
        { title: 'item 6'},

      ],
      colors: [
        'primary',
        'green',
        'yellow darken-2',
        'orange',
      ],
      slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
        ],
    }),

    methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      },
    },
  }
</script>