<template>
	<div class="container">
	  <div class="columns">
	    <div class="column">
	      <h1 class="has-text-centered title"><span class="has-text-info">Registro de Pagos/Regarcas</span></h1>
	    </div>
	    <div class="column is-offset-4">
	      <button class="button is-warning is-medium" @click="isComponentModalActive = true"><span class="icon">
	      <i class="fa fa-plus"></i></span><span>Nuevo Pago/Recarga</span></button>
	    </div>
	  </div>
    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
       <ModalForm @newPago="addPago($event)"></ModalForm>
    </b-modal>

    <b-table :data="pagos" :mobile-cards="true" >
      <template scope="props">
        <b-table-column field="tipo" label="Tipo" sortable>
          {{ props.row.tipo }}
        </b-table-column>
        <b-table-column field="numero" label="Numero" >
          {{ props.row.numero }}
        </b-table-column>
        <b-table-column field="monto" label="Monto" >
          {{ props.row.monto }}
        </b-table-column>
        <b-table-column field="fecha" label="Fecha" >
          {{ props.row.fecha | moment("add","1 days","YYYY / MM / DD") }}
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-danger is-small" @click="deletePago(props.row)" >Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
  </div>
</template>

<script>
import ModalForm from '@/components/Pago/ModalForm'

export default {

  name: 'Pagos',
  components: { ModalForm },
  data () {
    return {
    	pagos: [],
    	// saldo: 0,
    	canCancel: ['escape', 'x', 'outside'],
    	isComponentModalActive: false
    };
  },
  methods: {
  	getPagos(){
  		this.$http.get('/api/Pagos').then(res => this.pagos = res.data)
  	},
  	addPago(pago){
  		this.pagos.unshift(pago)
      
  	}
  	// deletePago(pago){
  	// 	this.$http.patch('/api/usuarios/'+this.$auth.getToken().userId+'?access_token='+ this.$auth.getToken().token,{saldo: this.saldo.total + pago.monto}).then(res2=> {
   //      this.$http.delete('/api/Pagos/'+pago.id).then(res => {
   //        this.pagos.splice(this.pagos.indexOf(pago), 1)
   //        this.$toast.open({message:'Pago eliminado',type: 'is-danger'})
   //      })
   //    }) 
  	// }
  },
  created(){
  	this.getPagos()
  }
};
</script>

<style lang="css" scoped>
</style>