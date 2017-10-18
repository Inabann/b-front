<template>
	<div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Editar Asesor</p>
    </header>
    <section class="modal-card-body">
    	<b-field label="Estado">
      	<div class="block">
            <b-radio v-model="asesor.activo"
                native-value="true">
                Activo
            </b-radio>
            <b-radio v-model="asesor.activo"
                native-value="false">
                No Activo
            </b-radio>
        </div>
        </b-field>
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
      </b-field>
    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cerrar</button>
        <button class="button is-primary" @click="guardarAsesor">Guardar</button>
    </footer>
  </div>
</template>

<script>
export default {
	props: ['asesor'],
  name: 'EditarModal',
  data () {
    return {
    	at: {}
    };
  },
  methods:{
  	guardarAsesor(){
  		this.$http.patch('/api/Asesors/'+this.asesor.id, this.asesor).then(res => {
  			this.$emit('editado', res.data)
  			this.$parent.close()
        this.$toast.open({message:'asesor editado',type: 'is-success'})
  		})
  	}
  }
};
</script>

<style lang="css" scoped>
</style>