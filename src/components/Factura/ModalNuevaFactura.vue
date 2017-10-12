<template>
	<div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nueva Factura</p>
      <a class="modal-card-header-icon">
        <b-switch :value="false" v-model="recarga"
          type="is-info">
            Saldo
        </b-switch>
      </a>
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
      	<b-field label="Producto" expanded v-if="!recarga">
          <b-field>
            <b-autocomplete v-model="producto" placeholder="ej. j5" :data="filteredDataProd" field="nombre" @select="option => productoSelec = option" required v-if="!opciones" ></b-autocomplete>
            <!-- Agregar nuevo producto -->
            <b-input type="text" v-model="agregarProducto.nombre" placeholder="nombre" v-if="opciones"></b-input>
            <button class="button is-success" @click="nuevoProducto" v-if="opciones"><span class="icon is-small" >
              <i class="fa fa-plus"></i>
            </span></button>
            <button class="button is-info" @click="opciones = !opciones"><span class="icon is-small">
              <i :class="opciones ? 'fa fa-reply' : 'fa fa-pencil-square-o'"></i>
            </span></button>
          </b-field>
        </b-field>
        <b-field label="Serie/Codigo" expanded v-if="!recarga">
            <b-field>
                <b-input type="number" v-model="num_serie" placeholder="serie/codigo" required></b-input>
                <button class="button is-success" @click="addProducto">agregar</button>
            </b-field>
        </b-field>
        <b-field label="Saldo" expanded v-if="recarga">
            <b-field>
              <b-input type="number" v-model="num_serie" placeholder="cantidad" required></b-input>
            </b-field>
        </b-field>
    	</b-field>
      <!-- tipo del producto nuevo -->
      <div class="block" v-if="!lock">
        <b-radio v-model="agregarProducto.tipo"
            native-value="equipo">
            Equipo
        </b-radio>
        <b-radio v-model="agregarProducto.tipo"
            native-value="chip">
            Chip
        </b-radio>
      </div>
      <!-- end -->
	    <table class="table is-narrow is-fullwidth" v-if="!recarga">
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
        <button class="button" type="button" @click="$parent.close()">Cerrar</button>
        <button class="button is-primary" @click="guardar" v-if="!recarga">Guardar</button>
        <button class="button is-primary" @click="addSaldo" v-if="recarga">Agregar Saldo</button>
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
    	productoSelec: null,
      recarga: false,
      agregarProducto: {
        tipo: 'equipo'
      },
      opciones: false
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
        this.$emit('facturaAgregada', res.data)
  			this.$parent.close()
  		})
  	},
    addSaldo(){
      this.$http.post('/api/Facturas', this.factura).then(res => {
        this.$http.post('/api/DetalleProductos', {serie: this.factura.codigo, productoId: 'saldo', facturaId: res.data.codigo, saldo: this.num_serie}).then(resp => {
          this.$http.get('/api/Productos/saldo').then(respo => {
            this.$http.put('/api/Productos/saldo', {total: respo.data.total + Number(this.num_serie), tipo: 'saldo'}).then(response => {
              this.$emit('facturaAgregada', res.data)
              this.$parent.close()
            })
          })
        })   
      })
    },
  	eliminar(item){
  		this.productosAgregados.splice(this.productosAgregados.indexOf(item), 1)
  	},
    nuevoProducto(){
      this.$http.post('/api/Productos',this.agregarProducto).then( res => {
        this.productoSelec = res.data
        this.producto = res.data.nombre
        this.opciones = false
      })
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
  	},
    lock(){
      return !(!this.recarga && this.opciones)
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