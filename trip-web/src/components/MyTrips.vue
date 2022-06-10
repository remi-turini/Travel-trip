<template>
  <div class="home">
    <section class="my-trip">
      <div class="container">
        <div class="d-flex">
          <h2 class="h4">Mes voyages</h2>
        </div>
        <div class="row" >
        <div class="col-sm-3" v-for="item in travels" :key="item.id">
          <div class="card shadow-sm ">
            <h2>{{item.name}}</h2>
            <img v-for="media in item.media" :key="media.id" :src="`${media.thumbnail.url}`" class="card-img"
              alt="..."/>
              <h3>{{ item.title}}</h3>
              <router-link class="nav-link" :to="'/mes-voyages/' + item.name"
                  >Voir plus</router-link
                >
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MyTrips",
  data() {
    return {
      travels: {},
    };
  },
  created() {
    this.fetchTravels();
  },
  methods: {
    async fetchTravels() {

      const requestOptions2 = {
        method: "GET",
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer '+localStorage.bearer, },
      };
      var url2 =
        "http://localhost:3000/travel/all";
       requestOptions2;
      const res1 = await fetch(url2, requestOptions2);
      const data1 = await res1.json();
    if (res1.statusText == "OK") {
        var newData = JSON.parse(JSON.stringify(data1));
        this.travels = newData.data;
        console.log(newData.data)
      } else {
        alert(res1.message);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-primary {
  background-color: #679436;
  border-color: #679436;
}
.btn-primary:hover {
  background-color: #679436;
  border-color: #679436;
}
.btn-create-trip{
  float:right;
}
.my-trip .d-flex a {
  padding: 0px;
}
.create-trip .input-group {
  display: flex;
  padding: 20px 90px;
}
.create-trip .input-group > input,
.create-trip .input-group > select,
.create-trip .input-group > tag-input {
  width: 22%;
  margin: 0px 20px;
}
.argument .col-sm-2 {
  width: 19%;
}
.argument .card {
  border: none;
}
.argument .card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.argument .card-body img {
  width: 50%;
}
section {
  padding-top: 30px;
}
section h2 {
  padding-bottom: 10px;
}
.my-trip .card-trip > a {
  width: 100%;
}
.tendance .card {
  width: 18%;
  background-color: white;
}
.tag-input {
  background-color: white;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  color: black;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
.select-people {
  width: 100px;
}
.add-destination {
  color:white;
  text-decoration: none;
  font-size: 20px;
}
.create-trip .row{
  padding-top: 10px;
}
</style>
