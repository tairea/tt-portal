<template>
  <div>
    <h2 class="title is-6 has-text-centered" v-if="!overview">KAITIAKI COMMENTS</h2>

    <!-- FIRST PAGE TUTOA -->
    <IndividualComment v-if="firstPage == true" :student="student" :reportComments="reportComments.slice(0,2)" :standards="standards" />

    <!-- SECOND PAGE TUTOA -->
    <IndividualComment v-else-if="secondPage == true" :student="student" :reportComments="reportComments.slice(2,4)" :standards="standards" />

    <!-- THIRD PAGE TUTOA -->
    <IndividualComment v-else-if="thirdPage == true" :student="student" :reportComments="reportComments.slice(4,6)" :standards="standards" />

    <!-- FOURTH PAGE TUTOA -->
    <IndividualComment v-else-if="thirdPage == true" :student="student" :reportComments="reportComments.slice(6,report.length)" :standards="standards" />
  </div>
</template>

<script>
import Vue from "vue";

import { db } from "./firebaseInit";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import IndividualComment from "./IndividualComment.vue";

export default {
  name: "ProfileCommentsV2",
  components: {
    IndividualComment
  },
  props: ["student", "overview", "a4", "firstPage", "secondPage", "thirdPage", "fourthPage", "ruakura"],
  data() {
    return {
      standards: [],
      reportComments: [],
      // standardsRuakura: [],
      // reportCommentsRuakura: [],
    };
  },
  firestore: {},
  mounted() {
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2020`)
    );
    this.$bind(
      "reportComments",
      db.collection(`/students/${this.student.id}/reportComments2020`)
    ).then(() => {
          for (var i = this.reportComments.length - 1; i >= 0; --i) {
          if (this.reportComments[i].id == "Fitness & Conditioning") {
              this.reportComments.splice(i,1);
          }
      }
    })

    // this.$bind(
    //   "standardsRuakura",
    //   db.collection(`/studentsRuakura/${this.student.id}/openCredits`)
    // );
    // this.$bind(
    //   "reportCommentsRuakura",
    //   db.collection(`/studentsRuakura/${this.student.id}/reportComments`)
    // );
  },

  methods: {}
};
</script>

<style scoped>

</style>
