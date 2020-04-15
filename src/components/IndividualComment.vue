<template>
    <div class="commentContainer">
      <div class="card" v-for="comment in reportComments" :key="comment.id">
        <!-- <div class="card-image"> -->
        <!-- <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>-->
        <!-- </div> -->
        <header class="card-header">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(comment.teacher) + '.jpg')"
                />
              </figure>
            </div>
            <div class="media-center">
              <p class="title role">{{comment.subject}}</p>
            </div>
            <div class="media-right">
              <p class="subtitle teacher">{{comment.teacher}}</p>
            </div>
          </div>
        </header>
        <div class="card-content">
          

          <div class="content reports">{{comment.reportComment}}</div>

          <div v-if="!fitness" class="card-content contentStandards">
            <div class="content content5050">
              <div class="table">
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
                      v-for="subjectStandards in filterSubjectStandards(comment.subject)"
                      :key="subjectStandards.assessmentNum"
                    >

                      <td class="numCell has-text-left numCellWidth">
                        {{subjectStandards.assessmentNum}}
                      </td>

                      <td class="nameCell has-text-left nameCellWidth">
                          {{subjectStandards.assessmentName}}
                      </td>

                      <td class="creditCell has-text-centered creditCellWidth">
                        <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                        <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                        {{subjectStandards.assessmentCredits}}
                      </td>

                      <td class="statusCell has-text-right statusCellWidth">
                        <span
                          v-bind:class="subjectStandards.completed"
                          class="accordionIcon tag is-normal"
                        >{{subjectStandards.completed}}</span>
                      </td>


                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pie">
                <!-- Pie Chart.js -->
                <SubjectPiechart :student="student" :subject="comment.subject" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from "vue";

import { db } from "./firebaseInit";
import Chart from "chart.js";
import "chartjs-plugin-labels";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import SubjectPiechart from "./SubjectPiechart.vue";

export default {
  name: "IndividualComment",
  components: {
    SubjectPiechart
  },
  props: ["student", "reportComments", "standards", "fitness"],
  data() {
    return {
      // standards: [],
      // reportComments: [],
      // standardsRuakura: [],
      // reportCommentsRuakura: [],
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
    // this.$bind(
    //   "standardsRuakura",
    //   db.collection(`/studentsRuakura/${this.student.id}/openCredits`)
    // );
    // this.$bind(
    //   "reportCommentsRuakura",
    //   db.collection(`/studentsRuakura/${this.student.id}/reportComments`)
    // );
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
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

.numCellWidth {width: 20% !important;}
.nameCellWidth {width: 70% !important;}
.creditCellWidth {width: 5% !important;}
.statusCellWidth {width: 5% !important;}

.card {
  width: 100%;
  font-size: 0.65rem;
  margin: 10px 0px;
}

.reports {
  margin-bottom: 20px;
  text-align: justify;
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
  background: #ADA996;  /* fallback for old browsers */
background: -webkit-linear-gradient(to left, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


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
}

.table {
  width: 70%;
  margin: 0;
}

table {
  width: 85%;
}

.pie {
  width: 30%;
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
  background-color: #209cee;
  color: white;
  font-size: 0.5rem !important;
}
.Current {
  background-color: #ffdc57;
  font-size: 0.5rem !important;
}
.Achieved,
.Merit,
.Excellence {
  background-color: #23d160;
  color: white;
  font-size: 0.5rem !important;
}
.Not {
  background-color: #ff3860;
  color: white;
  font-size: 0.5rem !important;
}
</style>
