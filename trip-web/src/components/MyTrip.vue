<template>
  <div class="my-trip" ref="content">
    <section class="title">
      <div class="container">
        <h1 class="h1 title-trip">{{ travels.name }}</h1>
        <p class="title-date">
          {{ dateTime(travels.startDate) }} - {{ dateTime(travels.endDate) }}
        </p>
        <button class="btn btn-outline-light" @click="download">
          Exporter mon voyage
        </button>
      </div>
    </section>
    <section class="resume">
      <div class="container">
        <div class="row">
          <div class="col">
            <div
              class="destination"
              v-for="item in travels.Destinations"
              :key="item.id"
            >
              <span class="h5"
                >{{ item.departureCity }} > {{ item.arrivedCity }}</span
              >
              <button
                class="btn btn-primary"
                id="btn-transport"
                @onclick="getTransport(item.id)"
              >
                Décollage
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary add-destination"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                + Ajout d'une destination
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Ajout d'une nouvelle destination :
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form
                        @submit.prevent="addDestination"
                        id="add-destination"
                        :data-id="travels.id"
                      >
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          v-model="departureCity"
                          placeholder="Ville de départ"
                          required
                        />
                        <input
                          type="date"
                          class="form-control"
                          v-model="departureDate"
                          id="start-at"
                          aria-describedby="Date de départ"
                          placeholder="Date de début"
                          name="departureDate"
                          required
                        />
                        <input
                          type="date"
                          class="form-control"
                          v-model="arrivedDate"
                          id="end-at"
                          aria-describedby="emailHelp"
                          placeholder="Date de fin"
                          name="arrivedDate"
                          required
                        />
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          v-model="arrivedCity"
                          placeholder="Ville d'arrivée"
                          required
                        />
                        <button class="btn btn-primary" type="submit">
                          Ajouter
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <GMapMap
              :center="center"
              :zoom="5"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
              <GMapMarker
                :key="index"
                v-for="(m, index) in getMarkers()"
                :position="m.position"
              />
              <GMapPolyline
                  :path="path"
                  :editable="true"
                  ref="polyline" />
            </GMapMap>
          </div>
        </div>
      </div>
    </section>
    <section class="reservation">
      <div class="container">
        <h2 class="h2">Mes suggestions</h2>
        <h3 class="h3 text-center">Hôtels</h3>
        <div
          class="d-flex hotels suggestions-section"
          style="overflow-x: scroll"
        >
          <div class="col-auto" v-for="item in hotels" :key="item.id">
            <h4 class="h5">{{ item.name }}</h4>
            <img :src="item.photo" />
            <button class="btn btn-primary">Choisir</button>
          </div>
        </div>
      </div>
      <div class="container">
        <h3 class="h3 text-center">Restaurants</h3>
        <div
          class="d-flex restaurants suggestions-section"
          style="overflow-x: scroll"
        >
          <div class="col-auto" v-for="item in restaurants" :key="item.id">
            <h4 class="h5">{{ item.name }}</h4>
            <img :src="item.photo" />
            <button class="btn btn-primary">Choisir</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import moment from "moment";
