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
	    <span >Existencias</span>
	  </p>
	  <ul class="menu-list">
			<ul class="menu-list">
				<li ><router-link :to="{ path: '/home/facturas'} " replace :class="{ 'is-active': menu[2] }" @click.native="cambiar(2)"><span> Compras/Facturas</span></router-link></li>
				<li ><router-link :to="{ path: '/home/stock'} " replace :class="{ 'is-active': menu[3] }" @click.native="cambiar(3)"><span> Stock Disponible</span></router-link></li>
				<li ><router-link :to="{ path: '/home/packs'} " replace :class="{ 'is-active': menu[4] }" @click.native="cambiar(4)"><span> Packs</span></router-link></li>
				<li ><router-link :to="{ path: '/home/producto'} " replace :class="{ 'is-active': menu[8] }" @click.native="cambiar(8)"><span> Productos</span></router-link></li>
			</ul>

	  </ul>
	  <p class="menu-label">
	    <span>VENTAS</span>
	  </p>
	  <ul class="menu-list">
	  	<li ><router-link :to="{ path: '/home/registro'} " replace :class="{ 'is-active': menu[5] }" @click.native="cambiar(5)"><span>Registrar Venta</span></router-link></li>
	  	<li ><router-link :to="{ path: '/home/ventas'} " replace :class="{ 'is-active': menu[6] }" @click.native="cambiar(6)"><span> Numero de Ventas</span></router-link></li>
	  	<li ><router-link :to="{ path: '/home/pagos'} " replace :class="{ 'is-active': menu[11] }" @click.native="cambiar(11)"><span> Pagos/Recargas</span></router-link></li>
			<li ><router-link :to="{ path: '/home/plan'} " replace :class="{ 'is-active': menu[7] }" @click.native="cambiar(7)"><span> Planes</span></router-link></li>
			
	  </ul>

	  <p class="menu-label">
	  	<span>Administrar</span>
	  </p>
	  <ul class="menu-list">
			<li ><router-link :to="{ path: '/home/asesores'} " replace :class="{ 'is-active': menu[9] }" @click.native="cambiar(9)"><span>Asesores</span></router-link></li>
			<li v-if="this.$auth.getToken().admin == 'true'"><router-link :to="{ path: '/home/locales'} " replace :class="{ 'is-active': menu[10] }" @click.native="cambiar(10)"><span>Locales</span></router-link></li>
	  </ul>

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
	color: black;
}
.menu-list a:hover span {
	color: black;
}

</style>