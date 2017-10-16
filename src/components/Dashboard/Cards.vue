<template>
	<div class="columns is-centered">
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Saldo/Credito total:</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <p class="title is-3 has-text-centered">S/. {{ saldo.total }}</p>
			    </div>
			  </div>
			</div>
		</div>
		<!-- end card -->
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">N° ventas del dia:</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <p class="title is-3 has-text-centered"># {{cantidad_ventas}}</p>
			    </div>
			  </div>
			</div>
		</div>
		<!-- end card -->
	</div>
</template>

<script>
export default {

  name: 'Cards',

  data () {
    return {
    	saldo: {},
    	hoy: '',
    	cantidad_ventas: 0
    };
  },
  methods:{
  	getSaldo(){
      this.$http.get('/api/Productos/saldo').then(res => this.saldo = res.data)
    },
    getNVentas(){
    	this.$http.get('/api/Venta/count?where=%7B%22fecha_venta%22%3A%22'+this.hoy+'%22%7D').then(res => this.cantidad_ventas = res.data.count)
    }
  },
  created(){
  	let d = new Date()
  	//d.setDate(d.getDate()-1)
  	this.hoy = d.toISOString().slice(0,10)
  	this.getSaldo()
  	this.getNVentas()
  }
};
</script>

<style lang="css" scoped>
.card-header{
	background-color: #E8E9F3;
}
.columns {
	background-color: #EDEEF9;
}
</style>