<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nuevo Pago/Regarga</p>
        
    </header>
    <section class="modal-card-body">
      <b-field label="Numero">
        <b-input type="string" v-model="pago.numero" required></b-input>
      </b-field>
      <b-field label="Monto">
        <b-input type="number" v-model="pago.monto" required></b-input>
      </b-field>
      <b-field label="Tipo">
        <b-select placeholder="Selecione un tipo" v-model="pago.tipo" required>
          <option value="recarga">Recarga</option>
          <option value="postpago">Postpago</option>
          <option value="internet">Internet</option>
          <option value="otros">Otros</option>
        </b-select>
      </b-field>
      <b-field label="Fecha">
        <b-input type="date" v-model="pago.fecha" required></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button class="button is-primary" @click="savePago" v-show="saldo >= pago.monto">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pago: {
        numero: '',
        fecha: '',
        tipo: '',
        monto: 0,
        fecha: ''
      },
      saldo: 0
    }
  },
  methods:{ 
    savePago(){
      let n = this.saldo - Number(this.pago.monto)
      this.$http.patch('/api/Productos/saldo',{total: n}).then(res2=> {
        this.$http.post('/api/Pagos', this.pago).then(res => {
          this.$emit('newPago', res.data)
          this.$parent.close()
          this.$toast.open({message:'Transaccion exitosa',type: 'is-success'})
        })
      }) 
    },
    getSaldo(){
      this.$http.get('/api/usuarios/'+this.$auth.getToken().userId+'?access_token='+ this.$auth.getToken().token).then(res => {
        this.saldo = res.data.saldo
      })
    }
  },
  created: function(){
    this.getSaldo()

  }
}
</script>

<style scoped>
</style>