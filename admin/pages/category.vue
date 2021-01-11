<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
         <div class="col-sm-6">
            <div class="a-spacing-top-medium" /> 
           <h2 style="text-align: center">Add a new category</h2>
           <form>
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Type</label>
                  <input type="text" class="a-input-text" style="width: 100%" v-model="type"/>
              </div>
               <!--  Button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="span a-button-inner">
                    <span class="a-button-text" @click="onAddCategory">Add category</span>
                  </span>
                </span>
              </div>
              <br />
              <ul class="list-group-item">
                <li v-for="category in categories" :key="category._id">
                  {{ category.type }}
                  <hr />
                </li>
              </ul>
           </form>
         </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    async asyncData({ $axios }) {
      try {
        let response = await $axios.$get("http://localhost:3000/api/categories");
        return {
          categories: response.categories
        };
      } catch (error) {
        console.log(error);
      }
  },

  data() {
    return {
      type: '',
    }
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type }
        let response = await this.$axios.$post("http://localhost:3000/api/categories", data);

        this.categories.push(data);
        this.type = "";
      } catch (error) {
        console.log(error)
      }
    }
  }

 
}
</script>