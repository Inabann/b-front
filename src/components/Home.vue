<template>
<<<<<<< HEAD
	<h1>home</h1>
</template>

<script>
export default {

  name: 'Home',

  data () {
    return {

    };
=======
  <div>
    <Navbar @statusNav="statusMenu = $event"></Navbar> 
      <div class="columns " style="margin-top: 0px; margin-left: 0px; margin-right: 0px;">
        <div class="column" id="appmenu" :class="{ 'is-hidden': statusMenu }">
          <appMenu></appMenu>
        </div>
        <div class="column" id="appBody">
          <div class="container">
            <router-view></router-view>
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import appMenu from '@/components/Aside'

export default {

  name: 'Home',
  components: {
    Navbar,
    appMenu,
  },
  data (){
    return {
      statusMenu: false
    }
>>>>>>> f34edf630779bdb33f5f683234841da8f542359c
  }
};
</script>

<<<<<<< HEAD
<style lang="css" scoped>
=======
<style lang="css">
.columns:last-child {
    margin-bottom: 0;
}

 #appmenu {
  background-color: #3A3B4A;

 }

>>>>>>> f34edf630779bdb33f5f683234841da8f542359c
</style>