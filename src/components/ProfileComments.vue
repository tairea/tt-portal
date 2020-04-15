<template>
  <div>
    <h2 class="title is-6 has-text-centered" v-if="!overview">KAITIAKI COMMENTS</h2>

    <!-- SECOND PAGE RUAKURA -->
    <div v-if="secondPage == true && ruakura == true" class="commentContainer">
      <div
        class="card"
        v-for="comment in reportCommentsRuakura.slice(6, reportCommentsRuakura.length)"
        :key="comment.id"
      >
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/ruakura/' + formatTeacherName(comment.teacher) + '.png')"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title teacher">{{formatTeacherNameRuakura(comment.teacher)}}</p>
              <p class="subtitle role">{{comment.subject}}</p>
            </div>
          </div>

          <div class="content reports">{{comment.reportComment}}</div>
          <div class="card-content contentStandards">
            <div class="content">
              <table>
                <!-- <thead>
                  <tr>
                    <th class="numCellWidth">Std. #</th>
                    <th>Std. Name</th>
                    <th class="creditCellWidth">Creds.</th>
                    <th class="has-text-right">Status</th>
                  </tr>
                </thead>-->
                <tbody>
                  <tr
                    class="subjectTable"
                    v-for="subjectStandards in filterSubjectStandardsRuakura(comment.subject)"
                    :key="subjectStandards.assessmentNum"
                  >
                    <td class="numCell has-text-left">{{subjectStandards.assessmentNum}}</td>
                    <td class="nameCell has-text-left">{{subjectStandards.assessmentName}}</td>
                    <td class="creditCell has-text-right creditCellWidth">
                      <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                      <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                      {{subjectStandards.assessmentCredits}}
                    </td>
                    <td class="statusCell has-text-right">
                      <span
                        v-bind:class="subjectStandards.completed"
                        class="accordionIcon tag is-normal"
                      >{{subjectStandards.completed}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FIRST PAGE RUAKURA -->
    <div v-else-if="ruakura == true" class="commentContainer">
      <div class="card" v-for="comment in reportCommentsRuakura.slice(0, 6)" :key="comment.id">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/ruakura/' + formatTeacherName(comment.teacher) + '.png')"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title teacher">{{formatTeacherNameRuakura(comment.teacher)}}</p>
              <p class="subtitle role">{{comment.subject}}</p>
            </div>
          </div>

          <div class="content reports">{{comment.reportComment}}</div>
          <div class="card-content contentStandards">
            <div class="content">
              <table>
                <!-- <thead>
                  <tr>
                    <th class="numCellWidth">Std. #</th>
                    <th>Std. Name</th>
                    <th class="creditCellWidth">Creds.</th>
                    <th class="has-text-right">Status</th>
                  </tr>
                </thead>-->
                <tbody>
                  <tr
                    class="subjectTable"
                    v-for="subjectStandards in filterSubjectStandardsRuakura(comment.subject)"
                    :key="subjectStandards.assessmentNum"
                  >
                    <td class="numCell has-text-left">{{subjectStandards.assessmentNum}}</td>
                    <td class="nameCell has-text-left">{{subjectStandards.assessmentName}}</td>
                    <td class="creditCell has-text-right creditCellWidth">
                      <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                      <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                      {{subjectStandards.assessmentCredits}}
                    </td>
                    <td class="statusCell has-text-right">
                      <span
                        v-bind:class="subjectStandards.completed"
                        class="accordionIcon tag is-normal"
                      >{{subjectStandards.completed}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND PAGE TUTOA -->
    <div v-if="secondPage == true" class="commentContainer">
      <div
        class="card"
        v-for="comment in reportComments.slice(6, reportComments.length)"
        :key="comment.id"
      >
        <!-- <div class="card-image"> -->
        <!-- <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>-->
        <!-- </div> -->
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(comment.teacher) + '.jpg')"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title teacher">{{comment.teacher}}</p>
              <p class="subtitle role">{{comment.subject}}</p>
            </div>
          </div>

          <div class="content reports">{{comment.reportComment}}</div>
          <div class="card-content contentStandards">
            <div class="content">
              <table>
                <!-- <thead>
                  <tr>
                    <th class="numCellWidth">Std. #</th>
                    <th>Std. Name</th>
                    <th class="creditCellWidth">Creds.</th>
                    <th class="has-text-right">Status</th>
                  </tr>
                </thead>-->
                <tbody>
                  <tr
                    class="subjectTable"
                    v-for="subjectStandards in filterSubjectStandards(comment.subject)"
                    :key="subjectStandards.assessmentNum"
                  >
                    <td class="numCell has-text-left">{{subjectStandards.assessmentNum}}</td>
                    <td class="nameCell has-text-left">{{subjectStandards.assessmentName}}</td>
                    <td class="creditCell has-text-right creditCellWidth">
                      <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                      <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                      {{subjectStandards.assessmentCredits}}
                    </td>
                    <td class="statusCell has-text-right">
                      <span
                        v-bind:class="subjectStandards.completed"
                        class="accordionIcon tag is-normal"
                      >{{subjectStandards.completed}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FIRST PAGE TUTOA -->
    <div v-else class="commentContainer">
      <div class="card" v-for="comment in reportComments.slice(0, 6)" :key="comment.id">
        <!-- <div class="card-image"> -->
        <!-- <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>-->
        <!-- </div> -->
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(comment.teacher) + '.jpg')"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title teacher">{{comment.teacher}}</p>
              <p class="subtitle role">{{comment.subject}}</p>
            </div>
          </div>

          <div class="content reports">{{comment.reportComment}}</div>
          <div class="card-content contentStandards">
            <div class="content">
              <table>
                <!-- <thead>
                  <tr>
                    <th class="numCellWidth">Std. #</th>
                    <th>Std. Name</th>
                    <th class="creditCellWidth">Creds.</th>
                    <th class="has-text-right">Status</th>
                  </tr>
                </thead>-->
                <tbody>
                  <tr
                    class="subjectTable"
                    v-for="subjectStandards in filterSubjectStandards(comment.subject)"
                    :key="subjectStandards.assessmentNum"
                  >
                    <td
                      class="numCell has-text-left numCellWidth"
                    >{{subjectStandards.assessmentNum}}</td>
                    <td class="nameCell has-text-left">{{subjectStandards.assessmentName}}</td>
                    <td class="creditCell has-text-right creditCellWidth">
                      <!-- <td v-if="subjectStandards.assessmentCredits" class="creditCell has-text-right"> -->
                      <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
                      {{subjectStandards.assessmentCredits}}
                    </td>
                    <td class="statusCell has-text-right">
                      <span
                        v-bind:class="subjectStandards.completed"
                        class="accordionIcon tag is-normal"
                      >{{subjectStandards.completed}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

export default {
  name: "ProfileComments",
  components: {},
  props: ["student", "overview", "a4", "secondPage", "ruakura"],
  data() {
    return {
      standards: [],
      reportComments: [],
      standardsRuakura: [],
      reportCommentsRuakura: []
    };
  },
  firestore: {},
  mounted() {
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits`)
    );
    this.$bind(
      "reportComments",
      db.collection(`/students/${this.student.id}/reportComments`)
    );
    this.$bind(
      "standardsRuakura",
      db.collection(`/studentsRuakura/${this.student.id}/openCredits`)
    );
    this.$bind(
      "reportCommentsRuakura",
      db.collection(`/studentsRuakura/${this.student.id}/reportComments`)
    );
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
}

table {
  margin: auto !important;
  table-layout: fixed;
}

th {
  /* text-align: center !important; */
}

.numCellWidth {
  width: 40px;
}

.creditCellWidth {
  width: 30px;
}

.card {
  width: 31%;
  font-size: 0.65rem;
  margin: 10px 0px;
}

.reports {
  margin-bottom: 20px;
  text-align: justify;
}

.teacher {
  font-size: 1.2rem;
}

.role {
  font-size: 0.9rem;
}

.kaitiaki-pic {
  border-radius: 50%;
  object-fit: cover;
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
