<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nuevo Transacción</p>
        
    </header>
    <section class="modal-card-body">
      <b-field grouped>
        <b-field label="De:">
        <b-select placeholder="Selecciona un local" v-model="transac.de" @input="option => setDe(option)">
          <option
              v-for="option in locales"
              :value="option.id"
              :key="option.id">
              {{ option.username }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Monto:">
        <b-input type="number" v-model="transac.monto" min="0" step=".10" required></b-input>
      </b-field>
      <b-field label="Para:">
        <b-select placeholder="Selecciona un local" v-model="transac.para" @input="option => setPara(option)">
          <option
              v-for="option in locales"
              :value="option.id"
              :key="option.id">
              {{ option.username }}
          </option>
        </b-select>
      </b-field>
      </b-field>
      
      <b-field label="Fecha">
        <b-input type="date" v-model="transac.fecha" required></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
      <button class="button is-primary" @click="saveTransfe()" >Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      locales: [],
      transac: {},
      de: null,
      para: null
    }
  },
  methods:{ 
    getLocales(){
      this.$http.get('/api/usuarios?filter=%7B%22where%22%3A%7B%22admin%22%3Afalse%7D%7D&access_token='+this.$auth.getToken().token).then(res => this.locales = res.data)
    },
    saveTransfe(){
      this.$http.post('/api/Transaccions', this.transac).then(res => {
        this.$http.patch('/api/usuarios/'+transac.de+'?access_token='+ this.$auth.getToken().token,{saldo: this.de.saldo - Number(this.transac.monto)}).then(()=> {
          this.$http.patch('/api/usuarios/'+transac.para+'?access_token='+ this.$auth.getToken().token,{saldo: this.para.saldo + Number(this.transac.monto)}).then(()=>{
            this.$emit('nuevo', res.data)
            this.$parent.close()
          })
        })
        
      })
    },
    setDe(de){
      this.de = de
    },
    setPara(para){
      this.para = para
    }
  },
  created: function(){
    this.getLocales()

  }
}
</script>

<style scoped>
</style>