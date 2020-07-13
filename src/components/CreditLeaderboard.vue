<template>
    <v-container>
        <v-row dense>
            <v-col cols="6">
                    <!-- <p class="title">All</p>
                    <div v-for="(student, index) in sortStudents()" :key="`${student.school_year + '-' +index}`">
                        <TaiohiCard :student="student" />
                    </div> -->
                    <p class="title">Year 11s</p>
                    <div class="flexWrap">
                        <TaiohiCard v-for="(student, index) in getSortStudents(11)" :key="`${student.school_year + '-' +index}`" :student="student" />
                    </div>
                    <div class="spacer"></div>
            </v-col>
            <v-col cols="6">
               
                <p class="title">Year 12s</p>
                <div class="flexWrap">
                    <TaiohiCard v-for="(student, index) in getSortStudents(12)" :key="`${student.school_year + '-' +index}`" :student="student" />
                </div>
                <div class="spacer"></div>
                <p class="title">Year 13s</p>
                <div class="flexWrap">
                    <TaiohiCard  v-for="(student, index) in getSortStudents(13)" :key="`${student.school_year + '-' +index}`" :student="student" />
                </div>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import TaiohiCard from '@/components/TaiohiCard.vue'
    export default {
        name: 'CreditLeaderboard',
        props: ['students'],
        components: {
            TaiohiCard,
        },
        data() {
            return {
                photo: null
            }
        },
        mounted() {

        },
        methods: {
            sortStudents() {
                let descending = this.students.sort((a, b) => Number(b.creditTotal) - Number(a.creditTotal));
                return descending;
            },
            getSortStudents(year) {
                let studentsByYear = this.students.filter(student => student.school_year == year);
                let descending = studentsByYear.sort((a, b) => Number(b.creditTotal) - Number(a.creditTotal));
                return descending;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');
   
    .title {
        font-family: 'Chango', cursive; 
        text-transform: uppercase;
        color: hsl(0, 0%, 21%);
        font-size: 20px;
        margin: 10px 0px;
    }

    .flexWrap {
        display: flex;
        flex-wrap: wrap;
    }

</style>