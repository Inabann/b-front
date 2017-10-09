<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Formulario Nuevo Asesor</p>
    </header>
    <section class="modal-card-body">
      <b-field grouped>
        <b-field label="DNI">
          <b-input type="text" v-model="asesor.dni" placeholder="DNI" required>
          </b-input>
        </b-field>
         <b-field label="Nombre" expanded>
          <b-input type="text" v-model="asesor.nombre" placeholder="Nombre" required>
          </b-input>
        </b-field>
      </b-field>
      <b-field grouped>
        <b-field label="Teléfono">
          <b-input type="text" v-model="asesor.telf" placeholder="Teléfono" >
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" v-model="asesor.email" placeholder="correo electronico" >
          </b-input>
        </b-field>
      </b-field>
      <b-field label="Fecha de Contrato">
        <b-input type="date" v-model="asesor.fecha_contrato" placeholder="Fecha de Contrato"></b-input>
      </b-field>
      <b-field label="Select a date">
        <b-datepicker
            placeholder="Click to select..."
            icon="today">
        </b-datepicker>
      </b-field>
      <div class="box">
        <b-field grouped>
          <b-field label="Username" expanded>
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
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click="saveAsesor()">Guardar</button>
    </footer>
  </div>
 
</template>
<script>
export default {
  data () {
    return {
    	asesor:{
    		dni:'',
    		nombre:'',
    		telf:'',
    		fecha_contrato: '',
    		email:'',
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