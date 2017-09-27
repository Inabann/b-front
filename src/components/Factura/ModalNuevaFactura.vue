<template>
	<div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Nueva Factura</p>
    </header>
    <section class="modal-card-body">
    	<b-field grouped>
        <b-field label="Numero de serie">
           <b-input type="text" v-model="factura.codigo" placeholder="Numero de serie" required></b-input>
        </b-field>

        <b-field label="Fecha">
          <b-input type="date" v-model="factura.fecha" :max="hoy" required></b-input>
        </b-field>

        <b-field label="Total">
           <b-input type="number" v-model="factura.total" placeholder="Total" required></b-input>
        </b-field>
      </b-field>
      <b-field grouped>
      	<b-field label="Producto" expanded>
            <b-autocomplete v-model="producto" placeholder="ej. j5" :data="filteredDataProd" field="nombre" @select="option => productoSelec = option" required></b-autocomplete>
        </b-field>
        <b-field label="Serie/Codigo" expanded>
            <b-field>
                <b-input type="number" v-model="num_serie" placeholder="serie/codigo" required></b-input>
                <button class="button is-success" @click="addProducto">agregar</button>
            </b-field>
        </b-field>
    	</b-field>
	    <table class="table is-narrow is-fullwidth">
	    	<thead>
	    		<tr>
	    			<th>Producto</th>
	    			<th>Serie/Codigo</th>
	    			<th>Opciones</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<tr v-for="item in productosAgregados">
	    			<td>{{item.productoId}}</td>
	    			<td>{{item.serie}}</td>
	    			<td><a class="button is-danger is-small" @click="eliminar(item)">eliminar</a></td>
	    		</tr>
	    	</tbody>
	    </table>
    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click="guardar">Guardar</button>
    </footer>
	</div>
</template>

<script>
export default {

  name: 'ModalNuevaFactura',

  data () {
    return {
    	factura: {
    		codigo: '',
    		fecha: '',
    		total: ''
    	},
    	num_serie: '',
    	productosAgregados: [],
    	hoy: '',
    	productos: [],
    	producto: '',
    	productoSelec: null
    };
  },
  methods: {
  	getProductos(){
  		this.$http.get('/api/Productos').then(res => this.productos = res.data)
  	},
  	addProducto(){
  		this.productosAgregados.push({serie: this.num_serie, productoId:this.productoSelec.nombre})
  	},
  	guardar(){
  		this.$http.post('/api/Facturas', this.factura).then(res => {
  			this.productosAgregados.forEach( item => {
  				this.$http.post('/api/DetalleProductos', {serie: item.serie, productoId: item.productoId, facturaId: res.data.codigo})
  			})
  			this.$parent.close()
  		})
  	},
  	eliminar(item){
  		this.productosAgregados.splice(this.productosAgregados.indexOf(item), 1)
  	}
  },
  computed: {
  	filteredDataProd(){
  		return this.productos.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.producto.toLowerCase()) >= 0
      })
  	}
  },
  created(){
  	let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();
		if(dd<10){
		  dd='0'+dd
		} 
		if(mm<10){
		  mm='0'+mm
		} 
		today = yyyy+'-'+mm+'-'+dd;
		this.hoy = today //maximo para escoger fecha
		this.factura.fecha = today //por defecto la fecha sera hoy
		this.getProductos()
  }
};
</script>

<style lang="css" scoped>
</style>