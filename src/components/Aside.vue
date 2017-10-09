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
				<li ><router-link :to="{ path: '/home/stock'} " replace :class="{ 'is-active': menu[3] }" @click.native="cambiar(3)"><span> Stock</span></router-link></li>
			</ul>

	  </ul>
	  <p class="menu-label">
	    <span>VENTAS</span>
	  </p>
	  <ul class="menu-list">
	  	<li ><router-link :to="{ path: '/home/registro'} " replace :class="{ 'is-active': menu[4] }" @click.native="cambiar(4)"><span>Nueva</span></router-link></li>
	  	<li ><router-link :to="{ path: '/home/ventas'} " replace :class="{ 'is-active': menu[5] }" @click.native="cambiar(5)"><span> Ventas</span></router-link></li>
			<li ><router-link :to="{ path: '/home/plan'} " replace :class="{ 'is-active': menu[6] }" @click.native="cambiar(6)"><span> Plan</span></router-link></li>
			<li ><router-link :to="{ path: '/home/producto'} " replace :class="{ 'is-active': menu[7] }" @click.native="cambiar(7)"><span> Producto</span></router-link></li>
	  </ul>

	  <p class="menu-label">
	  	<span>Asesores</span>
	  </p>
	  <ul class="menu-list">
			<li ><router-link :to="{ path: '/home/asesores'} " replace :class="{ 'is-active': menu[8] }" @click.native="cambiar(8)"><span>Lista</span></router-link></li>
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