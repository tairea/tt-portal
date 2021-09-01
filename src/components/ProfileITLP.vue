  <template>
  <div class="columns is-mobile d-flex justify-center" style="justify-content: center; color:white;">
    <v-btn v-if="!overview" class="column" outlined color="#ffffff">
      <a :href="getItlp"><p class="title is-6 has-text-centered itlpLink">VIEW ITLP</p></a>
    </v-btn>
  </div>
</template>

  <script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { db } from "./firebaseInit";
import { firestorePlugin } from "vuefire";

Vue.use(Buefy);
Vue.use(firestorePlugin);

export default {
  name: "ProfileITLP",
  props: ["student", "overview", "a4"],
  data() {
    return {
      standards: [],
      itlpData: []
    };
  },
  firestore: {
    // itlpData: db.collection(`/students/${this.student.id}/itlp`)
  },
  mounted() {
    //remove empty itlp data
    // var filteredItlp = this.student.itlp.filter(function(el) {
    //   return el != "";
    // });
    // this.itlpData = filteredItlp;
  },
  computed: {
    getItlp() {
      return this.student.itlp.replace("edit", "present");
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>
.itlpLink {
  color: white;
  font-size: 11px;
}
</style>
