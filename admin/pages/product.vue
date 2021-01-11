<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="a-section">
          <div class="a-spacing-top-medium" /> 
          <h2 style="text-align: center">Add a new product</h2>
          <form>
               <div class="a-spacing-top-medium" /> 
               <!-- Category Dropdown option -->
               <label> Category </label>
               <select class="a-select-option" v-model="categoryID">
                 <option v-for="category in categories" :value="category._id" :key="category._id"> {{ category.type }}</option>
               </select>

              <!-- Owner Dropdown option -->
              <div class="a-spacing-top-medium">
                <label> Owner</label>
                <select class="a-select-option" v-model="ownerID">
                  <option v-for="owner in owners" 
                     :value="owner._id" 
                     :key="owner._id"> 
                     {{ owner.name }}
                  </option>   
                </select>
              </div>

                <!-- Title input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Title</label>
                  <input type="text" class="a-input-text" style="width: 100%" v-model="title"/>
              </div>

               <!--  Price input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Price</label>
                  <input type="text" class="a-input-text" style="width: 100%" v-model="price"/>
              </div>

               <!--  stock Quantity input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Stock Quantity</label>
                  <input type="text" class="a-input-text" style="width: 100%" v-model="stockQuantity"/>
              </div>

               <!--  Description input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Description</label>
                  <textarea placeholder="Provide details such as product description" style="width: 100%" v-model="description"/>
              </div>

              <!--  Photo file -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Add Photo</label>
                  <div class="a-row a-spacing-top-medium">
                    <label class="choosefile-button">
                      <i class="fas fa-plus"></i>
                      <input type="file" @change="onFileSelected"/>
                      <p style="margin-top: -70px">{{ fileName }}</p>
                    </label>
                  </div> 
              </div>
              <hr />
               <!--  Button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="span a-button-inner">
                    <span class="a-button-text" @click="onAddProduct">Add product</span>
                  </span>
                </span>
              </div>
              
          </form>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");

      const [catResponse, ownerResponse] = await Promise.all([
        categories,
        owners
      ]);
      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners
      }
    
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: '',
      price: 0,
      description: '',
      stockQuantity: 1,
      selectedFile: null,
      fileName: null,
    }
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("stockQuantity", this.stockQuantity);
      data.append("ownerID", this.ownerID);
      data.append("categoryID", this.categoryID);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$post("http://localhost:3000/api/products", data);

      this.$router.push("/");
    }
  }
}

</script>