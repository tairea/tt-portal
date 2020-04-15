<template>
  <div id="dashboard">
    <div v-for="student in students" :key="student.nsn">
      <!-- PAGE 1 -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileDetails
          :student="student"
          :overview="true"
          :ruakura="true"
          :a4="true"
          class="margin-5"
        />
        <hr class="spacer100" />
        <ProfileITLP :student="student" :ruakura="true" />
        <hr class="spacer100" />
        <ProfileFitness :student="student" :ruakura="true" :a4="true" />
      </section>

      <!-- PAGE 2 -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsRuakura :student="student" :ruakura="true" />
      </section>

      <!-- PAGE 3 -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsRuakura :student="student" :ruakura="true" :secondPage="true" />
      </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import firebase from "firebase";

Vue.use(Buefy);

import { studentsDbRuakura } from "./firebaseInit";
import Navbar from "./Navbar.vue";
import ProfileDetails from "./ProfileDetails.vue";
import ProfileITLP from "./ProfileITLP.vue";
import ProfileFitness from "./ProfileFitness.vue";
import ProfileCurrentWork from "./ProfileCurrentWork.vue";
import ProfileOverviewWork from "./ProfileOverviewWork.vue";
import SubjectComments from "./SubjectComments.vue";
import ProfileCommentsRuakura from "./ProfileCommentsRuakura.vue";

export default {
  name: "DashboardA4Ruakura",
  components: {
    Navbar,
    ProfileDetails,
    ProfileITLP,
    ProfileFitness,
    ProfileCurrentWork,
    ProfileOverviewWork,
    SubjectComments,
    ProfileCommentsRuakura
  },
  data() {
    return {
      currentUser: null,
      students: [],
      // student: null,
      loadedStudents: false,
      image: require("@/assets/tohuLight.svg")
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("signed out");
          this.$router.go({ path: this.$router.path });
        });
    },
    getYearGroup(yearlevel) {
      const yearGroup = this.students.filter(
        student => student.school_year == yearlevel
      );
      return yearGroup;
    }
  },
  watch: {
    currentUser(user) {
      this.$bind(
        "students",
        // studentsDbRuakura.where("email", "array-contains", user.email)
        studentsDbRuakura.orderBy("school_year") //LOADS ALL STUDENTS
      );
    },
    students(students) {
      this.$set(this, "loadedStudents", true);
    }
  },
  mounted() {
    this.$set(this, "currentUser", firebase.auth().currentUser);
    // eslint-disable-next-line
    console.log("user is:", firebase.auth().currentUser.displayName);
  }
};
</script>

<style>
@page {
  size: A4;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.margin-5 {
  margin: 5px 0px;
}
.margin-20 {
  margin: 20px 0px;
}

.flexCenter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

hr {
  margin: 50px 0px;
}

.filterBoxes {
  margin: 25px;
  display: flex;
}

.filerCategories {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2em;
}

.flexbox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.flexitem {
  width: 25%;
}

.spacer100 {
  margin: 50px 0;
}

@media (max-width: 599px) {
  .flexitem {
    width: 100%;
  }
}
</style>


