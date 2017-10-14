<template>
  <section class="hero is-fullheight is-warning is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
             <div class="column is-offset-4">
             Login
             </div>
            </h1>
            <div class="box">
              <label class="label">Username</label>
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="usuario" v-model="cred.username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="password" v-model="cred.password" password-reveal>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              
              <hr>
              <p class="control">
                <div class="column is-offset-4">
                  <button class="button is-primary" @click="login()">Ingresar</button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
    	cred: {
    		username: '',
    		password: ''
    	}
    };
  },
  methods: {
  	login(){
      this.$http.post('/api/usuarios/login', this.cred).then((res, err) => {
        this.$http.get('/api/usuarios/'+res.data.userId+'?access_token='+res.data.id).then( response => {
          this.$auth.setToken(res.data.id, res.data.userId, res.data.created, res.data.ttl, response.data.admin);
          this.$router.push('/home/dashboard');
          const loadingComponent = this.$loading.open()
          setTimeout(() => {
            loadingComponent.close()
            }, 0.5 * 1000)
          })
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>

