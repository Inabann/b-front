<template>
	<section>
		<div class="box">
			<h2 class="title is-5"><span>Datos del Cliente</span><span class="is-pulled-right">fecha: {{new Date()|moment("YYYY / MM / DD")}}</span></h2>
			<b-field grouped>
				<b-field label="DNI">
		      <b-input type="text" v-model="venta.dni" required />
		    </b-field>
		    <b-field label="Nombres y Apellidos" expanded>
		      <b-input type="text" />
		    </b-field>
		    <b-field label="Email" expanded>
		      <b-input type="email" v-model="venta.email" required />
		    </b-field>
		    <b-field label="N° referencia" expanded>
		      <b-input type="text" v-model="venta.ref" required />
		    </b-field>
	    </b-field>
		</div>
		<b-collapse class="card" :open.sync="isOpen">
      <div slot="trigger" class="card-header">
        <p class="card-header-title">
            Información de Portabilidad
        </p>
      </div>
      <div class="card-content">
        <div class="content">
      		<b-field grouped>
						<b-field label="Operador" expanded>
				      <b-input type="text" v-model="venta.operador"  />
				    </b-field>
				    <b-field label="Numero a Portar" expanded>
				      <b-input type="text" v-model="venta.num_porta" />
				    </b-field>
				    <b-field label="Prepago/Postpago" expanded>
				    	<div class="block">
			    			<b-radio v-model="venta.tipo_plan"
		              native-value="prepago">
		              Prepago
		            </b-radio>
		            <b-radio v-model="venta.tipo_plan"
		                native-value="postpago">
		                Postpago
		            </b-radio>
				    	</div>
				    </b-field>
			    </b-field>
        </div>
      </div>
    </b-collapse>
    <br>
    <b-collapse class="card" :open.sync="isOpen2">
      <div slot="trigger" class="card-header">
        <p class="card-header-title">
            Información de Bitel
        </p>
      </div>
      <div class="card-content">
        <div class="content">
    			<b-field grouped>
      			<b-field label="Plan Ichip" >
				      <b-autocomplete v-model="plan" placeholder="ichip 29" :data="filteredDataProd2" field="nombre" @select="option => planSelec = option"></b-autocomplete>
				    </b-field>
						<b-field label="N° SIM mobile" expanded>
				      <b-input type="text" v-model="venta.sim_chip"/>
				    </b-field>
					    <b-field label="Precio del plan" >
					  		<span class="title is-4" v-if="planSelec">S/. {{planSelec.monto}}</span>
					    </b-field>
					    <b-field label="Descuento del plan" expanded>
					  		<span class="title is-4" v-if="planSelec">S/. {{planSelec.descuento}}</span>
					    </b-field>
			    </b-field>
			    <b-field grouped>
						<b-field label="Equipo" >
				      <b-autocomplete v-model="producto" placeholder="ej. j5" :data="filteredDataProd" field="nombre" @select="option => productoSelec = option" ></b-autocomplete>
				    </b-field>
				    <b-field label="N° SIM equipo" expanded>
				      <b-input type="text" v-model="venta.sim_equipo"/>
				    </b-field>
				    <b-field label="Precio del equipo" expanded>
				  		<span class="title is-4" >S/. {{ precioEquipo }}</span>
				    </b-field>
			    </b-field>
			    <a class="button is-success" @click="saveVenta">
						<span class="icon">
							<i class="fa fa-check"></i>
						</span>
			  	</a>
        </div>
      </div>
    </b-collapse>
	</section>
</template>

<script>
export default {

  name: 'Registro',

  data () {
    return {
    	venta:{
    		dni:'',
    		email:'',
    		ref:'',
    		operador: '',
    		num_porta: '',
    		tipo_plan:'',
    		sim_chip:'',
    		sim_equipo:'',
    		plan: '',
    		fecha_venta:''
    	},
    	isOpen: false,
    	isOpen2: true,
    	//autocomplete
    	productos: [],
      producto: '',
      productoSelec: null,
      planes: [],
      plan: '',
      planSelec: null,
      //
      packs: [],
      saldo: {}
    };
  },
  methods: {
  	saveVenta(){
  		this.venta.equipo = this.productoSelec.nombre
  		this.venta.plan = this.planSelec.nombre
  		this.venta.descuento = this.planSelec.descuento
  		this.venta.precio = this.precioEquipo
      this.venta.usuarioId = this.$auth.getToken().userId
  		let d = new Date()
  		d.setDate(d.getDate()-1)
  		this.venta.fecha_venta = d.toISOString().slice(0,10)
  		this.$http.post('/api/Venta', this.venta).then(res => {
  			this.vendido(this.venta.sim_chip)
  			this.vendido(this.venta.sim_equipo)
  			this.$http.patch('/api/Productos/saldo',{total: this.saldo.total - this.venta.descuento}).then(res2=> {
  				console.log('venta y saldo restado')
  			})
  		})
  	},
  	vendido(serie){
  		this.$http.patch('/api/DetalleProductos/'+serie, {vendido : true})
  	},
  	getProductos(){
      this.$http.get('/api/Productos').then(res => this.productos = res.data)
    },
    getPlanes(){
      this.$http.get('/api/Plans').then(res => this.planes = res.data)
    },
    getPacks(){
    	this.$http.get('/api/Packs').then(res => this.packs = res.data)
    },
    getSaldo(){
    	this.$http.get('/api/Productos/saldo').then(res => this.saldo = res.data)
    }
  },
  computed:{
    filteredDataProd(){
      return this.productos.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.producto.toLowerCase()) >= 0
      })
    },
    filteredDataProd2(){
      return this.planes.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.plan.toLowerCase()) >= 0
      })
    },
    precioEquipo(){
    	if(this.productoSelec != null && this.planSelec != null){
    		var item = this.packs.filter((pack) => {
	        return pack.equipo.match(this.productoSelec.nombre) && pack.planId.match(this.planSelec.id);
	      })
	      if( item.length != 0){
	      	return item[0].precio
	      }else{
	      	return 'Equipo no disponible en este plan'
	      }      
    	} else {
    		return 0
    	}
    }
  },
  created: function(){
    this.getProductos()
    this.getPlanes()
    this.getPacks()
    this.getSaldo()
  }
};
</script>

<style lang="css" scoped>
</style>