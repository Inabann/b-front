<template>
	<section>
    <b-collapse class="card" :open.sync="isOpen3">
      <div slot="trigger" class="card-header">
        <p class="card-header-title">
          <span>Datos del Cliente</span>
        </p>
        <p class="card-header-icon">
          <span class="title is-5">fecha: {{new Date()|moment("YYYY / MM / DD")}}</span>
        </p>
      </div>
      <div class="card-content">
        <div class="content">
          <b-field grouped>
            <b-field label="DNI">
              <b-input type="text" v-model="venta.dni"  />
            </b-field>
            <b-field label="Nombres y Apellidos" expanded>
              <b-input type="text"  v-model="venta.nombre"/>
            </b-field>
            <b-field label="Email" expanded>
              <b-input type="email" v-model="venta.email"  />
            </b-field>
            <b-field label="N° referencia" expanded>
              <b-input type="text" v-model="venta.ref"  />
            </b-field>
          </b-field>
        </div>
      </div>
    </b-collapse>
    <br>

		<b-collapse class="card" :open.sync="isOpen">
      <div slot="trigger" class="card-header">
        <p class="card-header-title">
            Información de Portabilidad/Migración
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
            Linea Nueva
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
				    <b-field label="Precio del plan" expanded v-show="!precioEquipo">
				  		<span class="title is-4" v-if="planSelec">S/. {{planSelec.monto}}</span>
				    </b-field>
			    </b-field>
          
          <b-switch v-model="equipo"
              true-value="Con"
              false-value="Sin">
              {{ equipo }} Equipo
          </b-switch>

			    <b-field grouped v-if="equipo == 'Con'">
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
          <b-field grouped>
            <b-field label="Asesor" >
              <b-autocomplete v-model="asesor" :data="filteredDataProd3" field="nombre" @select="option => asesorSelec = option"></b-autocomplete>
            </b-field>
            <b-field label="Local" v-if="this.$auth.getToken().admin == 'true'">
              <b-select placeholder="Selecciona un local" @input="option => setSaldo(option)" v-model="local">
                  <option
                      v-for="option in localesSinAdmin"
                      :value="option"
                      :key="option.id">
                      {{ option.username }}
                  </option>
              </b-select>
          </b-field>
          </b-field>
			    <a class="button is-success" @click="saveVenta()">
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
        nombre: '',
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
      isOpen3: false,
    	//autocomplete
      asesores: [],
      asesor: '',
      asesorSelec: null,
    	productos: [],
      producto: '',
      productoSelec: null,
      planes: [],
      plan: '',
      planSelec: null,
      //
      packs: [],
      saldo: 0,
      locales: [],
      localSelec: null,
      local : '',
      equipo: 'Sin'
    };
  },
  methods: {
  	saveVenta(){
      if(this.productoSelec) this.venta.equipo = this.productoSelec.nombre
  		if(this.planSelec) {
        this.venta.plan = this.planSelec.nombre
        this.venta.descuento = this.planSelec.descuento
      }
      let n = this.saldo - Number(this.venta.descuento)
  		if(this.precioEquipo) this.venta.precio = this.precioEquipo
      this.venta.asesorId = this.asesorSelec.id
  		let d = new Date()
  		d.setDate(d.getDate()-1)
  		this.venta.fecha_venta = d.toISOString().slice(0,10)
      this.venta.usuarioId = this.localSelec
  		this.$http.post('/api/Venta', this.venta).then(res => {
  			if(this.venta.sim_chip) this.vendido(this.venta.sim_chip)
        if(this.venta.sim_equipo) this.vendido(this.venta.sim_equipo)

  			this.$toast.open({message:'Venta exitosa',type: 'is-success'})
  			this.$http.patch('/api/usuarios/'+this.localSelec+'?access_token='+ this.$auth.getToken().token,{saldo: n.toFixed(1)}).then(()=> {
  				this.venta = {}
          this.planSelec = null
          this.productoSelec = null
          this.asesorSelec = null
          this.asesor = ''
          this.producto = ''
          this.plan = ''
          this.locales = []
          this.localSelec = ''
          this.local = ''
          this.getLocales()
  			})
  		})
  	},
  	vendido(serie){
  		this.$http.patch('/api/DetalleProductos/'+serie, {vendido : true})
  	},
  	getProductos(){
      this.$http.get('/api/Productos?filter=%7B%22where%22%3A%7B%22tipo%22%3A%22equipo%22%7D%7D').then(res => this.productos = res.data)
    },
    getPlanes(){
      this.$http.get('/api/Plans').then(res => {
        this.planes = res.data
      })
    },
    getPacks(){
    	this.$http.get('/api/Packs').then(res => this.packs = res.data)
    },
    getSaldo(){
    	this.$http.get('/api/usuarios/'+this.$auth.getToken().userId+'?access_token='+ this.$auth.getToken().token).then(res => {
        this.saldo = res.data.saldo
      })
    },
    setSaldo(local){
      if(local != null){
        this.saldo = local.saldo
        this.localSelec = local.id
      }
    },
    getPlanes(){
      this.$http.get('/api/Asesors').then(res => this.asesores = res.data)
    },
    getLocales(){
      this.$http.get('/api/usuarios?access_token='+this.$auth.getToken().token).then(res => {
        this.locales = res.data
        if(this.$auth.getToken().admin == 'false') {
          let a
          a = this.locales.find( option => {
            return option.id === this.$auth.getToken().userId
          })
          this.saldo = a.saldo
          this.localSelec = a.id
        }
      })//filter=%7B%22where%22%3A%7B%22admin%22%3Afalse%7D%7D&
    }
  },
  computed:{
    filteredDataProd(){
      return this.productos.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.producto) >= 0
      })
    },
    filteredDataProd2(){
      return this.planes.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.plan) >= 0
      })
    },
    filteredDataProd3(){
      return this.asesores.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.asesor) >= 0
      })
    },
    localesSinAdmin(){
      return this.locales.filter((option) => {
        return !option.admin
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
    this.getPlanes()
    this.$http.get('/api/Plans').then(res => {
        this.planes = res.data
    })
    this.getProductos()
    this.getPacks()
    this.getLocales()
    
  }
};
</script>

<style lang="css" scoped>
</style>