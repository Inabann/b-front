<template>
	<div class="container">
	  <div class="columns">
	    <div class="column">
	      <h1 class="has-text-centered title"><span class="has-text-info">Registro de Pagos/Regarcas</span></h1>
	    </div>
	    <div class="column is-offset-4">
	      <button class="button is-warning is-medium" @click="isComponentModalActive = true" v-if="this.$auth.getToken().admin == 'false'"><span class="icon">
	      <i class="fa fa-plus"></i></span><span>Nuevo Pago/Recarga</span></button>
	    </div>
      <div class="column">
        <button class="button is-warning is-medium" @click="isComponentModalActive2 = true" ><span class="icon">
        <i class="fa fa-plus"></i></span><span>Nueva Transferencia</span></button>
      </div>
	  </div>
     <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
       <ModalForm @newPago="addPago($event)"></ModalForm>
    </b-modal>

    <b-modal :active.sync="isComponentModalActive2" has-modal-card :canCancel="canCancel">
       <TransfeModal @nuevo="addTransfe($event)"></TransfeModal>
    </b-modal>

    <b-tabs position="is-centered" class="block" >
      <b-tab-item label="Recargas/Pagos">
        <b-table :data="pagos" :mobile-cards="true" :default-sort-direction="'desc'" default-sort="fecha">
          <template scope="props">
            <b-table-column field="usuario" label="Local" sortable>
              {{ props.row.usuario.username }}
            </b-table-column>
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
      </b-tab-item>
      <b-tab-item label="Transferencias">
        <b-table :data="transfes" :mobile-cards="true" :default-sort-direction="'desc'" default-sort="fecha">
          <template scope="props">
            <b-table-column field="de" label="De" sortable>
              {{ props.row.de.username }}
            </b-table-column>
            <b-table-column field="monto" label="Monto" sortable>
              {{ props.row.monto }}
            </b-table-column>
            <b-table-column field="para" label="Para" >
              <div v-if="props.row.para != null">
                {{ props.row.para.username }}
              </div>
              <div v-else>
                Externo
              </div>
            </b-table-column>
            <b-table-column field="fecha" label="Fecha" sortable >
              {{ props.row.fecha | moment("add","1 days","YYYY / MM / DD") }}
            </b-table-column>
          </template>
          <div slot="empty" class="has-text-centered">
            Cargando ...
          </div>
        </b-table>
      </b-tab-item>
    </b-tabs>

  </div>
</template>

<script>
import ModalForm from '@/components/Pago/ModalForm'
import TransfeModal from '@/components/Pago/TransfeModal'

export default {

  name: 'Pagos',
  components: { ModalForm, TransfeModal },
  data () {
    return {
    	pagos: [],
      transfes: [],
    	// saldo: 0,
    	canCancel: ['escape', 'x', 'outside'],
    	isComponentModalActive: false,
      isComponentModalActive2: false
    };
  },
  methods: {
  	getPagosAdmin(){
  		this.$http.get('/api/Pagos?filter=%7B%22include%22%3A%22usuario%22%7D').then(res => this.pagos = res.data)
  	},
    getPagos(){
      this.$http.get('/api/Pagos?filter=%7B%22include%22%3A%22usuario%22%2C%22where%22%3A%7B%22usuarioId%22%3A%22'+this.$auth.getToken().userId+'%22%7D%7D').then(res => this.pagos = res.data)
    },
  	addPago(pago){
  		this.pagos.unshift(pago)
  	},
    addTransfe(transfe){
      this.$http.get('/api/Transaccions/'+transfe.id+'?filter=%7B%22include%22%3A%5B%22de%22%2C%22para%22%5D%7D').then( res => this.transfes.unshift(res.data))
    },
    getTransfes(){
      this.$http.get('/api/Transaccions?filter=%7B%22include%22%3A%5B%22de%22%2C%22para%22%5D%7D').then( res => this.transfes = res.data)
    }
  },
  created(){
    if(this.$auth.getToken().admin == 'true') {
      this.getPagosAdmin()
    }
    else this.getPagos()
    this.getTransfes()
  }
};
</script>

<style lang="css" scoped>
</style>