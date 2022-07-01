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
            <div class="destination" v-for="item in travels.Destinations" :key="item.id">
              <span class="h5">{{ item.departureCity }} > {{ item.arrivedCity }}</span>
              <button class="btn btn-primary" :id=item.id>Décollage</button>
            </div>
            <button class="btn btn-primary">+ Ajout d'une destination</button>
          </div>
          <div class="col">
            <GMapMap
              :center="center"
              :zoom="7"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
              <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
              />
            </GMapMap>
          </div>
        </div>
      </div>
    </section>
    <section class="reservation">
      <div class="container">
        <h2 class="h2">Mes suggestions</h2>
        <h3 class="h3 text-center">Hôtels</h3>
        <div class="d-flex hotels suggestions-section" style="overflow-x: scroll">
          <div class="col-auto" v-for="item in hotels" :key="item.id">
              <h4 class="h5">{{ item.name }}</h4>
              <img :src="item.photo" />
              <button class="btn btn-primary">Choisir</button>
          </div>
        </div>
      </div>
      <div class="container">
        <h3 class="h3 text-center">Restaurants</h3>
        <div class="d-flex restaurants suggestions-section" style="overflow-x: scroll">
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

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      travels: {},
      hotels: {},
      restaurants:{},
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        },
        {
          position: {
            lat: 53.093048,
            lng: 6.84212,
          },
        },
      ],
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
      // remove this after lat long received from api.
      const tempLatLong = [
        { lat: 51.093048, lng: 6.84212 },
        { lat: 37.9168362, lng: -122.076972 },
      ];
      for (let i = 0; i < tempLatLong.length; i++) {
        markers.push({
          position: tempLatLong[i],
          title: "test title",
        });
      }
      return markers;
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
.reservation h3{
  padding-top: 30px;
}
.reservation .suggestions-section img {
  height: 250px;
}
.reservation .suggestions-section .col-auto{
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
}
.reservation .suggestions-section .col-auto img{
    border-radius: 10px;
}
.reservation .suggestions-section .col-auto .btn-primary{
  border-radius: 20px;
    width: 200px;
    margin: auto;
    margin-top: 20px;
}
.reservation .suggestions-section .col-auto .btn-primary:hover{
    color: #679436;
    background-color: white;
    border-color: #679436;
}
.reservation .suggestions-section .col-auto .btn-primary:focus{
    color: #679436;
    background-color: white;
    border-color: #679436;
}
.resume .col{
  padding: 50px;
}
.resume .destination{
      display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 10px 0px;
}
</style>
