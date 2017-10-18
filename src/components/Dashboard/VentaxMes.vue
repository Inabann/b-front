<template>
	<div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Ventas del {{fecha}}</p>
        
    </header>
    <section class="modal-card-body">
      <b-table :data="ventasFiltradas" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" detailed >
		    <template scope="props">
		      <b-table-column field="dni" label="DNI" sortable>
		        {{ props.row.dni }}
		      </b-table-column>
		      <b-table-column field="ref" label="N° ref" sortable>
		        {{ props.row.ref }}
		      </b-table-column>
		      <b-table-column field="plan" label="Plan" sortable>
		        {{ props.row.plan }}
		      </b-table-column>
		      <b-table-column field="sim_chip" label="SIM Chip" >
		        {{ props.row.sim_chip }}
		      </b-table-column>
		      <b-table-column field="equipo" label="Equipo" >
		      	<div v-if="props.row.equipo">
		      		{{ props.row.equipo }}
		      	</div>
		      </b-table-column>
		      <b-table-column field="sim_equipo" label="Serie" >
		      	<div v-if="props.row.sim_equipo">
		      		{{ props.row.sim_equipo }}
		      	</div>
		      </b-table-column>
		    </template>
		    <template slot="detail" scope="props">
		      <article class="media">
		        <div class="media-content">
		          <div class="content">
		            <p v-if="props.row.operador">
		              <strong>{{ props.row.operador }} </strong>
		              <small>{{ props.row.num_porta }}</small>
		              <small>{{ props.row.tipo_plan }}</small>
		            </p>
		          </div>
		        </div>
		      </article>
		  	</template>
		    <div slot="empty" class="has-text-centered">
		      Cargando ...
		    </div>
		  </b-table>
    </section>
  </div>
</template>

<script>
export default {
	props: ['fecha', 'usuarioId'],
  name: 'VentaxMes',

  data () {
    return {
    	ventas: []
    };
  },
  methods:{
  	getVentas(){
  		let datos = {}
  		datos.fecha = this.fecha
  		datos.usuarioId = this.usuarioId
  		this.$http.post('/api/Venta/VentaxAsesor',{datos: datos}).then(res => {
  			this.ventas = res.data
  		})
  	}
  },
  computed:{
  	ventasFiltradas(){
  		return this.ventas.filter(venta => {
  			return venta.asesorId.match(this.usuarioId)
  		})
  	}
  },
  created(){
  	this.getVentas()
  }
};
</script>

<style lang="css" scoped>
</style>