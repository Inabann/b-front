<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" v-if="sendPlan">Editar PLan</p>
      <p class="modal-card-title" v-else="sendPlan">Nuevo Plan</p>
        
    </header>
    <section class="modal-card-body">
      <b-field label="Producto">
        <b-select placeholder="Producto" icon="user" v-model="plan.productoId">
          <option v-for="producto in productos" :value="producto.id" >{{ producto.nombre }}</option>
        </b-select>
      </b-field>
      <b-field label="Plan">
        <b-input type="text" v-model="plan.nombre" placeholder="Plan" required>
        </b-input>
      </b-field>
      <div class="columns">
        <div class="column is-4">
          <b-field label="Precio">
            <b-input type="number" min="0" step=".10" v-model="plan.monto" placeholder="Precio Plan" icon="money" required>
            </b-input>  
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button v-show="plan.nombre && plan.monto"class="button is-primary" @click="savePlan">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
    props: ['plans','sendPlan'],
    data () {
      return {
        productos: [],
        plan: {
          nombre: '',
          monto: '',
          productoId: ''

        }
      }
    },
    methods:{ 
      getProductos(){
        this.$http.get('/api/Productos').then(res => {
        this.productos = res.data
        })
      },
      savePlan(){
        this.plan.nombre = this.plan.nombre.toLowerCase()
        if(this.sendPlan){
          let index = this.plans.indexOf(this.sendPlan)
          this.$http.put('/api/Plans/'+this.plan.id, this.plan).then(res => {
          this.plans[index] = res.data
          this.$emit('newList', this.plans)
          this.$parent.close()
          this.$toast.open({message:'Plan editado',type: 'is-success'})
        })
        }else {
          this.$http.post('/api/Plans', this.plan).then(res => {
          this.plans.unshift(res.data)
          this.$emit('newList', this.plans)
          this.$parent.close()
          this.$toast.open({message:'Plan guardado',type: 'is-success'})
          })
        }
    }
  },
  created: function(){
    if(this.sendPlan){
      this.plan = this.sendPlan
    }
    this.getProductos()
  },
}
</script>

<style scoped>
    .modal-card {
        /*width: auto;
*/    }
</style>