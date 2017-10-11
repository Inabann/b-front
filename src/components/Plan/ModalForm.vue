<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Editar PLan</p>
        
    </header>
    <section class="modal-card-body">
      <b-field grouped>
        <b-field label="Plan">
          <b-input type="text" v-model="sendPlan.nombre" placeholder="Plan"/>
        </b-field>
        <b-field label="Precio">
            <b-input type="number" min="0" step=".10" v-model="sendPlan.monto" placeholder="Precio Plan" icon="money" required />
          </b-field>
      </b-field>
      <div class="columns">
        <div class="column is-4">
          <b-field label="Descuento">
            <b-input type="number" min="0" step=".10" v-model="sendPlan.descuento" placeholder="Descuento" icon="money" required />
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button v-show="sendPlan.nombre && sendPlan.monto" class="button is-primary" @click="savePlan">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['sendPlan'],
  data () {
    return {

    }
  },
  methods:{ 
    savePlan(){
      this.sendPlan.nombre = this.sendPlan.nombre.toLowerCase()
      this.$http.put('/api/Plans/'+this.sendPlan.id, this.sendPlan).then(res => {
        this.$emit('nuevoPlan', res.data)
        this.$parent.close()
        this.$toast.open({message:'Plan editado',type: 'is-success'})
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