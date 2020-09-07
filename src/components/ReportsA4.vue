<template>
  <div id="dashboard">
    <div v-for="student in students" :key="student.nsn">
      <!-- PAGE 1: COVER -->
      <section
        class="sheet padding-10mm coverPage"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-295px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileDetailsV2 :student="student" :overview="true" :a4="true" class="margin-5" />
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
        <ProfileITLP :student="student" />
        <hr class="spacer100" />
        <ProfileFitness :student="student" :a4="true" />
      </section> -->

      <!-- PAGE 2: FITNESS & CONDITIONING -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-295px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <FitnessPage :student="student" :a4="true" />
      </section>

      <!-- PAGE 3: COMMENTS 1 -->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-295px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsV2 :student="student" :firstPage="true" />
      </section>

      <!-- PAGE 4: COMMENTS 2-->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-295px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsV2 :student="student" :secondPage="true" />
      </section>

      <!-- PAGE 5: COMMENTS 3-->
      <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-295px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsV2 :student="student" :thirdPage="true" />
      </section>

      <!-- PAGE 5: COMMENTS 4-->
      <!-- <section
        class="sheet padding-10mm"
        :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: '-380px 180px', backgroundRepeat: 'no-repeat'}"
      >
        <ProfileCommentsV2 :student="student" :fourthPage="true" />
      </section> -->


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
import ProfileCommentsRuakura from "./ProfileCommentsRuakura.vue";

export default {
  name: "ReportsA4",
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
    ProfileCommentsRuakura
  },
  data() {
    return {
      currentUser: null,
      students: [],
      // student: null,
      loadedStudents: false,
      // image: require("@/assets/tohuLight.svg")
      // image: require("@/assets/tohu-grey.svg")
      image: require("@/assets/tohu-mid-grey.svg")
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
        // studentsDb.where("school_year", ">=", 13 ) //LOAD SENIORS
        // studentsDb.where("school_year", "<", 11 ) //LOADS JUNIORS
        studentsDb.where("nsn", "==", 134316380 ) //LOAD by NSN
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