import { notify } from "@kyvg/vue3-notification";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      path: [],
      travels: {},
      hotels: {},
      restaurants:{},
    };
  },

  created() {
    this.fetchTravels();
  },
  methods: {
    async fetchTravels() {
      const requestOptions2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          travelName: this.$route.params.name,
        }),
      };
      try {
        var url2 = "http://localhost:3000/travel/one";
        requestOptions2;
        const res1 = await fetch(url2, requestOptions2);
        const data1 = await res1.json();
        if (res1.statusText == "OK") {
          var newData = JSON.parse(JSON.stringify(data1));
          this.travels = newData.data;
          console.log(newData.data);
          for (const gps in newData.data.Destinations) {
            console.log(gps);
          }
          await this.getMarkers();
          await this.suggestionHotel();
          await this.suggestionRestaurant();
        } else {
          console.log(res1.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async suggestionHotel() {
      console.log(this.travels.Destinations);
      const requestOptionsHotel = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          cityName: this.travels.Destinations[0].arrivedCity,
          keyWord: "hotel",
        }),
      };
      try {
        var urlhotel = "http://localhost:3000/har";

        const res3 = await fetch(urlhotel, requestOptionsHotel);
        const datahotel = await res3.json();
        if (datahotel.state == "ok") {
          var newData = JSON.parse(JSON.stringify(datahotel));
          this.hotels = newData.data;
        } else {
          console.log(res3.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async suggestionRestaurant() {
      console.log(this.travels.Destinations);
      const requestOptionsHotel = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          cityName: this.travels.Destinations[0].arrivedCity,
          keyWord: "restaurant",
        }),
      };
      try {
        var urlhotel = "http://localhost:3000/har";

        const res3 = await fetch(urlhotel, requestOptionsHotel);
        const datahotel = await res3.json();
        if (datahotel.state == "ok") {
          var newData = JSON.parse(JSON.stringify(datahotel));
          this.restaurants = newData.data;
        } else {
          console.log(res3.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getMarkers() {
      // generating markers for site map
      var markers = [];
      var path = [];
      var tempLatLong = [];
      for (const travelGps of this.travels.Destinations) {
        if(travelGps.arrivedCityLat !== null && travelGps.arrivedCityLong !== null)
        tempLatLong.push({lat: travelGps.arrivedCityLat, lng: travelGps.arrivedCityLong });
      }
      for (let i = 0; i < tempLatLong.length; i++) {
        markers.push({
          position: tempLatLong[i]
        });
        path.push(tempLatLong[i]);
      }
      this.center = { lat: this.travels.Destinations[0].arrivedCityLat, lng: this.travels.Destinations[0].arrivedCityLong },
      this.markers = markers;
      this.path = path;
      return markers;
    },
    async getTransports(id) {
      console.log(id);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          destinationId: id,
        }),
      };
      try {
        const truc = await fetch(
          "http://localhost:3000/transport",
          requestOptions
        );
        const data = await truc.json();
        if (data.state == "ok") {
          console.log("test");
          alert(data.message);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addDestination() {
      var id = document.getElementById("add-destination");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          travelId: id.dataset.id,
          departureCity: this.departureCity,
          departureDate: this.departureDate,
          arrivedCity: this.arrivedCity,
          arrivedDate: this.arrivedDate,
        }),
      };
      try {
        const truc = await fetch(
          "http://localhost:3000/destination",
          requestOptions
        );
        const data = await truc.json();
        if (data.state == "ok") {
          notify(alert(data.message));
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    //jspdf does not include the bootstrap style layout
    download() {
      var pdf = new jsPDF();

      //titre
      pdf.setFontSize(30);
      pdf.setTextColor(103, 148, 54);
      pdf.text(this.travels.name, 10, 20);
      pdf.setTextColor(0, 0, 0);

      //date
      pdf.setFontSize(20);
      pdf.text(
        this.dateTime(this.travels.startDate) +
          " - " +
          this.dateTime(this.travels.endDate),
        10,
        30
      );

      //destinations
      pdf.setFontSize(15);
      pdf.text(
        "Ville de départ : " + this.travels.Destinations[0].departureCity,
        10,
        50
      );
      pdf.text(
        "Ville d'arrivée: " + this.travels.Destinations[0].arrivedCity,
        10,
        60
      );

      //footer
      pdf.setFontSize(20);
      pdf.text(60, 270, "C'est parti pour l'aventure !");

      const contentHtml = this.$refs.content.html;
      pdf.html(contentHtml, {
        width: 170,
      });
      pdf.save(this.travels.name + ".pdf");
    },
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
};
</script>

<style scoped>
.title {
  background: #679436;
  color: white;
  text-align: center;
  padding-bottom: 25px;
  padding-top: 20px;
}
.resume {
  background: white;
}
.resume ul {
  padding-top: 15px;
}
.resume li {
  font-size: 20px;
}
.btn-primary {
  background-color: #679436;
  border-color: #679436;
}
.reservation {
  padding-top: 50px;
  background-color: whitesmoke;
  min-height: 500px;
  padding-bottom: 100px;
}
.reservation h3 {
  padding-top: 30px;
}
.reservation .suggestions-section img {
  height: 250px;
}
.reservation .suggestions-section .col-auto {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}
.reservation .suggestions-section .col-auto img {
  border-radius: 10px;
}
.reservation .suggestions-section .col-auto .btn-primary {
  border-radius: 20px;
  width: 200px;
  margin: auto;
  margin-top: 20px;
}
.reservation .suggestions-section .col-auto .btn-primary:hover {
  color: #679436;
  background-color: white;
  border-color: #679436;
}
.reservation .suggestions-section .col-auto .btn-primary:focus {
  color: #679436;
  background-color: white;
  border-color: #679436;
}
.resume .col {
  padding: 50px;
}
.resume .destination {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px 0px;
}
.modal input{
  margin-bottom: 10px;
}
.resume .destination .btn-primary{
  border-color: #679436;
    background-color: white;
    color: #679436;
}
.add-destination:hover{
  background-color: #679436;
}
.btn-primary:hover{
  background-color: #679436;
}
.btn-primary:focus{
  background-color: #679436;
}
</style>
