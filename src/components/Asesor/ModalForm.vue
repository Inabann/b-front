<template>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Formulario Nuevo Asesor</p>
            </header>
            <section class="modal-card-body">
                <b-field label="DNI">
                    <b-input
                        type="text"
                        v-model="asesor.dni"
                        placeholder="DNI"
                        required>
                    </b-input>
                </b-field>
                 <b-field label="Nombre">
                    <b-input
                        type="text"
                        v-model="asesor.nombre"
                        placeholder="Nombre"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Teléfono">
                    <b-input
                        type="text"
                        v-model="asesor.telf"
                        placeholder="Teléfono"
                        >
                    </b-input>
                </b-field>
                <b-field label="Fecha de Contrato">
                    <b-input
                        type="date"
                        v-model="asesor.fecha_contrato"
                        placeholder="Fecha de Contrato"
                        >
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="SaveAsesor()">Guardar</button>
            </footer>
        </div>
   
</template>
<script>
export default {
     props: ['asesoress'],
  data () {
    return {
    	asesor:{
    		dni:'',
    		nombre:'',
    		telf:'',
    		fecha_contrato:''
    		
    	}
    };
  },
  methods: {
    SaveAsesor(){
       // this.$http.post('/api/Asesors', this.asesor).then(res => {
       // this.$emit('newList', this.asesoress);
       // this.$parent.close()

       //    })
    }
  }
};
</script>

<style lang="css" scoped>
</style>