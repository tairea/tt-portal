<template>
  <div id="dashboard">
    <div v-for="student in students" :key="student.nsn">
      <!-- PAGE 1: COVER -->
      <section
        class="sheet padding-10mm coverPage"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileDetailsV3JuniorITLP :student="student" :overview="true" :a4="true" class="margin-5" />
        <!-- <hr class="spacer100" />
        <hr class="spacer100" /> -->

      </section>

       <!-- OLD PAGE 1: COVER -->
      <!-- <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileDetails :student="student" :overview="true" :a4="true" class="margin-5" />
        <hr class="spacer100" />
        
        <hr class="spacer100" />
        <ProfileFitness :student="student" :a4="true" />
      </section> -->

      <!-- PAGE 2: FITNESS & CONDITIONING -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
      <KTKOKM :student="student" :a4="true"/>
        <!-- <FitnessPage :student="student" :a4="true" /> -->
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

import { studentsDb } from "./firebaseInit";
import Navbar from "./Navbar.vue";
import ProfileDetails from "./ProfileDetails.vue";
import ProfileDetailsV2 from "./ProfileDetailsV2.vue";
import ProfileITLP from "./ProfileITLP.vue";
import ProfileFitness from "./ProfileFitness.vue";
import FitnessPage from "./FitnessPage.vue";
import ProfileCurrentWork from "./ProfileCurrentWork.vue";
import ProfileOverviewWork from "./ProfileOverviewWork.vue";
import SubjectComments from "./SubjectComments.vue";
import ProfileComments from "./ProfileComments.vue";
import ProfileCommentsV2 from "./ProfileCommentsV2.vue";
import ProfileDetailsV3JuniorITLP from "./ProfileDetailsV3JuniorITLP.vue";
import ProfileCommentsRuakura from "./ProfileCommentsRuakura.vue";
import KTKOKM from "./KTKOKM.vue";

export default {
  name: "JuniorITLPA4",
  components: {
    Navbar,
    ProfileDetails,
    ProfileDetailsV2,
    ProfileITLP,
    ProfileFitness,
    FitnessPage,
    ProfileCurrentWork,
    ProfileOverviewWork,
    SubjectComments,
    ProfileComments,
    ProfileCommentsV2,
    ProfileDetailsV3JuniorITLP,
    ProfileCommentsRuakura,
    KTKOKM
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
        //  studentsDb.where("email", "array-contains", user.email)
        // studentsDb.orderBy("school_year") //LOADS ALL STUDENTS
        // studentsDb.where("school_year", ">=", 11 ) //LOAD SENIORS
        studentsDb.where("school_year", "<", 11 ) //LOADS JUNIORS
        // studentsDb.where("nsn", "==", 141857033 ) //LOAD by NSN
      );
    },
    students(students) {
      console.log("user has access to:", students);
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@900&display=swap');

@page {
  size: A4;
}

.coverPage {
  display: flex;
  align-items: center;
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


