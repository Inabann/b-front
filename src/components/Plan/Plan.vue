<template>
  <div class="container">
  <div class="columns">
    <div class="column">
      
      <h1 class="has-text-centered title"><span class="has-text-info">Lista de Planes</span></h1>
    </div>
    <div class="column is-offset-4">
      <button class="button is-info is-medium" @click="isComponentModalActive = true; sendPlan = null "><span class="icon">
      <i class="fa fa-plus"></i></span><span>Nuevo Plan</span></button>
    </div>
  </div>
    

    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
        <ModalForm :plans="plans" :sendPlan="sendPlan" @newList="plans = $event"></ModalForm>
    </b-modal>

    <b-table :data="searchPlan" :mobile-cards="true" >
      <template scope="props">
        <b-table-column field="nombre" label="Plan" sortable>
          {{ props.row.nombre }}
        </b-table-column>
        <b-table-column field="monto" label="Precio" sortable>
          {{ props.row.monto }}
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-warning is-small" @click="editPlan(props.row)">Editar</a>
          <a class="button is-danger is-small" @click="deletePlan(props.row)" >Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
  </div>
</template>

<script>
import ModalForm from '@/components/Plan/ModalForm'


export default {
  components: {
    ModalForm
  },
  name: 'plan',
  data () {
    return {
      plans: [],
      sendPlan: {},
      canCancel: ['escape', 'x', 'outside'], //poner esta wea para q no salga el error
      isComponentModalActive: false
    };
  },
  methods:{
    getPlans(){
      this.$http.get('/api/Plans').then((res) => {
        let vm = this;
        vm.plans = res.data;
      });
    },
    deletePlan(plan){
        this.$dialog.confirm({
            title: 'Eliminar Plan',
            message: '¿Esta seguro de <strong>eliminar</strong> este Plan? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Plan eliminado',position: 'is-bottom',type: 'is-danger'})
                let id = plan.id
                this.$http.delete('/api/Plans/'+id).then((res) => {
                let vm = this
                vm.plans.splice(vm.plans.indexOf(plan), 1)
                });  
            }
          })
    },
    editPlan(plan){
      this.sendPlan = plan
      this.isComponentModalActive = true
    }
  },
  computed:
  {
    searchPlan: function(){
      return this.plans;
    }
  },
  created: function(){
    this.getPlans();
  }
};
</script>

<style type="text/css">

</style>
