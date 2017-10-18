<template>
	<div class="container">
	  <div class="columns">
	    <div class="column">
	      <h1 class="has-text-centered title"><span class="has-text-info">Lista de Packs</span></h1>
	    </div>
	    <div class="column is-offset-4">
	      <button class="button is-warning is-medium" @click="isComponentModalActive = true"><span class="icon">
	      <i class="fa fa-plus"></i></span><span>Nuevo Pack</span></button>
	    </div>
	  </div>
    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
       <ModalForm @newPack="addPack($event)"></ModalForm>
    </b-modal>
    <b-field>
      <b-field grouped>
        <b-input placeholder="nombre" type="search" icon-pack="fa" icon="search" v-model="pfilter" class="inputBusqueda"></b-input>
      </b-field>
    </b-field>
    <b-table :data="packs" :mobile-cards="true" >
      <template scope="props">
        <b-table-column field="equipo" label="Equipo" sortable>
          {{ props.row.equipo }}
        </b-table-column>
        <b-table-column field="plan" label="Plan" sortable>
          {{ props.row.plan.nombre }}
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-danger is-small" @click="deletePack(props.row)" >Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
  </div>
</template>

<script>
import ModalForm from '@/components/Pack/ModalForm'

export default {
  name: 'Packs',
	components: { ModalForm },
  data () {
    return {
    	packs: [],
    	pfilter: '',
      canCancel: ['escape', 'x', 'outside'],
      isComponentModalActive: false
    };
  },
  methods: {
  	addPack(pack){
  		this.packs.unshift(pack)
  	},
  	getPacks(){
  		this.$http.get('/api/Packs?filter[include]=plan').then(res => this.packs = res.data)
  	},
  	deletePack(pack){
      this.$dialog.confirm({
        title: 'Eliminar Pack',
        message: '¿Esta seguro de <strong>eliminar</strong> este Pack? Esta accion no se puede deshacer.',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$toast.open({message:'Pack eliminado',position: 'is-bottom',type: 'is-danger'})
          this.$http.delete('/api/Packs/'+pack.id).then((res) => {
            this.packs.splice(this.packs.indexOf(pack), 1)
          });  
        }
      })
    }
  },
  computed: {
    // searchPack: function(){
    //   return this.packs.filter((item) => {
    //     return item.nombre.match(this.pfilter.toLowerCase());
    //   });
    // }
  },
  created: function(){
    this.getPacks();
  }
};
</script>

<style lang="css" scoped>
</style>