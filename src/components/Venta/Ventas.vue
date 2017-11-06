<template>
	<b-table :data="ventas" :mobile-cards="true" :paginated="true" per-page="10" :default-sort-direction="'desc'" default-sort="fecha_venta" detailed >
    <template scope="props">
      <b-table-column field="fecha_venta" label="Fecha Venta" sortable>
        {{ props.row.fecha_venta |moment("add", "1 days","YYYY / MM / DD") }}
      </b-table-column>
      <b-table-column field="dni" label="DNI" sortable>
        {{ props.row.dni }}
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
            <p>
              <!-- <small v-if="!props.row.operador && !props.row.tipo_plan && props.row.num_porta">Migracion</small> saber si es migracion-->
              <strong>{{ props.row.num_porta }}</strong>
              <strong>{{ props.row.operador }} </strong>
              <small>{{ props.row.tipo_plan }}</small>
            </p>
            <p>
              <strong>{{props.row.ref}}</strong>
              <small>{{props.row.email}}</small>
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
    getVentasxLocal(){
      this.$http.get( '/api/Venta?filter=%7B%22where%22%3A%7B%22usuarioId%22%3A%22'+this.$auth.getToken().userId+'%22%7D%7D').then(res => this.ventas = res.data)
    },
    removeVenta(venta){
      this.$dialog.confirm({
        title: 'Eliminar Venta',
        message: '¿Esta seguro de <strong>eliminar</strong> esta Venta? Esta accion no se puede deshacer.',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({message:'Venta eliminada',position: 'is-bottom',type: 'is-danger'})
         this.$http.delete('/api/Venta/'+venta.id).then( res => {
        this.ventas.splice(this.ventas.indexOf(venta),1)
          });  
        }
      })
    }
  },
  created(){
    if(this.$auth.getToken().admin == 'true') this.getVentas()
    else this.getVentasxLocal()
  }
};
</script>

<style lang="css" scoped>
</style>