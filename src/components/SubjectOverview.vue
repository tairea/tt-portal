<template>
  <div>
    
    <SubjectIndividual :student="student" :subjectComments="subjectComments" :standards="standards" />

  </div>
</template>

<script>
import Vue from "vue";

import { db } from "./firebaseInit";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import SubjectIndividual from "./SubjectIndividual.vue";

export default {
  name: "ProfileCommentsV2",
  components: {
    SubjectIndividual
  },
  props: ["student", "subject"],
  data() {
    return {
      standards: [],
      subjectComments: [],
    };
  },
  firestore: {},
  mounted() {
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2021`)
    );
    this.$bind(
      "subjectComments",
      db.collection(`/students/${this.student.id}/reportComments2021`).where("subject", "==", this.subject )
    ).then(() => {})
  },
  methods: {
   
  }
};
</script>

<style scoped>

</style>
