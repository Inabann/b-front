<template>
	<b-table :data="ventas" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" detailed >
    <template scope="props">
      <b-table-column field="fecha_venta" label="Fecha Venta" sortable>
        {{ props.row.fecha_venta |moment("add", "1 days","YYYY / MM / DD") }}
      </b-table-column>
      <b-table-column field="dni" label="DNI" sortable>
        {{ props.row.dni }}
      </b-table-column>
      <b-table-column field="ref" label="N° ref" sortable>
        {{ props.row.ref }}
      </b-table-column>
      <b-table-column field="email" label="Email" sortable>
        {{ props.row.email }}
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
      <b-table-column  label="Opciones" >
        <a class="button is-danger is-small" @click="removeVenta(props.row)">Eliminar</a>
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
</template>

<script>
export default {

  name: 'Ventas',

  data () {
    return {
    	ventas: []
    };
  },
  methods: {
  	getVentas(){
  		this.$http.get('/api/Venta').then(res => this.ventas = res.data)
  	},
  	removeVenta(venta){
  		this.$http.delete('/api/Venta/'+venta.id).then( res => {
  			this.ventas.splice(this.ventas.indexOf(venta),1)
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