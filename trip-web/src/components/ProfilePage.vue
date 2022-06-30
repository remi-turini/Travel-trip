<template>
  <section class="pt-5">
    <div class="container pb-8">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-xl-10">
          <div class="">
            <div class="row g-0">
              <div class="col-md-8 col-lg-8 d-none d-md-block login-image">
                <h1>Bienvenue sur ton profil <br/> {{user.firstname}} {{user.lastname}}</h1>
                <div class="row">
                  <div class="col-md-6 login-text">
                    <p>
                      Modifie tes informations.<br />Et clique sur le bouton "Enregister" tout simplement.
                      
                    </p>
                  </div>
                  <div class="col-md-6">
                    <img
                      src="../assets/register-img.png"
                      alt="login form"
                      class="img-fluid"
                      style="border-radius: 1rem 0 0 1rem"
                    />
                  </div>
                </div>
              </div>
              <div
                class="col-md-4 col-lg-4 d-flex align-items-center form-login"
              >
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="persistUser">
                    <div class="mb-3">
                      <input
                        v-model="lastname"
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        :placeholder="user.lastname"
                        name="lastname" required
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="firstname"
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        :placeholder="user.firstname"
                        name="firstname" required
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        :placeholder="user.email"
                        name="email" required
                      />
                    </div>
                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Enregister
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  name: "App",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const requestOptions2 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.bearer,
          },
        };
        var url2 = "http://localhost:3000/user";
        requestOptions2;
        const res1 = await fetch(url2, requestOptions2);
        const data1 = await res1.json();
        if (data1.state == "ok") {
          var newData = JSON.parse(JSON.stringify(data1));
          this.user = newData.data;
          console.log("prout");
        } else {
          console.log("prout2");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async persistUser() {
      const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.bearer,
          },
        body: JSON.stringify({
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          
        }),
      };
      try {
        const truc = await fetch(
        "http://localhost:3000/user",
        requestOptions
        );
        const data = await truc.json();
        if (data.state == "ok")
        {
          notify(
          alert(data.message)
        );
        } else {
          console.log(data.message);
        }
      } catch(error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fdfeff;
}
h1{
      font-size: 3.5rem;
}
button{
      width: -webkit-fill-available;
}
a{
  text-decoration: none;
}
input{
      padding: 15px 20px;
    border: none;
    background-color: #0080001a;
}
section {
  background-color: #fdfeff;
  padding-bottom: 50px;

}
.login-image {
  background: white;
  padding-top: 20px;
  border-radius: 10px 0px 0px 10px;
}
.divider{
  margin-bottom: 10px;
    padding: 0;
    overflow: visible;
    border: none;
    border-top: 1px solid #e0e0e0;
    color: #6e6d7a;
    text-align: center;
}
.divider:after {
    content: 'Ou connectez-vous avec';
    display: inline-block;
    position: relative;
    top: -13px;
    padding: 0 16px;
    background: #fff;
}
.login-text{
    font-size: 20px;
    padding-top: 50px;
}
.theme-dark section {
  background-color: #1c1d24;
}
.theme-dark .card {
  background-color: #1c1d24;
  border: 1px solid grey;
}
.theme-dark .card .card-body {
  color: rgb(234, 236, 239) !important;
}
.theme-dark .card .card-body p {
  color: rgb(234, 236, 239) !important;
}
.theme-dark .card .card-body a {
  color: rgb(234, 236, 239) !important;
}
.btn-dark {
  background-color: #679436;
  border-color: #679436;
}
.btn-dark:hover,
.btn-dark:focus,
.btn-dark:active {
  background-color: #679436;
  border-color: #679436;
}
.form-login {
  border-radius: 0px 10px 10px 0px;
}
</style>