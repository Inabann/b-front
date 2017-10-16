<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nuevo Pack</p>
        
    </header>
    <section class="modal-card-body">
      <b-field label="Equipo">
        <b-autocomplete v-model="producto" placeholder="ej. j5" :data="filteredDataProd" field="nombre" @select="option => productoSelec = option" required></b-autocomplete>
      </b-field>
      <b-field label="Plan">
        <b-autocomplete v-model="plan" placeholder="ichip 29" :data="filteredDataProd2" field="nombre" @select="option => planSelec = option" required></b-autocomplete>
      </b-field>
      <b-field label="Precio">
        <b-input type="number" v-model="pack.precio" required></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button class="button is-primary" @click="savePack">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pack: {
        precio: 0
      },
      productos: [],
      producto: '',
      productoSelec: null,
      planes: [],
      plan: '',
      planSelec: null,
    }
  },
  methods:{ 
    savePack(){
      this.pack.equipo = this.productoSelec.nombre
      this.pack.planId = this.planSelec.id
      this.$http.post('/api/Packs', this.pack).then(res => {
        res.data.plan = this.planSelec
        this.$emit('newPack', res.data)
        this.$parent.close()
        this.$toast.open({message:'Pack guardado',type: 'is-success'})
      })
    },
    getProductos(){
      this.$http.get('/api/Productos').then(res => this.productos = res.data)
    },
    getPlanes(){
      this.$http.get('/api/Plans').then(res => this.planes = res.data)
    }
  },
  computed:{
    filteredDataProd(){
      return this.filtrado.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.producto.toLowerCase()) >= 0
      })
    },
    filteredDataProd2(){
      return this.planes.filter((option) => {
        return option.nombre
          .toString()
          .toLowerCase()
          .indexOf(this.plan.toLowerCase()) >= 0
      })
    },
    filtrado(){
      return this.productos.filter(option => {
        return !option.nombre.match('saldo') && !option.nombre.match('postpago') && !option.nombre.match('prepago')
      })
    }
  },
  created: function(){
    this.getProductos()
    this.getPlanes()

  }
}
</script>

<style scoped>
</style>