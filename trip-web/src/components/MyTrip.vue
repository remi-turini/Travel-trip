<template>
  <div class="my-trip">
    <section class="title">
      <div class="container">
        <h1 class="h3 title-trip">{{travels.name}}</h1>
        <p class="title-date">{{travels.startDate}} - {{travels.endDate}}</p>
        <input type="date" class="form-control" 
                        id="end-at"
                        aria-describedby="emailHelp"
                        placeholder="Date de fin"
                        name="endAt" :value="travels.startDate" required/>
        <p>Looking for Product: {{ this.$route.params.name }}</p>
      </div>
    </section>
    <section class="resume">
      <div class="container">
          <div class="row">
              <div class="col">
                  <ul>
                    <li>Départ de Lyon</li>
                    <li>Avion ></li>
                    <li>Paris - 3 nuits</li>
                    <li>Avion ></li>
                    <li>Marseille - 4 nuits</li>
                    <li>Arrivée à Lyon</li>
                  </ul>
                  <a href="">+ Ajout d'une destination</a>
              </div>
              <div class="col">
                  <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>
              </div>
          </div>
      </div>
    </section>
    <section class="reservation">
      <div class="container">
        <div class="row">
              <div class="col">
                  <p class="month-date-travel">AVRIL</p>
                  <ul>
                      <li>18</li>
                      <li>19</li>
                      <li>20</li>
                      <li>21</li>
                      <li>22</li>
                      <li>23</li>
                      <li>24</li>
                      <li>25</li>
                  </ul>
              </div>
              <div class="col">
                  <p>Checklist</p>
                  <ul>
                      <li>Paris</li>
                      <li>Marseille</li>
                  </ul>
              </div>
          </div>
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
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer '+localStorage.bearer, },
        body: JSON.stringify({
          travelName: this.$route.params.name,
        }),
      };
      var url2 =
        "http://localhost:3000/travel/one";
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

<style scoped>
.title{
    background: #679436;
    color: white;
    text-align: center;
    padding-bottom: 10px;
    padding-top: 20px;
}
.resume{
    background: white;
}
</style>
