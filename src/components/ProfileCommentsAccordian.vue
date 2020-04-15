<template>
  <BulmaAccordion
    dropdown
    :icon="'custom'"
    :caretAnimation="{duration: '.6s', timerFunc: 'ease-in-out'}"
    :slide="{duration: '.9s',timerFunc: 'ease'}"
    class="is-shadowless bulmaAccordian"
  >
    <!-- The wrapper component for all the items -->
    <!-- <BulmaAccordionItem v-for="standard in standards" :key="standard.assessmentNum" class="active"> -->
    <BulmaAccordionItem v-for="comment in reportComments" :key="comment.id">
      <h4 slot="title" class="accordionTitle">{{comment.subject}}</h4>
      <span slot="icon" class="accordionIcon">
        <img
          class="kaitiaki-pic"
          v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(comment.teacher) + '.jpg')"
        >
      </span>
      <p slot="content" class="accordionContent">{{getReportComment(comment.subject)}}</p>
      <p slot="footer" class="accordionFooter">
        <a v-bind:href="getTeacherEmail(comment.teacher)">
          <table class="footerTable">
            <tr>
              <td>
                Got questions?
                <br>
                <span class="has-text-weight-semibold">Contact {{comment.teacher}}</span>
              </td>
              <td>
                <img
                  class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(comment.teacher) + '.jpg')"
                >
              </td>
            </tr>
          </table>
        </a>
      </p>
    </BulmaAccordionItem>
  </BulmaAccordion>
</template>

<script>
import Vue from "vue";
import { BulmaAccordion, BulmaAccordionItem } from "vue-bulma-accordion";
import { db } from "./firebaseInit";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

export default {
  name: "ProfileCommentsAccordian",
  components: {
    BulmaAccordion,
    BulmaAccordionItem
  },
  props: ["student", "overview", "a4"],
  data() {
    return {
      standards: [],
      reportComments: []
    };
  },
  firestore: {},
  mounted() {
    this.$bind(
      "reportComments",
      db.collection(`/students/${this.student.id}/reportComments`)
    );
  },
  methods: {
    formatTeacherName: function(name) {
      //format from 'Pa Ian' to 'ian'
      return name.split(" ")[1].toLowerCase();
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
.kaitiaki-pic {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
