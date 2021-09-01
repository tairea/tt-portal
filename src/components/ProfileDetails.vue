<template>
  <div class="columns is-mobile profileDetails mb-4" :class="{ darkGreyBg: true }">
    <div v-if="overview" class="column" style="z-index: 100;">
      <div class="column">
        <!-- PROFILE PIC -->
        <img id="profile-pic" :src="taiohiPic" />
      </div>
      <div class="px-0" style="color: white;">
        <!-- NAME -->
        <p :class="{ title: a4 }" style="font-weight: bold">
          {{ student.given_name }} {{ student.family_name }}
        </p>
        <!-- IWI -->
        <p v-for="iwi in student.iwi" class="iwi" :key="iwi.id">{{ iwi }}</p>
        <!-- SCHOOL YEAR -->
        <div class="column">
          <p :class="{ subtitle: a4 }" style="font-weight: bold">
            Year {{ student.school_year }}
          </p>
          <!-- NSN -->
          <p :class="{ subtitle: a4 }" style="font-size: 0.7rem">
            NSN {{ student.nsn }}
          </p>
        </div>
        <!-- ITLP -->
        <div class="column" v-if="student.itlp">
          <ProfileITLP :student="student" />
        </div>

        <div class="column" v-if="student.school_year >= 11" style="margin-top: 20px;">
          <h2 class="creditTotal"
        >
          {{ student.creditTotal }}
        </h2>
        <h2 class="credits">
          Total Credits
          <br />
          <br />
        </h2>
        </div>
        <!-- CREDITS -->
        <!-- <h2
          v-if="
            student.school_year >= 11 &&run 
              overview &&
              student.creditTotal !== null &&
              student.creditTotal > 0
          "
          class="creditTotal"
        >
          {{ student.creditTotal }}
        </h2>
        <h2 v-if="a4 && student.school_year >= 11 && overview" class="credits">
          Total Credits
          <br />
          <br />
        </h2> -->

        <!-- Report Name -->
        <h2 v-if="a4" class="report">Term 2 Report 2019</h2>
      </div>
    </div>
    <div v-else class="columns is-mobile margin-5">
      <div class="column">
        <img id="profile-pic" :src="taiohiPic" />
      </div>
      <div class="column has-text-left-mobile">
        <p class="has-text-weight-semibold">
          {{ student.given_name }} {{ student.family_name }}
        </p>
        <!-- <h2 v-if="student.school_year >= 11" class="creditTotal">{{getTotal()}}</h2> -->
        <p v-if="student.iwi.length > 0" class="iwi">
          {{ student.iwi.length > 1 ? student.iwi.join(", ") : student.iwi[0] }}
        </p>
        <p>Year {{ student.school_year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { db, storage } from "./firebaseInit";

import ProfileITLP from "./ProfileITLP.vue";

Vue.use(Buefy);

export default {
  name: "ProfileDetails",
  props: ["student", "overview", "a4", "ruakura"],
  components: {
    ProfileITLP,
  },
  data() {
    return {
      standards: [],
      standardsRuakura: [],
      taiohiPic: "",
      image: require("@/assets/tohuLight.svg"),
    };
  },
  mounted() {
    // get standards from firebase
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2021`)
    );
    this.getPicLink();
  },
  computed: {},
  methods: {
    async getPicLink() {
      console.log(
        "getting image for:",
        this.student.given_name,
        this.student.nsn
      );
      var picUrl = await storage
        .ref("taiohi2021/" + this.student.nsn + ".png")
        .getDownloadURL()
        .then(function(url) {
          console.log("got pic url:", url);
          return url;
        })
        .catch((err) => {
          console.log("error: " + err.message);
        });
      this.taiohiPic = picUrl;
    },
    getTotal() {
      //=== achieved credits
      const achievedCredits = this.standards.filter(
        (stnd) => stnd.completed == "Achieved"
      );
      const achievedTotal = achievedCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("achieved credits:", achievedTotal);
      //=== merit credits
      const meritCredits = this.standards.filter(
        (stnd) => stnd.completed == "Merit"
      );
      const meritTotal = meritCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("merit credits:", meritTotal);
      //=== excellence credits
      const excellenceCredits = this.standards.filter(
        (stnd) => stnd.completed == "Excellence"
      );
      const excellenceTotal = excellenceCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("excellence credits:", excellenceTotal);

      const completedTotal =
        Number(achievedTotal) + Number(meritTotal) + Number(excellenceTotal);

      return completedTotal;
    },
    getTotalRuakura() {
      //=== achieved credits
      const achievedCredits = this.standardsRuakura.filter(
        (stnd) => stnd.completed == "Achieved"
      );
      const achievedTotal = achievedCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("achieved credits:", achievedTotal);

      //=== merit credits
      const meritCredits = this.standardsRuakura.filter(
        (stnd) => stnd.completed == "Merit"
      );
      const meritTotal = meritCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("merit credits:", meritTotal);

      //=== excellence credits
      const excellenceCredits = this.standardsRuakura.filter(
        (stnd) => stnd.completed == "Excellence"
      );
      const excellenceTotal = excellenceCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("excellence credits:", excellenceTotal);

      const completedTotal =
        Number(achievedTotal) + Number(meritTotal) + Number(excellenceTotal);

      return completedTotal;
    },
    formatStudentName: function(name) {
      var name = name.replace(/\s/g, "");
      return name.toLowerCase();
    },
  },
};
</script>

<style scoped>
.darkGreyBg {
  background-color: #393e46;
  width: 100%;
  margin: 0;
  padding: 0;
}

.profileDetails {
  position: relative;
}

.profileDetails::before {
  content: "";
  background-image: url("~@/assets/tohuLight.svg");
  background-size: cover;
  position: absolute;
  width: 100vw;
  top: -75px;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  opacity: 0.1;
  transform: rotate(180deg);
}

.title,
.subtitle,
.report {
  color: white;
}

#profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #777777;
}

.iwi {
  font-size: 0.7rem;
}

.credits {
  margin: 5px 0 0 0;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
}
.creditTotal {
  font-size: 2em;
  background-color: #23d160;
  color: white;
  border-radius: 50%;
  text-align: center;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.columns {
  flex: auto;
}

@media (min-width: 1200px) {
}
</style>
