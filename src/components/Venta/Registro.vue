<template>
	<section>
		<div class="box">
			<h2 class="title is-5"><span>Datos del Cliente</span><span class="is-pulled-right">fecha: {{new Date()|moment("YYYY / MM / DD")}}</span></h2>
			<b-field grouped>
				<b-field label="DNI" expanded>
		      <b-input type="text" v-model="venta.dni" required />
		    </b-field>
		    <b-field label="Nombres y Apellidos" expanded>
		      <b-input type="text" />
		    </b-field>
		    <b-field label="Email" expanded>
		      <b-input type="email" v-model="venta.email" required />
		    </b-field>
		    <b-field label="N° referencia" expanded>
		      <b-input type="text" v-model="venta.ref" required />
		    </b-field>
	    </b-field>
		</div>
	</section>
</template>

<script>
export default {

  name: 'Registro',

  data () {
    return {
    	venta:{
    		dni:'',
    		email:'',
    		ref:''
    	}
    };
  }
};
</script>

<style lang="css" scoped>
</style>