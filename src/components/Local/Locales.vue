<template>
  <div>
   <div class="columns">
      <div class="column">
        <h1 class="has-text-centered title"><span class="has-text-info">Tiendas</span></h1>
      </div>  
      <div class="column is-offset-4">
        <button class="button is-warning is-medium" @click="isComponentModalActive=true"><span class="icon">
        <i class="fa fa-plus"></i></span><span>Nueva Tienda</span></button>
      </div> 
   </div> 
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <ModalForm @nuevoAsesor="addNuevoAsesor($event)" @UsuarioEdit="usuarioEdit($event)" :edit="editlocal"></ModalForm>
    </b-modal>
    <b-table :data="sinAdmin" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
      <template scope="props">
        <b-table-column field="username" label="Usuario" sortable>
          {{ props.row.username }}
        </b-table-column>

        <b-table-column  label="Opciones" >
          <a class="button is-warning is-small" @click="editLocal(props.row)">Editar</a>
          <a class="button is-danger is-small" @click="removeLocal(props.row)">Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
  </div>
</template>

<script>

import ModalForm from '@/components/Local/ModalForm'

export default {
 	name: 'Locales',
  components: { ModalForm },
  data(){
    return {
      asesores:[],
      isComponentModalActive:false,
      editlocal: {}  
    }
  },
  methods:{
    addNuevoAsesor(asesor){
      this.asesores.push(asesor)
    },
    getAsesores(){
      this.$http.get('/api/usuarios?access_token='+this.$auth.getToken().token).then(res => this.asesores= res.data)
    },
    removeLocal(local){
      this.$dialog.confirm({
        title: 'Eliminar Asesor',
        message: '¿Esta seguro de <strong>eliminar</strong> a este Asesor de su registro? Esta accion no se puede deshacer.',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({message:'Asesor eliminado',position: 'is-bottom',type: 'is-danger'})
          this.$http.delete('/api/usuarios/'+local.id+'?access_token='+this.$auth.getToken().token).then( res => {
          this.asesores.splice(this.asesores.indexOf(local), 1)
          });  
        }
      })
    },
    editLocal(editlocal){
      this.editlocal = editlocal
      this.isComponentModalActive = true
    },
    usuarioEdit(local){
      this.sinAdmin[this.sinAdmin.indexOf(this.editlocal)] = local
    }
  },
  computed: {
    sinAdmin(){
      return this.asesores.filter(option => {
        return !option.admin
      })
    }
  },
  created(){
    this.getAsesores()
  }
}
</script>
<style lang="css" scoped>
</style>