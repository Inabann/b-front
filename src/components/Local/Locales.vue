<template>
  <div>
    <button class="button is-info is-medium" @click="isComponentModalActive=true"><span>Nuevo Local</span></button>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <ModalForm @nuevoAsesor="addNuevoAsesor($event)"></ModalForm>
    </b-modal>
    <b-table :data="asesores" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
      <template scope="props">
        <b-table-column field="username" label="Usuario" sortable>
          {{ props.row.username }}
        </b-table-column>

        <b-table-column  label="Opciones" >
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

import ModalForm from '@/components/Asesor/ModalForm'

export default {
 	name: 'Locales',
  components: { ModalForm },
  data(){
    return {
      asesores:[],
      isComponentModalActive:false,
      editAsesor: {}  
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
      this.$http.delete('/api/usuarios/'+local.id+'?access_token='+this.$auth.getToken().token).then( res => {
        this.asesores.splice(this.asesores.indexOf(local), 1)
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