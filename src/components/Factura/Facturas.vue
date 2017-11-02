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
      detailed>
      <template scope="props">
        <b-table-column label="Local" width="40" field="usuario" sortable numeric>
          <div v-if="props.row.usuario">
            {{ props.row.usuario.username | uppercase}}
          </div>
          
        </b-table-column>
        <b-table-column label="Codigo" width="40" field="codigo" sortable numeric>
          {{ props.row.codigo | uppercase}}
        </b-table-column>
        <b-table-column label="Fecha de registro" centered field="fecha" sortable>
          {{ props.row.fecha | moment("add","1 days","YYYY / MM / DD")}}
        </b-table-column>
        <b-table-column label="Total">
          <strong>S/.</strong>{{ props.row.total }}
        </b-table-column>
        <b-table-column label="Opciones">
          <a class="button is-danger is-small" @click="removeFactura(props.row)">Eliminar</a>
        </b-table-column>
      </template>

      <template slot="detail" scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control" v-for="producto in props.row.detalleProductos">
                  <div class="tags has-addons">
                    <span class="tag ">{{producto.productoId}}</span>
                    <span class="tag is-info" v-if="producto.saldo">
                      {{producto.saldo}}
                    </span>
                    <span class="tag is-info" v-else>
                      {{producto.serie}}
                    </span>
                    <span class="tag" v-if="producto.vendido">
                      <span class="icon has-text-success">
                        <i class="fa fa-check-square"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
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
  		this.$http.get('/api/Facturas?filter=%7B%22include%22%20%3A%20%5B%22usuario%22%2C%22detalleProductos%22%5D%7D').then(res => this.facturas = res.data)
  	},
    getFacturasLocal(){
      this.$http.get('/api/Facturas?filter=%7B%22include%22%20%3A%20%5B%22usuario%22%2C%22detalleProductos%22%5D%2C%22where%22%3A%7B%22usuarioId%22%3A%22'+this.$auth.getToken().userId+'%22%7D%7D').then(res => this.facturas = res.data)
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
          this.$http.delete('/api/Facturas/'+encodeURIComponent(factura.codigo)+'/detalleProductos').then(res => {
            this.$http.delete('/api/Facturas/'+encodeURIComponent(factura.codigo)).then(resp => {
              this.facturas.splice(this.facturas.indexOf(factura), 1)
            })
          });
        }
      })
    },
    nuevaFactura(factura){
      this.$http.get('/api/Facturas/'+encodeURIComponent(factura.codigo)+'?filter=%7B%22include%22%20%3A%20%5B%22usuario%22%2C%22detalleProductos%22%5D%7D').then(res => {
        this.facturas.unshift(res.data)
      })
    }
  },
  created(){
    if(this.$auth.getToken().admin == 'true'){
      this.getFacturas()
    } else {
      this.getFacturasLocal()
    }
  	
  }
};
</script>

<style lang="css" scoped>
</style>