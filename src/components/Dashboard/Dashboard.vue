<template>
  <div>
    <div v-if="this.$auth.getToken().admin == 'true'">
      <CardsAdmin :cantidadMes="cantidad"></CardsAdmin>
    </div>
    <div v-else>
      <Cards></Cards>
    </div>
    <div class="columns">
      <div class="column">
        <TotalporMes :cantidadMes="cantidad"></TotalporMes>
      </div>
      <div class="column">
        <CantidadporMes @VentaxMes="cantidad = $event"></CantidadporMes>
      </div>
    </div>
    <VentasxAsesor></VentasxAsesor>
  </div>
	
</template>

<script>
import Cards from '@/components/Dashboard/Cards'
import CardsAdmin from '@/components/Dashboard/CardsAdmin'
import TotalporMes from '@/components/Dashboard/TotalporMes'
import CantidadporMes from '@/components/Dashboard/CantidadporMes'
import VentasxAsesor from '@/components/Dashboard/VentasxAsesor'

export default {

  name: 'Dashboard',
  components: { Cards, TotalporMes, CantidadporMes, VentasxAsesor, CardsAdmin },
  data () {
    return {
      cantidad: 0
    };
  },
  methods:{
  	
  },
  created(){
  	
  }
};
</script>

<style lang="css" scoped>
</style>