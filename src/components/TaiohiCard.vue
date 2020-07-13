<template>
    <div class="card" outlined>
        <!-- <v-card-title class="headline">{{student.given_name}}</v-card-title> -->
        <img :src="photo" class="profilePic">
        <div class="creditTotal">{{student.creditTotal}}</div>
    </div>
</template>

<script>
    import { storage } from "./firebaseInit";

    export default {
        name: 'CreditLeaderboard',
        props: ['student'],
        components: {

        },
        data() {
            return {
                photo: null
            }
        },
        mounted() {
            this.getNormalProfilePic(this.student.given_name)
        },
        methods: {
            getNormalProfilePic(name) {
                name = name.split(" ").join("")
                storage.ref('taiohi/' + name.toLowerCase() + '.png').getDownloadURL().then((url) => {
                    this.photo = url
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');

    .card {
        margin: 10px;
        border: 1px solid rgba(0,0,0,0.05);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 10px;
        background-color: hsl(141, 71%, 48%);
        height: 70px;
        width: 40%;
        box-sizing: border-box;
    }

    .profilePic {
        border: 1px solid rgba(0,0,0,0.05);
        border-radius: 50%;
        /* width: 100px; */
        height: 100%;
        box-shadow: none;
        margin-left: 10px;
    }

    .creditTotal {
        margin-left: 20px;
        font-family: 'Chango', cursive;
        color: white;
        font-size: 30px;
    }
</style>