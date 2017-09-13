<template>
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
  }
};
</script>

<style lang="css">
.columns:last-child {
    margin-bottom: 0;
}

 #appmenu {
  background-color: #3A3B4A;

 }

</style>