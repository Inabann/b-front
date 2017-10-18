<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="has-text-centered title"><span class="has-text-info">Relacion de Asesores</span></h1>
      </div>  
      <div class="column is-offset-4">
        <button class="button is-warning is-medium" @click="isComponentModalActive=true"><span class="icon">
        <i class="fa fa-plus"></i></span><span>Nuevo Asesor</span></button>
      </div> 
   </div>
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
        <b-table-column field="fecha_contrato" label="Fecha Contrato" sortable>
          {{ props.row.fecha_contrato | moment("add","1 days","YYYY / MM / DD") }}
        </b-table-column>
        <b-table-column field="activo" label="Estado" sortable>
          <span :class="props.row.activo ? 'icon has-text-info': 'icon has-text-danger'">
            <i :class="props.row.activo? 'fa fa-thumbs-up':'fa fa-thumbs-down' "></i>
          </span>
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-warning is-small" @click="editarAsesor(props.row)">Editar</a>
          <a class="button is-danger is-small" @click="eliminarAsesor(props.row)">Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
    <b-modal :active.sync="isComponentModalActive2" has-modal-card>
      <EditarModal :asesor="editAsesor" @editado="cambiar($event)"></EditarModal>
    </b-modal> 	
  </div>
</template>

<script>
import EditarModal from '@/components/Asesor/EditarModal'
import ModalForm from '@/components/Asesor/ModalForm'

export default {
 	name: 'Asesor',
  components: { ModalForm, EditarModal },
  data(){
    return {
      asesores:[],
      isComponentModalActive:false,
      isComponentModalActive2:false,
      editAsesor: {}  
    }
  },
  methods:{
    addNuevoAsesor(asesor){
      this.asesores.push(asesor)
    },
    getAsesores(){
      this.$http.get('/api/Asesors').then(res => this.asesores= res.data)
    },
    editarAsesor(asesor){
      this.editAsesor = asesor
      this.isComponentModalActive2 = true
    },
    eliminarAsesor(asesor){
      this.$dialog.confirm({
        title: 'Eliminar Asesor',
        message: '¿Esta seguro de <strong>eliminar</strong> a este Asesor de su registro? Esta accion no se puede deshacer.',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({message:'Asesor eliminado',position: 'is-bottom',type: 'is-danger'})
          this.$http.delete('/api/Asesors/'+asesor.id+'?access_token='+this.$auth.getToken().token).then( res => {
          this.asesores.splice(this.asesores.indexOf(asesor), 1)
          });  
        }
      })
    },
    cambiar(asesor){
      this.asesores[this.asesores.indexOf(this.editAsesor)] = asesor
    }
  },
  created(){
    this.getAsesores()
  }
}
</script>
<style lang="css" scoped>
</style>