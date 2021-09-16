<template>
    <div id="container" class="justify-content-center">

        <div class="d-flex justify-content-center items-desc text-center">
            <h4>Here is the full list of prizes that you can win.</h4>
        </div>

        <div class="cards-wrapper">
          <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3">
            <div class="col" v-for="item in items" :key="item._id">
              <div class="card shadow-sm rounded">
                <img class="card-img-top" :src="item.imageUrl" :alt="item.name">
                <div class="card-body text-center">
                  <h4 class="card-title">{{ item.name }}</h4>
                  <button class="btn redeem rounded-pill" @click="$router.push(`/prizedetails/${item._id}`)">
                      Redeem
                      <span>&#62;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PrizeItems',
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    const response = await axios.get('/api/prizeItems');
    this.items = response.data;
  }
}
</script>

<style>
.cards-wrapper {
  background-color: #F5F8FA;
  padding: 0 5em 2em;
}

.items-desc {
   padding: 60px 0;
   background-color: #F5F8FA;
}

.card {
  border: 0;
  margin-bottom: 20px;
}

.card-title {
  font-weight: 800;
}

.card-body {
  line-height: 120px;
  margin-top: 60px;
}

.btn {
  width: 100%;
  min-width: 100px;
  max-width: 160px;
  font-weight: 400;
  line-height: 30px;
}

.redeem {
  background-color: #FFCF0B;
}
</style>