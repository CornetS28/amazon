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
               <select class="a-select-option">
                 <option v-for="category in categories" :value="category._id" :key="category._id"> {{ category.type }}</option>
               </select>

              <!-- Owner Dropdown option -->
              <div class="a-spacing-top-medium">
                <label> Owner</label>
                <select class="a-select-option">
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
                  <input type="text" class="a-input-text" style="width: 100%" />
              </div>

               <!--  Price input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Price</label>
                  <input type="text" class="a-input-text" style="width: 100%" />
              </div>

               <!--  Description input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Description</label>
                  <textarea placeholder="Provide details such as product description" style="width: 100%" />
              </div>

              <!--  Photo file -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Add Photo</label>
                  <div class="a-row a-spacing-top-medium">
                    <label for="
                    " class="choosefile-button">
                    <i class="fas fa-plus"></i>
                    <input type="file" />
                    <p style="margin-top: -70px">name of the</p>
                    </label>
                  </div>
              </div>
              <hr />
               <!--  Button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="span a-button-inner">
                    <span class="a-button-text">App product</span>
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
  }
}
</script>