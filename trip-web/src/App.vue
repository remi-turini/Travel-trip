<template>
  <div class="main">
    <div class="header" :class="{ change_color: scrollPosition > 50 }">
      <nav class="navbar navbar-expand-lg navbar-light bg-navbar">
        <div class="container-fluid">
          <router-link to="/" class="navbar-brand" aria-current="page"
            ><img class="navbar-logo" src="./assets/logo-evasion.png"
          /></router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
              <li v-if="bearer != null" class="nav-item">
                <router-link
                  to="/mes-voyages"
                  class="dot home nav-link"
                  aria-current="page"
                  >Mes voyages</router-link
                >
              </li>

              <li v-if="bearer == null" :key="index" class="nav-item">
                <router-link class="nav-link" to="/connexion"
                  >Connexion</router-link
                >
              </li>
              <li v-if="bearer == null" class="nav-item">
                <router-link class="nav-link" to="/inscription"
                  >Inscription</router-link
                >
              </li>

              <li v-if="bearer != null" class="nav-item">
                <router-link class="nav-link mr-0 pr-0" to="/profil"
                  >Profil</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/contact"
                  class="dot home nav-link"
                  aria-current="page"
                  >Contact</router-link
                >
              </li>
              <li v-if="bearer != null" class="nav-item">
                <a class="nav-link" type="submit" @click="logout"
                  >Déconnexion</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="content" id="content" :key="index">
      <router-view />
    </div>
  </div>
  <footer class="text-center text-lg-start bg-light text-muted">
  <!-- Section: Social media -->
  <section
    class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <!-- Left -->
    <div class="me-3 d-none d-lg-block">
      <a href="">Mentions légales</a> | 
      <a href="">Politique de confidentialité</a>
    </div>
    <!-- Left -->

    <!-- Right -->
    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->
</footer>
</template>

<script>
export default {
  data: () => {
    return {
      nightMode: false,
      bearer: localStorage.bearer,
      test: "test",
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("bearer");
      localStorage.removeItem("userId");
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  font-family: "Jost", sans-serif;
  box-sizing: border-box;
  background: #fdfeff !important;
}
a{
  text-decoration: none !important;
}
#app {
  font-family: "Jost", sans-serif;
    position: relative;
  min-height: 100vh;
}
.inner ul {
  display: flex;
  list-style: none;
  justify-content: space-around;
  text-decoration: none;
}
.inner ul a {
  text-decoration: none;
}
.navbar {
  padding-top: 0px;
  padding-bottom: 0px;
}
.bg-navbar {
  background-color: white;
}
.navbar-logo {
  width: 160px;
}
footer {
 position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
