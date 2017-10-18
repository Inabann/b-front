<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Formulario Nuevo Asesor</p>
    </header>
    <section class="modal-card-body">
      <div class="box">
        <b-field grouped>
          <b-field label="Nombre de usuario" expanded>
            <b-input type="text" v-model="asesor.username" >
            </b-input>
          </b-field>
          <b-field label="Contraseña" expanded>
            <b-input type="password" v-model="asesor.password" password-reveal >
            </b-input>
          </b-field>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cerrar</button>
        <button class="button is-primary" @click="saveAsesor()">Guardar</button>
    </footer>
  </div>
 
</template>
<script>
export default {
  data () {
    return {
    	asesor:{
        username:'',
        password:''
    	}
    };
  },
  methods: {
    saveAsesor(){
      this.$http.post('/api/usuarios', this.asesor).then( res => {
        this.$emit('nuevoAsesor', res.data)
        this.$parent.close()
      })
    }
  }
};
</script>

<style lang="css" scoped>
</style>