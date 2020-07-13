  <template>
  <div class="columns is-mobile">
    <div v-if="!overview" class="column">
      <h2 class="title is-6 has-text-centered">ITLP - CAREER ASPIRATIONS</h2>
      <div class="careerFlex">
        <div class="careerItem" v-for="career in itlpData" :key="career.id">
          <br />
          {{career}}
        </div>
      </div>
    </div>
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
    var filteredItlp = this.student.itlp.filter(function(el) {
      return el != "";
    });
    this.itlpData = filteredItlp;
  },
  methods: {
    getIcon(career) {
      var OAuth = require("oauth");
      // `npm install oauth` to satisfy
      // website: https://github.com/ciaranj/node-oauth

      var KEY = "24b258f5548c4fb6a9de4d3da8843bb0";
      var SECRET = "9dbea31d6d5049b0af03e063ce1d6603";

      var oauth = new OAuth.OAuth(
        "http://api.thenounproject.com",
        "http://api.thenounproject.com",
        KEY,
        SECRET,
        "1.0",
        null,
        "HMAC-SHA1"
      );
      oauth.get("http://api.thenounproject.com/icon/6324", null, null, function(
        e,
        data,
        res
      ) {
        if (e) console.error("error:", e);
        // console.log(require("util").inspect(data));
        // console.log("data:", data);
      });

      // var url = "http://api.thenounproject.com/icon/" + career;

      // request.get(
      //   {
      //     url: url,
      //     oauth: oauth,
      //     mode: "no-cors",
      //     json: true,
      //     qs: qs
      //   },
      //   function(err, response, body) {
      //     if (err) {
      //       console.log("error:", err);
      //     } else if (response.statusCode !== 200) {
      //       console.log(response.statusCode + " HTTP response code");
      //     } else {
      //       console.log("api body:");
      //       console.log(JSON.parse(body));
      //     }
      //   }
      // );
    }
  }
};
</script>

  <style scoped>
.careerFlex {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.careerItem {
  flex: auto;
}
</style>
