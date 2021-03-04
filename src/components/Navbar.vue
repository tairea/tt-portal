<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
        <p id="navbar-title">Last Updated: {{formatTime(student.last_updated)}}</p>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <p class="navbar-item" style="color: slategrey">Signed in as: {{currentUser}}</p>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div class="button is-light" id="signoutButton" @click="logout">Sign Out</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

import firebase from "firebase";

export default {
  name: "Navbar",
  props: ["student"],
  components: {},
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
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
    formatTime(timestamp) {
      var date = timestamp.toDate();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      return day + " " + months[month] + " " + this.pad(hour) + ":" + this.pad(minute);
    },
    pad(value) {
      if(value < 10) {
          return '0' + value;
      } else {
          return value;
      }
    }
  },

  mounted: function() {
    //navbar hamburger menu
    $(document).ready(function() {
      // Check for click events on the navbar burger icon
      $(".navbar-burger").click(function() {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
      });
    });
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
  color: white;
}

.navbar-burger {
  color: white;
}

#navbar-title {
  color: white;
}

#signoutButton {
  margin: auto;
}
</style>
