<template>
	<div>
		<button class="button is-primary" @click="isComponentModalActive = true">Agregar Factura</button>
		
		<b-modal :active.sync="isComponentModalActive" :canCancel="canCancel" has-modal-card>
      <ModalNuevaFactura></ModalNuevaFactura>
    </b-modal>
		<b-table
      :data="facturas"
      detailed
      @details-open="(row, index) => detalles(row)">

      <template scope="props">
        <b-table-column label="Codigo" width="40"  numeric>
          {{ props.row.codigo }}
        </b-table-column>
        <b-table-column label="Fecha de registro" centered>
          {{ props.row.fecha }}
        </b-table-column>
        <b-table-column label="Total">
          {{ props.row.total }}
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
    	detalleFactura: {}
    };
  },
  methods: {
  	getFacturas(){
  		this.$http.get('/api/Facturas').then(res => this.facturas = res.data)
  	},
  	detalles(row){
  		this.$http.get('/api/Facturas/'+row.id+'/detalleProductos').then( res => this.detalleFactura = res.data)
  	}
  },
  created(){
  	this.getFacturas()
  }
};
</script>

<style lang="css" scoped>
</style>