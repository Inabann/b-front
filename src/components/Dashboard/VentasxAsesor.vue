<template>
	<div class="card">
		<header class="card-header">
			<h1 class="card-header-title">Asesores</h1>
			<div class="field is-grouped is-grouped-right card-header-icon">
			<p class="control"><input type="number" class="input is-small" v-model="año" style="width: 60px"></p>
			<p class="control"><input type="number" class="input is-small" v-model="mes" style="width: 60px"></p>	
			</div>
		</header><!-- /header -->
	  <div class="card-content">
	    <div class="content">
	       <b-table :data="activos" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
		      <template scope="props">
		        <b-table-column field="dni" label="DNI" sortable>
		          {{ props.row.dni }}
		        </b-table-column>
		        <b-table-column field="nombre" label="Nombres y Apellidos" sortable>
		          {{ props.row.nombre }}
		        </b-table-column>
		        <b-table-column field="telf" label="Telefono">
		          <div v-if="props.row.telf">
		            {{ props.row.telf }}
		          </div>
		        </b-table-column>
		        <b-table-column  label="Opciones" >
		          <a class="button is-info is-small" @click="isComponentModalActive=true; usuario=props.row.id">Ventas</a>
		        </b-table-column>
		      </template>
		      <div slot="empty" class="has-text-centered">
		        Cargando ...
		      </div>
		    </b-table>
		    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
		      <VentaxMes :fecha="año+'-'+mes" :usuarioId="usuario"></VentaxMes>
		  	</b-modal>
	    </div>
	  </div>
	  
	</div>
</template>

<script>
import VentaxMes from '@/components/Dashboard/VentaxMes'

export default {

  name: 'VentasxAsesor',
  components: {VentaxMes},
  data () {
    return {
    	año: '',
    	mes: '',
    	asesores: [],
    	isComponentModalActive: false,
    	canCancel: ['escape', 'x', 'outside'],
    	usuario: ''
    };
  },
  methods: {
  	getAsesores(){
  		this.$http.get('/api/Asesors').then(res => this.asesores= res.data)
  	}
  },
  computed:{
  	activos: function(){
  		return this.asesores.filter((asesor) => {
        return asesor.activo;
      });
  	}
  },
  created(){
  	let d = new Date()
  	d.setDate(d.getDate()-1)
  	this.hoy = d.toISOString().slice(0,10)
  	this.año = d.getFullYear()
  	this.mes = d.getMonth()+1
  	this.getAsesores()
  }
};
</script>

<style lang="css" scoped>
</style>