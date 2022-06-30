<template>
  <div class="my-trip" ref="content">
    <section class="title">
      <div class="container">
        <h1 class="h3 title-trip">{{ travels.name }}</h1>
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
            <ul v-for="item in travels.Destinations" :key="item.id">
              <li>{{ item.departureCity }}</li>
              <li>{{ item.arrivedCity }}</li>
            </ul>
            <button class="btn btn-primary">+ Ajout d'une destination</button>
          </div>
          <div class="col">
            <GMapMap
              :center="center"
              :zoom="7"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
            </GMapMap>
          </div>
        </div>
      </div>
    </section>
    <section class="reservation">
      <div class="container">
        <div class="row">
          <div class="col-4">
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
          <div class="col-8">
            <p>{{ travels.Destinations[0].departureCity }}</p>
            <p>{{ travels.Destinations[0].arrivedCity }}</p>
            <div class="hotel">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <ul v-for="item in hotels" :key="item.id">
                      <li>{{ item.data.name }}</li>
                      <li>{{ item.data.photo }}</li>
                      <img :src=item.data.photo>
                    </ul>
                    <button class="btn btn-primary">
                      + Ajout d'une destination
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      center: { lat: 51.093048, lng: 6.84212 },
    };
  },

  created() {
    this.suggestionHotel();
    this.fetchTravels();
  },
  methods: {
    async suggestionHotel() {
      
      const requestOptionsHotel = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.bearer,
        },
        body: JSON.stringify({
          cityName: "Marseille",
          keyWord: "hotel",
        }),
      };
      try {
        var urlhotel = "http://localhost:3000/har";
        console.log("pipi");
        const res3 = await fetch(urlhotel, requestOptionsHotel);
        const datahotel = await res3.json();
        if (datahotel.state == "ok") {
          var newData = JSON.parse(JSON.stringify(datahotel));
          this.hotels = newData.data;
          console.log("caca");
        } else {
          console.log(res3.message);
          console.log("pipi");
        }
      } catch (error) {
        console.log(error);
      }
    },
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
        } else {
          console.log(res1.message);
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
}
</style>
