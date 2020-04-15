<template>
  <div class="columns is-mobile" :class="{darkGreyBg: a4}">
    <div v-if="overview" class="column">
      <div class="column">
        <!-- <img
          v-if="ruakura"
          id="profile-pic"
          v-bind:src="require('@/assets/student_photos/ruakura/' + formatStudentName(student.given_name) + '.png')"
        /> -->
        <img
          id="profile-pic"
          v-bind:src="require('@/assets/student_photos/' + formatStudentName(student.given_name) + '.png')"
        />
      </div>
      <div class="column is-full">
        <!-- NAME -->
        <p
          :class="{title: a4}"
          style="font-weight: bold"
        >
        {{student.given_name}} {{student.family_name}}
        <!-- {{student.given_name}} -->
      </p>
        <!-- SCHOOL YEAR -->
        <p :class="{subtitle: a4}">Year {{student.school_year}}</p>

        <!-- <h2
          v-if="student.school_year >= 11 && overview && ruakura"
          class="creditTotal"
        >{{getTotalRuakura()}}</h2> -->

        <h2
          v-if="student.school_year >= 11 && overview && student.creditTotal !== null && student.creditTotal > 0"
          class="creditTotal"
        >{{student.creditTotal}}</h2>

        <!-- <p class="iwi">{{student.iwi.join(', ')}}</p> -->
        <h2 v-if="a4 && student.school_year >= 11 && overview" class="credits">
          Total Credits
          <br />
          <br />
        </h2>
        <h2 v-if="a4" class="report">Term 2 Report 2019</h2>
      </div>
    </div>
    <div v-else class="columns is-mobile margin-5">
      <div class="column">
        <!-- <img
          v-if="ruakura"
          id="profile-pic"
          v-bind:src="require('@/assets/student_photos/ruakura/' + formatStudentName(student.given_name) + '.png')"
        /> -->
        <img
          id="profile-pic"
          v-bind:src="require('@/assets/student_photos/' + formatStudentName(student.given_name) + '.png')"
        />
      </div>
      <div class="column has-text-left-mobile">
        <p class="has-text-weight-semibold">{{student.given_name}} {{student.family_name}}</p>
        <p>Year {{student.school_year}}</p>
        <!-- <h2 v-if="student.school_year >= 11" class="creditTotal">{{getTotal()}}</h2> -->
        <!-- <p class="iwi">{{student.iwi.join(', ')}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { db } from "./firebaseInit";

Vue.use(Buefy);

export default {
  name: "ProfileDetails",
  props: ["student", "overview", "a4", "ruakura"],
  data() {
    return {
      standards: [],
      standardsRuakura: []
    };
  },
  mounted() {
    // get standards from firebase
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2020`)
    );
    this.$bind(
      "standardsRuakura",
      db.collection(`/studentsRuakura/${this.student.id}/openCredits2020`)
    );
  },
  methods: {
    getTotal() {
      //=== achieved credits
      const achievedCredits = this.standards.filter(
        stnd => stnd.completed == "Achieved"
      );
      const achievedTotal = achievedCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("achieved credits:", achievedTotal);
      //=== merit credits
      const meritCredits = this.standards.filter(
        stnd => stnd.completed == "Merit"
      );
      const meritTotal = meritCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("merit credits:", meritTotal);
      //=== excellence credits
      const excellenceCredits = this.standards.filter(
        stnd => stnd.completed == "Excellence"
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
        stnd => stnd.completed == "Achieved"
      );
      const achievedTotal = achievedCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("achieved credits:", achievedTotal);

      //=== merit credits
      const meritCredits = this.standardsRuakura.filter(
        stnd => stnd.completed == "Merit"
      );
      const meritTotal = meritCredits.reduce(
        (prev /* number */, curr /* standard */) =>
          prev + curr.assessmentCredits,
        0
      );
      // console.log("merit credits:", meritTotal);

      //=== excellence credits
      const excellenceCredits = this.standardsRuakura.filter(
        stnd => stnd.completed == "Excellence"
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
    }
  }
};
</script>

<style scoped>
.darkGreyBg {
  background-color: #393e46;
  width: 100%;
  margin: 0;
  padding: 0;
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
}
.creditTotal {
  font-size: 1.5em;
  background-color: #23d160;
  color: white;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
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
