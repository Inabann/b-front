<template>
    <div class="column is-half is-offset-one-quarter">
      <h1 class="title">Lista de Asesores</h1>
	<div class="column">
	      <button class="button is-info is-medium" @click="isComponentModalActive=true"><span>Nuevo Asesor</span></button>
	    </div>
	     <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-form :asesores="asesores" @newList="asesor = $event"></modal-form>
        </b-modal>
    <section>
             <b-table
            :data="searchAsesores"
            
            :striped="isStriped"
           >

            <template scope="props">
                <b-table-column label="DNI" width="40" numeric>
                    {{ props.row.dni }}
                </b-table-column>

                <b-table-column label="First Nombre">
                    {{ props.row.nombre }}
                </b-table-column>

                <b-table-column label="Teléfono">
                    {{ props.row.telf }}
                </b-table-column>

            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="sentiment_very_dissatisfied"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
    	
    </div>
</template>
<script>

import ModalForm from '@/components/Asesor/ModalForm'

 export default {
 	name: 'Asesor',
    components: {
    ModalForm 
    },
    data(){
        return {
            asesores:[],
            isStriped: true,
            isComponentModalActive:false
                
               
            }
    },
    methods:{
        getAsesors(){
           this.$http.get('/api/Asesors').then((res) => {
            // this.clientes = res.body;
            this.asesores=res.data;
            console.log(this.asesores)
          });
        }
    },
     computed:{
    searchAsesores: function(){
      return this.asesores
    }
  },
    created: function(){
    this.getAsesors();
  }

    }
</script>
<style lang="css" scoped>
</style>