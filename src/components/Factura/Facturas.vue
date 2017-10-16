<template>
	<div>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-centered title"><span class="has-text-info">Lista de Facturas</span></h1>
    </div>  
    <div class="column is-offset-4">
		  <button class="button is-warning is-medium" @click="isComponentModalActive = true"  ><span class="icon">
      <i class="fa fa-plus"></i></span><span>Agregar Factura</span></button>
    </div> 
	</div> 	
		<b-modal :active.sync="isComponentModalActive" :canCancel="canCancel" has-modal-card>
      <ModalNuevaFactura @facturaAgregada="nuevaFactura($event)"></ModalNuevaFactura>
    </b-modal>
		<b-table
      :data="facturas"
      detailed
      @details-open="(row, index) => detalles(row)">

      <template scope="props">
        <b-table-column label="Codigo" width="40"  numeric>
          {{ props.row.codigo | uppercase}}
        </b-table-column>
        <b-table-column label="Fecha de registro" centered>
          {{ props.row.fecha | moment("add","1 days","YYYY / MM / DD")}}
        </b-table-column>
        <b-table-column label="Total">
          {{ props.row.total }}
        </b-table-column>
        <b-table-column label="Opciones">
          <a class="button is-danger is-small" @click="removeFactura(props.row)">Eliminar</a>
        </b-table-column>
      </template>

      <template slot="detail" scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              
              {{ detalleFactura }}
            </div>
          </div>
        </article>
      </template>
    </b-table>
	</div>
</template>

<script>
import ModalNuevaFactura from '@/components/Factura/ModalNuevaFactura'

export default {

  name: 'Facturas',
  components: { ModalNuevaFactura },
  data () {
    return {
    	isComponentModalActive: false,
    	canCancel: ['escape', 'x', 'outside'],
    	facturas: [],
    	detalleFactura: []
    };
  },
  methods: {
  	getFacturas(){
  		this.$http.get('/api/Facturas').then(res => this.facturas = res.data)
  	},
  	detalles(row){
  		this.$http.get('/api/Facturas/'+row.codigo+'/detalleProductos').then( res => this.detalleFactura = res.data)
  	},

    removeFactura(factura){
            this.$dialog.confirm({
            title: 'Eliminar Factura',
            message: '¿Esta seguro de <strong>eliminar</strong> esta Factura? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Factura eliminada',position: 'is-bottom',type: 'is-danger'})
                this.$http.delete('/api/Facturas/'+factura.codigo+'/detalleProductos').then(res => {
                this.$http.delete('/api/Facturas/'+factura.codigo).then(resp => {
                this.facturas.splice(this.facturas.indexOf(factura), 1)
                console.log('factura y productos eliminados')
                })
              });
            }
          })
    },

    nuevaFactura(factura){
      this.facturas.unshift(factura)
    }
  },
  created(){
  	this.getFacturas()
  }
};
</script>

<style lang="css" scoped>
</style>