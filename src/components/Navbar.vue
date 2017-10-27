<template>
<nav class="nav has-shadow hero" id="cssNav">
  <div class="container is-fluid">
    <div class="nav-left">
      <a class="nav-item" @click="changeNav">
        <span class="icon is-white">
          <i class="fa fa-bars"></i>
        </span>
      </a>
  
    </div>
    
    
    <div class="nav-right nav-menu" style="margin-right: 40px;">
      <span class="nav-item has-text-white" >{{user.username | uppercase}}</span>
      <a class="nav-item is-tab" @click="logout()"><span class="has-text-white">Cerrar Sesión</span></a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data (){
    return {
      hideNav : false,
      user: {}
    }
  },
  methods: {
    logout(){
      this.$http.post('/api/usuarios/logout?access_token='+ this.$auth.getToken().token).then((res) => {
        this.$auth.destroyToken();
        this.$router.push('/');
      });
    },
    changeNav(){
      this.hideNav = !this.hideNav
      this.$emit('statusNav', this.hideNav)
    },
    getUsername(){
      this.$http.get('/api/usuarios/'+this.$auth.getToken().userId+'?access_token='+ this.$auth.getToken().token).then(res => this.user = res.data)
    }
  },
  created(){
    this.getUsername()
  }
};
</script>

<style lang="css" scoped>
#cssNav{
background-color: #038E7C;
}

</style>