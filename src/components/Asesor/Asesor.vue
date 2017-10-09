<template>
  <div>
    <button class="button is-info is-medium" @click="isComponentModalActive=true"><span>Nuevo Asesor</span></button>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <ModalForm @nuevoAsesor="addNuevoAsesor($event)"></ModalForm>
    </b-modal>
    <b-table :data="asesores" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
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
        <b-table-column field="email" label="Email">
          <div v-if="props.row.email">
            {{ props.row.email }}
          </div>
        </b-table-column>
        <b-table-column field="fecha_contrato" label="Fecha Contrato" sortable>
          {{ props.row.fecha_contrato | moment("add","1 days","YYYY / MM / DD") }}
        </b-table-column>
        <b-table-column field="username" label="Usuario" sortable>
          {{ props.row.username }}
        </b-table-column>
        <b-table-column field="activo" label="Estado" sortable>
          <span :class="props.row.activo ? 'icon has-text-info': 'icon has-text-danger'">
            <i :class="props.row.activo? 'fa fa-thumbs-up':'fa fa-thumbs-down' "></i>
          </span>
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-warning is-small">Editar</a>
          <a class="button is-danger is-small">Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table> 	
  </div>
</template>

<script>

import ModalForm from '@/components/Asesor/ModalForm'

export default {
 	name: 'Asesor',
  components: { ModalForm },
  data(){
    return {
      asesores:[],
      isComponentModalActive:false  
    }
  },
  methods:{
    addNuevoAsesor(asesor){
      this.asesores.push(asesor)
    },
    getAsesores(){
      this.$http.get('/api/usuarios?access_token='+this.$auth.getToken().token).then(res => this.asesores= res.data)
    }
  },
  created(){
    this.getAsesores()
  }
}
</script>
<style lang="css" scoped>
</style>