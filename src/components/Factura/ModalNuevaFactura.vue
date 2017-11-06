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
      <b-field label="Tienda" required>
        <b-select placeholder="Seleccione una" v-model="local">
          <option v-for="option in locales" :value="option" :key="option.username"> {{ option.username }}
          </option>
        </b-select>
      </b-field>
    	<b-field grouped>
        <b-field label="Numero de serie" required>
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
        
        <b-field label="Saldo" expanded v-if="recarga">
            <b-field>
              <b-input type="number" v-model="num_serie" placeholder="cantidad" required></b-input>
            </b-field>
        </b-field>
    	</b-field>
      <b-field grouped v-if="!recarga">
        <b-field label="Serie/Codigo" expanded >
          <b-input type="string" v-model="num_serie" placeholder="serie/codigo" required></b-input>
        </b-field>
        <b-field label="Siguientes">
          <b-input type="number" v-model="hasta" ></b-input>
        </b-field>
      </b-field>
        <button class="button is-success" @click="addProducto" v-if="!recarga">agregar</button>

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
      <b-table :data="productosAgregados" :mobile-cards="true" :paginated="true" per-page="7" v-if="!recarga">
        <template scope="props">
          <b-table-column field="productoId" label="Producto" sortable>
                {{ props.row.productoId }}
            </b-table-column>
            <b-table-column field="serie" label="Serie/Codigo" sortable>
                {{ props.row.serie }}
            </b-table-column>

            <b-table-column  label="opciones">
                <a class="button is-danger is-small" @click="eliminar(props.row)">eliminar</a>
            </b-table-column>
        </template>
      </b-table>
    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cerrar</button>
        <button class="button is-primary" @click="guardar" v-if="!recarga">Guardar</button>
        <button class="button is-primary" @click="addSaldo" v-if="recarga">Agregar Saldo</button>
    </footer>
	</div>
</template>

<script>
import BigInt from 'big-integer'

export default {

  name: 'ModalNuevaFactura',

  data () {
    return {
    	factura: {
    		codigo: '',
    		fecha: '',
    		total: '',
        usuarioId: ''
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
      opciones: false,
      locales: [],
      local: '',
      hasta: 0,
      saldo: 0
    };
  },
  methods: {
  	getProductos(){
  		this.$http.get('/api/Productos').then(res => this.productos = res.data)
  	},
  	addProducto(){
      if(this.hasta == 0){
        this.productosAgregados.push({serie: this.num_serie, productoId:this.productoSelec.nombre, usuarioId: this.usuarioId})
      } else {
        for (let i = 0; i <= this.hasta; i++) { 
          let n = BigInt(this.num_serie).add(i).toString()
          this.productosAgregados.push({serie: n, productoId:this.productoSelec.nombre, usuarioId: this.usuarioId})
        }
      }
  		
  	},
  	guardar(){
      this.factura.usuarioId = this.local.id
  		this.$http.post('/api/Facturas', this.factura).then(res => {
  			this.productosAgregados.forEach( item => {
  				this.$http.post('/api/DetalleProductos', {serie: item.serie, productoId: item.productoId, facturaId: res.data.codigo, usuarioId: this.local.id})
  			})
        this.$emit('facturaAgregada', res.data)
        this.$toast.open({message:'Factura Agregada',type: 'is-success'})
  			this.$parent.close()
  		})
  	},
    addSaldo(){
      this.factura.usuarioId = this.local.id
      this.$http.get('/api/usuarios/'+this.local.id+'?access_token='+this.$auth.getToken().token).then(res2 => {
        this.saldo = res2.data.saldo
        this.$http.post('/api/Facturas', this.factura).then(res => {
          this.$http.post('/api/DetalleProductos', {serie: res.data.codigo, productoId: 'saldo', facturaId: res.data.codigo, saldo: this.num_serie, usuarioId: this.local.id}).then(() => {
            this.$http.patch('/api/usuarios/'+this.local.id+'?access_token='+this.$auth.getToken().token, {saldo: this.saldo + Number(this.num_serie)})
          })
          this.$emit('facturaAgregada', res.data)
          this.$toast.open({message:'Factura Agregada',type: 'is-success'})
          this.$parent.close()   
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
    },
    getLocales(){
      this.$http.get('/api/usuarios?filter=%7B%22where%22%3A%7B%22admin%22%3Afalse%7D%7D&access_token='+this.$auth.getToken().token).then(res => this.locales = res.data)
    },
    getSaldo(userId){
      this.$http.get('/api/usuarios/'+userId+'?access_token='+this.$auth.getToken().token).then(res => {
        this.saldo = res.data.saldo
        console.log(this.saldo, 'funcion')
      })
    },
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
    this.getLocales()
  }
};
</script>

<style lang="css" scoped>
</style>