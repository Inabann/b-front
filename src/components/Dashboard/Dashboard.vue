<template>
	<h1 class="title is-3">dashboard</h1>
</template>

<script>
export default {

  name: 'Dashboard',

  data () {
    return {
    	saldo: ''
    };
  },
  methods:{
  	getSaldo(){
  		this.$http.get('/api/Productos?filter[where][total][gt]=0').then(res => {
  			console.log(res.data)
  		})
  	}
  },
  created(){
  	this.getSaldo()
  }
};
</script>

<style lang="css" scoped>
</style>