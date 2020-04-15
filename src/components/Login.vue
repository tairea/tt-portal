<template>
  <div id="login">
    <div class="login-card">
      <div class="card-title">
        <h1>Please Sign In</h1>
      </div>

      <div class="content">
        <input
          id="email"
          type="email"
          name="email"
          title="email"
          placeholder="Email"
          required
          autofocus
          v-model="email"
        >
        <input
          id="password"
          type="password"
          name="password"
          title="password"
          placeholder="Password"
          required
          v-model="password"
        >

        <div class="level options">
          <!-- <div class="checkbox level-left">
            <input type="checkbox" id="checkbox" class="regular-checkbox">
            <label for="checkbox"></label>
            <span>Remember me</span>
          </div>-->
          <br>
          <a class="btn btn-link level-right" href="#">Forgot Password?</a>
        </div>

        <button @click="login" class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            console.log('going to: ' + this.$router.path)
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;
}
#login .login-card {
  background: #fff;
  width: 24rem;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);
}
#login .login-card .card-title {
  /* background-color: #00b89c; */
  background-color: black;
  padding: 2rem;
}
#login .login-card .card-title h1 {
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
}
#login .login-card .content {
  padding: 3rem 2.5rem 5rem;
}
#login .login-card #email,
#login .login-card #password {
  display: block;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1.75rem;
  padding: 0.25rem 0;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  transition: all 0.5s;
}
#login .login-card #email:hover,
#login .login-card #password:hover {
  border-color: #7a7a7a;
}
#login .login-card #email:active,
#login .login-card #email:focus,
#login .login-card #password:active,
#login .login-card #password:focus {
  /* border-color: #00d1b2; */
  border-color: black;
}
#login .login-card .checkbox {
  color: #b5b5b5;
  font-size: 0.8rem;
}
#login .login-card .checkbox span {
  margin-left: 0.5rem;
}
#login .login-card a {
  font-size: 0.8rem;
}
#login .login-card .options {
  color: #b5b5b5;
  margin-bottom: 1.5rem;
}
#login .login-card button {
  cursor: pointer;
  font-size: 1.2rem;
  color: #00d1b2;
  color: black;
  border-radius: 4rem;
  display: block;
  width: 100%;
  background: transparent;
  /* border: 2px solid #00d1b2; */
  border: 2px solid black;
  padding: 0.9rem 0 1.1rem;
  transition: color 0.5s, border-color 0.5s;
}
#login .login-card button:hover,
#login .login-card button:focus {
  color: #009e86;
  color: black;
  border-color: #009e86;
  border-color: black;
}
#login .login-card button:active {
  transform: translateY(1px);
}

label {
  cursor: pointer;
}

.regular-checkbox {
  display: none;
}

.regular-checkbox + label {
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 7px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

.regular-checkbox:checked + label {
  background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
  content: "\2714";
  font-size: 11px;
  position: absolute;
  top: 0;
  left: 3px;
  color: #b5b5b5;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
