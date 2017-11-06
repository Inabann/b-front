<template>
	<div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Editar Factura: {{ factura.codigo }}</p>
      
    </header>
    <section class="modal-card-body">
    	<b-field grouped>
	    	<b-field label="Tienda" >
	        <b-select placeholder="Seleccione una" v-model="local" v-if="factura.detalleProductos[0].productoId != 'saldo'">
	          <option v-for="option in locales" :value="option" :key="option.username"> {{ option.username }}
	          </option>
	        </b-select>
	        <b-select placeholder="Seleccione una" v-model="local" v-else disabled>
	          <option v-for="option in locales" :value="option" :key="option.username"> {{ option.username }}
	          </option>
	        </b-select>
	      </b-field>
	      <b-field label="Fecha">
	        <b-input type="date" v-model="fecha" ></b-input>
	      </b-field>
				
				<b-field label="Total">
	         <b-input type="number" v-model="total" placeholder="Total" required></b-input>
	      </b-field>
      </b-field>
			<b-table :data="ListaProductos" :mobile-cards="true" :paginated="true" per-page="7" :narrowed="true" v-if="factura.detalleProductos[0].productoId != 'saldo'">
        <template scope="props">
          <b-table-column field="productoId" label="Producto" sortable>
                {{ props.row.productoId }}
            </b-table-column>
            <b-table-column field="serie" label="Serie/Codigo" sortable>
                {{ props.row.serie }}
            </b-table-column>
            <b-table-column field="vendido" label="Vendido" sortable>
              <div class="field">
		            <b-checkbox v-model="props.row.vendido"></b-checkbox>
			        </div>
            </b-table-column>
						
            <b-table-column  label="opciones">
            	<a class="button is-warning is-small" @click="guardarProducto(props.row)">guardar</a>
              <a class="button is-danger is-small" @click="deleteProducto(props.row)">eliminar</a>
            </b-table-column>
        </template>
      </b-table>
      <b-field label="Saldo" v-else>
	         <b-input type="number" v-model="saldo" placeholder="Saldo"></b-input>
	      </b-field>
    </section>
    <footer class="modal-card-foot">
    	
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
      <button class="button is-primary" @click="guardarSaldo()" v-if="saldo != null">Saldo</button>
      <button class="button is-primary" @click="guardar()" v-else>Guardar</button>
    </footer>
	</div>
</template>

<script>
export default {
	props: ['factura'],
  name: 'ModalEdit',

  data () {
    return {
    	locales :[],
    	Editada: {},
    	local: {},
    	fecha: null,
    	total: null,
    	ListaProductos : [],
    	saldo: null
    }
  },
  methods: {
  	guardarSaldo(){
  		let n = this.saldo - this.ListaProductos[0].saldo
  		n = this.factura.usuario.saldo + n
  		this.$http.patch('/api/usuarios/'+this.factura.usuario.id+'?access_token='+ this.$auth.getToken().token,{saldo:n.toFixed(1)}).then( res => {
  			this.ListaProductos[0].saldo =  this.saldo
  			this.$http.patch('/api/DetalleProductos/'+this.ListaProductos[0].serie, {saldo: this.saldo})
  			this.$parent.close()
  			this.$toast.open({message:'Factura Editada',type: 'is-warning'})
  		})
  	},
  	guardar(){
  		this.Editada.usuarioId = this.local.id
  		this.Editada.fecha = this.fecha
  		this.Editada.total = this.total
  		this.$http.patch('/api/Facturas/'+this.factura.codigo, this.Editada).then(res => {
  			this.factura.usuarioId = this.Editada.usuarioId
  			let d = new Date(this.Editada.fecha)
  			//d.setDate(d.getDate()-1)
  			this.factura.fecha = d
  			this.factura.total = this.Editada.total
  			this.$parent.close()
  			this.$toast.open({message:'Factura Editada',type: 'is-warning'})
  		})
  	},
  	guardarProducto(producto){
  		this.$http.patch('/api/DetalleProductos/'+producto.serie, producto)
  	},
  	deleteProducto(producto){
  		this.$http.delete('/api/DetalleProductos/'+producto.serie).then(res => {
  			this.ListaProductos.splice(this.ListaProductos.indexOf(producto), 1)
  		})
  	},
  	getLocales(){
      this.$http.get('/api/usuarios?filter=%7B%22where%22%3A%7B%22admin%22%3Afalse%7D%7D&access_token='+this.$auth.getToken().token).then(res => this.locales = res.data)
    }
  },
  created(){
  	this.total = this.factura.total
  	this.local = this.factura.usuario
  	this.ListaProductos = this.factura.detalleProductos
  	this.saldo = this.factura.detalleProductos[0].saldo
  	let d = new Date(this.factura.fecha)
  	this.fecha = d.toISOString().slice(0,10)
  	this.getLocales()
  }
}
</script>

<style lang="css" scoped>
</style>