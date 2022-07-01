<template>
  <section class="pt-5">
    <div class="container pb-8">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-xl-10">
          <div class="">
            <div class="row g-0">
              <div class="col-md-8 col-lg-8 d-none d-md-block login-image">
                <h1>Paré au décollage,<br/> prenez place !</h1>
                <div class="row">
                  <div class="col-md-6 login-text">
                    <p>
                      Si vous n'avez pas encore de compte<br />Vous pouvez vous
                      <a href="/inscription">Inscrire ici !</a>
                    </p>
                  </div>
                  <div class="col-md-6">
                    <img
                      src="../assets/login-img.png"
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
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Entrez un mail"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Mot de passe"
                        required
                      />
                      <a href="">Mot de passe oublié</a>
                    </div>
                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Connexion
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
export default {
  beforeMount() {},
  methods: {
    async persistUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };
      try {
        const res = await fetch("http://localhost:3000/login", requestOptions);
        const response = await res.json();
        if (response.state == "ok")
        {
          localStorage.setItem("bearer", response.data.token);
          localStorage.setItem("id", response.data.userId);

          this.$router.go("/");
        } else {
          alert(response.message);
          console.log(response.message);
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