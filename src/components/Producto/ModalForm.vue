<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nuevo Producto</p>
        
    </header>
    <section class="modal-card-body">
       <b-field label="Tipo">
        <b-input type="text" v-model="producto.tipo" placeholder="Tipo" required />
      </b-field>
      <b-field label="Nombre">
        <b-input type="text" v-model="producto.nombre" placeholder="Nombre" required />
      </b-field>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button v-show="producto.nombre" class="button is-primary" @click="saveProducto">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
    props: ['productos'],
    data () {
      return {
        producto: {
          tipo: '',
          nombre: ''
        }
      }
    },
    methods:{ 
      saveProducto(){
        this.producto.nombre = this.producto.nombre.toLowerCase()
        this.producto.tipo = this.producto.tipo.toLowerCase()
        this.$http.post('/api/Productos', this.producto).then(res => {
        this.productos.unshift(res.data)
        this.$emit('newList', this.productos)
        this.$parent.close()
        this.$toast.open({message:'Producto guardado',type: 'is-success'})
        })
        }
    }
}
</script>

<style scoped>
    .modal-card {
        /*width: auto;
*/    }
</style>