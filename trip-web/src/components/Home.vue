<template>
  <div class="home">
    <!-- Jumbotron -->
    <div
      class="bg-image p-5 text-center shadow-1-strong text-white"
      style="
        background-image: url('https://zupimages.net/up/22/16/u1jm.jpg');
        background-position-x: center;
        background-position-y: center;
      "
    >
      <h1 class="mb-3 h2">Planifié son voyage simplement</h1>

      <div class="container create-trip">
        <form @submit.prevent="persistUser">
          <input type="text" class="form-control" v-model="travelName"
                        id="travel-name"
                        aria-describedby="emailHelp"
                        placeholder="Nom de votre voyage"
                        name="travelName" required/>
          <div class="input-group">
            
            <input type="text" class="form-control" v-model="departureCity"
                        id="start-city"
                        aria-describedby="Ville de départ"
                        placeholder="Ville de départ"
                        name="departureCity" required />
            <input type="date" class="form-control" v-model="departureDate"
                        id="start-at"
                        aria-describedby="Date de départ"
                        placeholder="Date de début"
                        name="departureDate" required/>
            <input type="date" class="form-control" v-model="arrivedDate"
                        id="end-at"
                        aria-describedby="emailHelp"
                        placeholder="Date de fin"
                        name="arrivedDate" required/>
            <input type="text" class="form-control" v-model="arrivedCity"
                        id="arrived-city"
                        aria-describedby="emailHelp"
                        placeholder="Ville d'arrivée"
                        name="arrivedCity" required />
          </div>
          <div class="row">
            <div class="col">
              <button type="submit" class="btn btn-primary btn-create-trip"> Créer mon voyage </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Jumbotron -->
    <section class="my-trip">
      <div class="container">
        <div class="d-flex">
          <h2 class="h4">Mes voyages</h2>
        </div>
        <div class="d-flex justify-content-between card-trip">
          <a href="#!" class="btn btn-outline-light">
            <div
              class="bg-image card shadow-1-strong"
              style="
                background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
              "
            >
              <div class="card-body text-white">
                <h5 class="card-title">Paris j'arrive</h5>
                <p class="card-text">4 mars - 6 mars</p>
                <p class="card-text">Modifié il y a : 10 minutes</p>
              </div>
            </div>
          </a>
          <!-- Card -->
          <!-- Card -->
          <a href="#!" class="btn btn-outline-light">
            <div
              class="bg-image card shadow-1-strong"
              style="
                background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
              "
            >
              <div class="card-body text-white">
                <h5 class="card-title">Marseille</h5>
                <p class="card-text">4 mars - 6 mars</p>
                <p class="card-text">Modifié il y a : 2 jours</p>
              </div>
            </div>
          </a>
          <!-- Card -->
          <!-- Card -->
          <a href="#!" class="btn btn-outline-light">
            <div
              class="bg-image card shadow-1-strong"
              style="
                background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
              "
            >
              <div class="card-body text-white">
                <h5 class="card-title">Brest</h5>
                <p class="card-text">4 mars - 6 mars</p>
                <p class="card-text">Modifié il y a : 1 mois et 4 jours</p>
              </div>
            </div>
          </a>
          <a href="#!" class="btn btn-outline-light">
            <div
              class="bg-image card shadow-1-strong"
              style="
                background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
              "
            >
              <div class="card-body text-white">
                <h5 class="card-title">Nantes</h5>
                <p class="card-text">4 mars - 6 mars</p>
                <p class="card-text">Modifié il y a : 3 mois et 17 jours</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
    <section class="argument">
      <div class="container">
        <h2 class="h4">Un voyage à votre image</h2>
        <div class="row d-flex justify-content-between">
          <div class="col-sm-2">
            <div class="bg-image card shadow-1-strong">
              <div class="card-body">
                <img src="../assets/icon-aeroport.png" />
                <p class="card-text h5">Transports</p>
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="bg-image card shadow-1-strong">
              <div class="card-body">
                <img src="../assets/icon-jet-ski.png" />
                <p class="card-text h5">Loisirs</p>
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="bg-image card shadow-1-strong">
              <div class="card-body">
                <img src="../assets/icon-eat.png" />
                <p class="card-text h5">Restaurants</p>
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="bg-image card shadow-1-strong">
              <div class="card-body">
                <img src="../assets/icon-beer.png" />
                <p class="card-text h5">Bars</p>
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="bg-image card shadow-1-strong">
              <div class="card-body">
                <img src="../assets/icon-sleep.png" />
                <p class="card-text h5">Hôtels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tendance">
      <div class="container">
        <h2 class="h4">Destinations tendances</h2>
        <div class="d-flex justify-content-between">
          <div
            class="bg-image card shadow-1-strong"
            style="
              background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
            "
          >
            <div class="card-body text-white">
              <p class="card-text">Modifié il y a : 10 minutes</p>
            </div>
          </div>
          <div
            class="bg-image card shadow-1-strong"
            style="
              background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
            "
          >
            <div class="card-body text-white">
              <p class="card-text">Modifié il y a : 10 minutes</p>
            </div>
          </div>
          <div
            class="bg-image card shadow-1-strong"
            style="
              background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
            "
          >
            <div class="card-body text-white">
              <p class="card-text">Modifié il y a : 10 minutes</p>
            </div>
          </div>
          <div
            class="bg-image card shadow-1-strong"
            style="
              background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
            "
          >
            <div class="card-body text-white">
              <p class="card-text">Modifié il y a : 10 minutes</p>
            </div>
          </div>
          <div
            class="bg-image card shadow-1-strong"
            style="
              background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');
            "
          >
            <div class="card-body text-white">
              <p class="card-text">Modifié il y a : 10 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="why">
      <div class="container">
        <h2 class="h4">Pour planifier votre voyage chez nous ?</h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => {
    return {
      nightMode: false,
      bearer: localStorage.bearer,
      test: "test"
    };
  },
  methods: {
    async persistUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer '+localStorage.bearer, },
        body: JSON.stringify({
          travelName: this.travelName,
          departureCity: this.departureCity,
          departureDate: this.departureDate,
          arrivedCity: this.arrivedCity,
          arrivedDate: this.arrivedDate,
        }),
      };
      const truc = await fetch(
        "http://localhost:3000/travel",
        requestOptions
      );
      const data = await truc.json();
      console.log(data);
      if (data.state == "ok") {
        this.$router.push("/mon-voyage");
      } else {
        alert(data.message);
      }
    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding-bottom: 80px  ;
}
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
  width: 23%;
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
