<template>
  <div>
    <Cards></Cards>
    <div class="columns">
      <div class="column">
        <TotalporMes></TotalporMes>
      </div>
      <div class="column">
        <CantidadporMes></CantidadporMes>
      </div>
    </div>
    <VentasxAsesor></VentasxAsesor>
  </div>
	
</template>

<script>
import Cards from '@/components/Dashboard/Cards'
import TotalporMes from '@/components/Dashboard/TotalporMes'
import CantidadporMes from '@/components/Dashboard/CantidadporMes'
import VentasxAsesor from '@/components/Dashboard/VentasxAsesor'

export default {

  name: 'Dashboard',
  components: { Cards, TotalporMes, CantidadporMes, VentasxAsesor },
  data () {
    return {

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