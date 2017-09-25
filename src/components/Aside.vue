<template>
	<aside class="menu">
	<img src="../assets/image (1).png">
	  <p class="menu-label">
	   <span >General</span>
	  </p>
 		<ul class="menu-list">
			<ul class="menu-list">
				<li ><router-link :to="{ path: '/home/dashboard'} " replace :class="{ 'is-active': menu[0] }" @click.native="cambiar(0)"><span> Dashboard</span></router-link></li>
			</ul>
	  </ul>
	  <p class="menu-label">
	    <span >Inventario</span>
	  </p>
	  <ul class="menu-list">
			<ul class="menu-list">
				<li ><router-link :to="{ path: '/home/facturas'} " replace :class="{ 'is-active': menu[2] }" @click.native="cambiar(2)"><span> Facturas</span></router-link></li>
			</ul>

	  </ul>
	  <p class="menu-label">
	    <span>VENTAS</span>
	  </p>
	  <ul class="menu-list">
			<ul class="menu-list">
				<li ><router-link :to="{ path: '/home/plan'} " replace :class="{ 'is-active': menu[4] }" @click.native="cambiar(4)"><span> Plan</span></router-link></li>
			</ul>
	  </ul>
	  <p class="menu-label">
	  	<span>Cliente</span>
	  </p>
	  <ul class="menu-list">

	  </ul>
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	</aside>
</template>

<script>

export default {

  name: 'appMenu',

  data () {
    return {
    	menu: [true, false, false, false, false, false, false]
    };
  },
  methods: {
  	cambiar(opcion){
  		this.menu = [false, false, false, false, false, false, false]
  		this.menu[opcion] = true
  	}
  }
};
</script>

<style lang="css" scoped>
.menu-label span{
	color: #038E7C;
}
.menu-list span{
	color: white;
}
.menu-list a:hover span {
	color: black;
}

</style>