<template>
  <section class="comments">
    <b-message
      class="bMessage"
      title="Digital Technology"
      type="is-danger"
      aria-close-label="Close message"
    >
      <div class="bMessageBody">
        <div class="left">
          <img class="kaitiaki-pic" v-bind:src="require('@/assets/staff_photos/ian.jpg')">
        </div>
        <div
          class="right"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</div>
      </div>
    </b-message>

    <b-message
      class="bMessage"
      title="English"
      type="is-success"
      has-icon
      aria-close-label="Close message"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</b-message>

    <b-message
      class="bMessage"
      title="Maths"
      type="is-info"
      has-icon
      aria-close-label="Close message"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</b-message>

    <b-message
      class="bMessage"
      title="Science"
      type="is-warning"
      has-icon
      aria-close-label="Close message"
    >Lorem ipsum dolor sit amet, consectetur warning elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</b-message>
  </section>
</template>

<script>
export default {
  name: "SubjectComments",
  props: ["student"]
};
</script>

<style>
.delete {
  display: none;
}
.message-header > p {
  margin: auto;
}
</style>

<style scoped>
.comments {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.bMessage {
  width: 40%;
}
.bMessageBody {
  display: flex;
}
.kaitiaki-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}
</style>

