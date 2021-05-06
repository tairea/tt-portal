<template>
  <div class="commentContainer">
    <div v-for="comment in subjectComments" :key="comment.id">
      <div>

        <div
          v-if="filterSubjectStandards(comment.subject).length !== 0"
          class="card-content contentStandards"
        >

        <h2 class="student-name">{{ student.given_name }}</h2>

        <v-row no-gutters>

            <!-- Profile Pic -->
            <v-col cols="1" class="justify-center align-center">
                <img
                  id="profile-pic"
                  v-bind:src="taiohiPic"
                />
                <p class="nsn">{{student.nsn}}</p>
            </v-col>

            <v-col class="table justify-center align-center" cols="4">
              <table>
                <!-- credit table titles -->
                <thead>
                  <tr>
                    <th class="numCellWidth">Std Number</th>
                    <th>Standard Name</th>
                    <th class="creditCellWidth">Credits</th>
                    <th class="has-text-right">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="subjectTable"
                    v-for="subjectStandards in filterSubjectStandards(
                      comment.subject
                    )"
                    :key="subjectStandards.assessmentNum"
                  >
                    <!-- Assessment number -->
                    <td class="numCell has-text-left numCellWidth">
                      {{ subjectStandards.assessmentNum.toUpperCase() }}
                    </td>

                    <!-- Assessment Name -->
                    <td class="nameCell has-text-left nameCellWidth">
                      {{ subjectStandards.assessmentName }}
                    </td>

                    <!-- Assessment Credits -->
                    <td class="creditCell has-text-centered creditCellWidth">
                      <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                      <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                      {{ subjectStandards.assessmentCredits }}
                    </td>

                    <!-- Assessment Status -->
                    <td class="statusCell has-text-right statusCellWidth">
                      <span
                        v-bind:class="subjectStandards.completed"
                        class="accordionIcon tag is-normal"
                        >{{ subjectStandards.completed }}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-col>

            <!-- Pie Chart.js -->
            <v-col class="pie justify-center align-center" cols="2">
              <SubjectPiechart :student="student" :subject="comment.subject" />
            </v-col>

            <v-col cols="5" class="justify-center align-center">
              <div class="reports">{{comment.reportComment}}</div>
            </v-col>

          </v-row>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { db, storage } from "./firebaseInit";
import Chart from "chart.js";
import "chartjs-plugin-labels";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import SubjectPiechart from "./SubjectPiechart.vue";

export default {
  name: "SubjectIndividual",
  components: {
    SubjectPiechart
  },
  props: ["student", "subjectComments", "standards"],
  data() {
    return {
      // standards: [],
      // reportComments: [],
      // standardsRuakura: [],
      // reportCommentsRuakura: [],
      taiohiPic: "",
    };
  },
  firestore: {},
  mounted() {
    // this.$bind(
    //   "standards",
    //   db.collection(`/students/${this.student.id}/openCredits`)
    // );
    // this.$bind(
    //   "reportComments",
    //   db.collection(`/students/${this.student.id}/reportComments`)
    // );
    this.getPicLink();
  },
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
    filterSubjectStandards: function(subjectName) {
      var subStandards = this.standards.filter(sub => {
        return sub.subject == subjectName;
      });
      //order the standards by this custom order
      var completedOrder = [
        "Not Submitted",
        "Not Achieved",
        "Achieved",
        "Merit",
        "Excellence",
        "Current",
        "Upcoming"
      ];
      return subStandards.sort(function(a, b) {
        if (a.completed == b.completed) return a.completed - b.completed;
        return (
          completedOrder.indexOf(a.completed) -
          completedOrder.indexOf(b.completed)
        );
      });
    },
    filterSubjectStandardsRuakura: function(subjectName) {
      var subStandards = this.standardsRuakura.filter(sub => {
        return sub.subject == subjectName;
      });
      //order the standards by this custom order
      var completedOrder = [
        "In Moderation",
        "Achieved",
        "Merit",
        "Excellence",
        "Current",
        "Upcoming",
        "External",
        "Not Submitted",
        "Not Achieved"
      ];
      return subStandards.sort(function(a, b) {
        if (a.completed == b.completed) return a.completed - b.completed;
        return (
          completedOrder.indexOf(a.completed) -
          completedOrder.indexOf(b.completed)
        );
      });
    },
    formatTeacherName: function(name) {
      //format from 'Pa Ian' to 'ian'
      var splitName = name.split(" ")[0].toLowerCase();
      if (splitName == "pa" || splitName == "pā" || splitName == "whaea") {
        splitName = name.split(" ")[1].toLowerCase();
      }
      return splitName;
    },
    formatTeacherNameRuakura: function(name) {
      //format from 'Pa Ian Tairea' to 'Pa Ian'
      var name = name.split(" ");
      return name[0] + " " + name[1];
    },
    getTeacherEmail(name) {
      switch (name) {
        case "Pa Ian":
          return "mailto: i.tairea@taiwananga.co.nz";
        case "Pa Chris":
          return "mailto: c.morgan@taiwananga.co.nz";
        case "Pa Tipene":
          return "mailto: t.waihi@taiwananga.co.nz";
        case "Pa Wiremu":
          return "mailto: w.paniora@taiwananga.co.nz";
        case "Whaea Hayley":
          return "mailto: h.childs@taiwananga.co.nz";
        case "Whaea Nicola":
          return "mailto: n.reid@taiwananga.co.nz";
        case "Whaea Lysh":
          return "mailto: a.walker@taiwananga.co.nz";
        case "Whaea Te Ana":
          return "mailto: teana.waihi@taiwananga.co.nz";
        default:
          return "";
      }
    },
    getReportComment(subj) {
      var subjectComment = this.reportComments.filter(sub => {
        console.log("sub:", sub);
        return sub.id == subj;
      });
      console.log("subject comment:", subjectComment);
      return subjectComment[0].reportComment;
    },
    formatStudentName: function(name) {
      var name = name.replace(/\s/g, "");
      return name.toLowerCase();
    }
  }
};
</script>

