<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    @elDakh`s test-task
    </v-app-bar>

    <v-main>
      <v-card class="px-5">
        <v-card-title>
          npm packages search
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="packages"
          :search="search"
        >
        <template v-slot:item="row">
          <tr>
            <td>{{row.item.package.name}}</td>
            <td>{{row.item.package.version}}</td>
            <td>{{shortDesc(row.item.package.description, 108)}}</td>
            <td>
              <v-btn
                color="primary"
                dark
                @click.stop="dialog = true, setDialogData(row.item)"
              >
                Show more
              </v-btn>
            </td>
          </tr>
      </template>
        </v-data-table>
      </v-card>
    </v-main>
    <v-dialog
      v-model="dialog"
      max-width="512"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ dialogData.name }} @{{ dialogData.version }}
        </v-card-title>

        <v-card-text>
          <p class="mb-4">{{ dialogData.description }}</p>
          <div class="mb-5">
            <v-chip class="mr-1 mb-1" v-for="(keyword, index) in dialogData.keywords" :key="index">
              {{ keyword }}
            </v-chip>
          </div>
          <div class="mb-6">
            <h3>Links:</h3>
            <v-list-item class="px-0 mb-n3" v-for="(value, name) in dialogData.links" :key="value">
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <a :href="value" target="_blank">{{ value }}</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div>
            <h3>About author:</h3>
            <v-list-item class="px-0 mb-n3" v-for="(value, name) in dialogData.author" :key="value">
              <v-list-item-content>
                <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
                <v-list-item-title>{{ value }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer
      dark
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <a href="https://t.me/elDakh" target="_blank">Telegram Me (Liubomyr Dakh)</a> •
        <a href="https://github.com/crayfishstudio/test-task" target="_blank">Git link</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'App',

  components: {
  },

  data () {
    return {
      search: '',
      packages: [],
      dialog: false,
      dialogData: [],
      headers: [
        {
          text: 'Package name',
          sortable: false,
          value: 'package.name',
          divider: true,
          width: 24 + '%',
        },
        {
          text: 'version',
          sortable: false,
          value: 'package.version',
          divider: true,
          width: 8 + '%'
        },
        {
          text: 'descriprion',
          sortable: false,
          value: 'package.description',
          divider: true,
          width: 56 + '%'
        },
        {
          text: 'more info',
          sortable: false,
          width: 12 + '%',
          align: 'right'
        }
      ],
    }
  },
  methods: {
    searchPackages() {
      this.axios
      .get('https://registry.npmjs.org/-/v1/search?size=100&text=' + this.search)
      .then(response => (
        this.packages = response.data.objects
      ));
    },
    setDialogData(item) {
      this.dialogData = item.package;
    },
    shortDesc(desc, length) {
      return desc.length > length ? desc.substring(0, length) + "..." : desc;
    }
  },
  watch: {
    search() {
      this.searchPackages();
    }
  }
};
</script>
