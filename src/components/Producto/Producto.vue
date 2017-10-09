<template>
  <div class="container">
  <div class="columns">
    <div class="column">
      <h1 class="has-text-centered title"><span class="has-text-info">Lista de Productos</span></h1>
    </div>
    <div class="column is-offset-4">
      <button class="button is-warning is-medium" @click="isComponentModalActive = true"><span class="icon">
      <i class="fa fa-plus"></i></span><span>Nuevo Producto</span></button>
    </div>
  </div>
    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
        <ModalForm :productos="productos" @newList="productos = $event"></ModalForm>
    </b-modal>

    <b-field>
      <b-field grouped>
        <b-input placeholder="tipo" type="search" icon-pack="fa" icon="search" v-model="pfilter" class="inputBusqueda"></b-input>
      </b-field>
    </b-field>

    <b-table :data="searchProducto" :mobile-cards="true" >
      <template scope="props">
        <b-table-column field="tipo" label="Tipo" sortable>
          {{ props.row.tipo }}
        </b-table-column>
        <b-table-column field="nombre" label="Nombre" sortable>
          {{ props.row.nombre }}
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-danger is-small" @click="deleteProducto(props.row)" >Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
  </div>
</template>

<script>
import ModalForm from '@/components/Producto/ModalForm'


export default {
  components: {
    ModalForm
  },
  name: 'producto',
  data () {
    return {
      productos: [],
      pfilter: '',
      canCancel: ['escape', 'x', 'outside'], //poner esta wea para q no salga el error
      isComponentModalActive: false
    };
  },
  methods:{
    getProductos(){
      this.$http.get('/api/Productos').then(res => this.productos = res.data).catch(err => console.log(err))
    },
    deleteProducto(producto){
        this.$dialog.confirm({
            title: 'Eliminar Producto',
            message: '¿Esta seguro de <strong>eliminar</strong> este Producto? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Producto eliminado',position: 'is-bottom',type: 'is-danger'})
                let id = producto.nombre
                this.$http.delete('/api/Productos/'+id).then((res) => {
                let vm = this
                vm.productos.splice(vm.productos.indexOf(producto), 1)
                });  
            }
          })
    }
  },
  computed:
  {
    searchProducto: function(){
      return this.productos.filter((producto) => {
        return producto.tipo.match(this.pfilter.toLowerCase());
      });
    }
  },
  created: function(){
    this.getProductos();
  }
};
</script>

<style type="text/css">

</style>