<style scoped lang="scss">

.commentContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

table {
  margin: auto !important;
  table-layout: fixed;
}

th {
  /* text-align: center !important; */
  font-size: 0.6rem;
}

.numCellWidth {
  width: 20% !important;
}
.nameCellWidth {
  width: 70% !important;
}
.creditCellWidth {
  width: 5% !important;
}
.statusCellWidth {
  width: 5% !important;
}

.card {
  width: 100%;
  font-size: 0.65rem;
  margin: 10px 0px;
}

.reports {
  margin: 20px;
  text-align: justify;
  font-size: 12px;
}

.media {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.card-header {
  height: 50px;
  /* background: #d8d8d8; */
  background: #ada996; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #eaeaea,
    #dbdbdb,
    #f2f2f2,
    #ada996
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #eaeaea,
    #dbdbdb,
    #f2f2f2,
    #ada996
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.teacher {
  font-size: 0.9rem;
  /* color: white; */
}

.role {
  font-size: 1.2rem;
  /* color: white; */
}

.kaitiaki-pic {
  border-radius: 50%;
  object-fit: cover;
}

.content5050 {
  display: flex;
  margin-bottom: 10px;
  width: 50%;
}

.col25 {
  width: 25%;
}

.col50 {
  width:50%;
}

.table {
  width: 70%;
  margin: 0 auto;
}

table {
  width: 85%;
}

.pie {
  display: flex;
  align-items: center;
}

.contentStandards {
  margin: 0;
  padding: 0;
}

.subjectTable {
  font-size: 0.7rem;
}

.numCell,
.creditCell {
  font-size: 0.5rem;
}

.creditCell {
  text-align: center;
}

.nameCell {
  font-size: 0.6rem;
}

.is-normal {
  font-size: 0.5rem !important;
}

.Upcoming {
  background-color: lightgrey;
  color: #333;
  font-size: 0.5rem !important;
}

.External {
  background-color: #0e78be;
  color: white;
  font-size: 0.5rem !important;
}

.Current {
  background-color: #ffdc57;
  font-size: 0.5rem !important;
}

.Moderation {
  background-color: #ffce0a;
  font-size: 0.5rem !important;
}

.Progressing.Towards.Achieved, .Not.Submitted {
  background-color: grey;
  color: white;
  font-size: 0.5rem !important;
}

.Achieved {
  background-color: #23d160;
  color: white;
  font-size: 0.5rem !important;
}

.Merit {
  background-color: #209cee;
  color: white;
  font-size: 0.5rem !important;
}

.Excellence {
  background-color: #7957d5;
  color: white;
  font-size: 0.5rem !important;
}

.Not {
  background-color: #ff3860;
  color: white;
  font-size: 0.5rem !important;
}

#profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #777777;
}

.student-name {
  font-weight: 600;
  margin-top: 25px;
  margin-bottom: 10px;
}

.nsn {
  font-size: 9px;
}
</style>
