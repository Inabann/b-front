<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" v-if="!flag">Formulario Nueva Tienda</p>
      <p class="modal-card-title" v-else>Editar Datos del Local</p>
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
  props:['edit'],
  data () {
    return {
    	asesor:{
        username:'',
        password:''
    	},
      flag: false
    };
  },
  methods: {
    saveAsesor(){
      if(this.edit != null){
        this.$http.patch('/api/usuarios/'+this.edit.id+'?access_token='+this.$auth.getToken().token, this.asesor).then( res => {
          this.$emit('UsuarioEdit', res.data)
          this.$parent.close()
        })
      }else{
        this.$http.post('/api/usuarios?access_token='+this.$auth.getToken().token, this.asesor).then( res => {
          this.$emit('nuevoAsesor', res.data)
          this.$parent.close()
        })
      }
      
    }
  },
  created(){
    if(this.edit != null){
      this.asesor.username = this.edit.username
      this.flag = true
    }
  }
};
</script>

<style lang="css" scoped>
</style>