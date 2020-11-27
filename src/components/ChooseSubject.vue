<template>
  <div id="dashboard">
    <!-- <h1>DASHBOARD</h1> -->
    <div class="flex-container">
      <div v-for="sub in allSubjects" class="flex-box">
        <router-link
          :to="{ name: 'subject', params: { subject: sub } }"
        >
          <p class="cardTitle">{{ sub.toUpperCase() }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import firebase from "firebase";

Vue.use(Buefy);

import { studentsDb } from "./firebaseInit";

import Navbar from "./Navbar.vue";

export default {
  name: "TeacherDashboard",
  components: {
    Navbar
  },
  data() {
    return {
      currentUser: null,
      allSubjects: [
        "Innovation",
        "English",
        "Work Ready",
        "Science",
        "Chemistry",
        "Physics",
        "Biology",
        "STEM",
        "Mathematics",
        "Kaupapa Māori",
        "Te Reo Māori",
        "MPA",
        "Physical Education",
        "Physical Education & Health",
        "Project Based Learning",
        "Dance",
        "Financial Literacy"
      ]
    };
  },
  methods: {},
  mounted() {
    this.$set(this, "currentUser", firebase.auth().currentUser);
    // eslint-disable-next-line
    console.log("user is:", firebase.auth().currentUser.displayName);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#dashboard {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.flex-box {
  /* width: 25%; */
  /* height: 150px; */
  padding: 20px;
  margin: 25px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  transition: all 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardTitle {
  /* margin-top: 40px; */
  font-size: 1.6rem;
  font-weight: 600;
}

.flex-box:hover {
  box-shadow: 2px 3px 3px 3px lightgrey;
}

.cardImage {
  width: 100%;
  object-fit: cover;
}
</style>
