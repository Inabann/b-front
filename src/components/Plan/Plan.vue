<template>
  <div class="container">
  <div class="columns">
    <div class="column">
      
      <h1 class="has-text-centered title"><span class="has-text-info">Lista de Planes</span></h1>
    </div>
    <div class="column is-offset-4">
      <button class="button is-warning is-medium" @click="isComponentModalActive = true; sendPlan = null "><span class="icon">
      <i class="fa fa-plus"></i></span><span>Nuevo Plan</span></button>
    </div>
  </div>
    

    <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
        <ModalForm :plans="plans" :sendPlan="sendPlan" @newList="plans = $event"></ModalForm>
    </b-modal>

    <b-field>
      <b-field grouped>
        <b-input placeholder="plan" type="search" icon-pack="fa" icon="search" v-model="plfilter" class="inputBusqueda"></b-input>
        <b-input placeholder="producto" type="search" icon-pack="fa" icon="search" v-model="pfilter" class="inputBusqueda"></b-input>
      </b-field>
    </b-field>

    <b-table :data="searchPlan" :mobile-cards="true" >
      <template scope="props">
        <b-table-column field="nombre" label="Plan" sortable>
          {{ props.row.nombre | capitalize}}
        </b-table-column>
        <b-table-column field="productoId" label="Producto" sortable>
        <div v-if="props.row.producto">
          {{ props.row.producto.nombre | capitalize }}
        </div>
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
      plfilter: '',
      pfilter:'',
      sendPlan: {},
      canCancel: ['escape', 'x', 'outside'], //poner esta wea para q no salga el error
      isComponentModalActive: false
    };
  },
  methods:{
    getPlans(){
      this.$http.get('/api/Plans?filter=%7B%22include%22%3A%20%22producto%22%7D').then(res => this.plans = res.data).catch(err => console.log(err))
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
      return this.plans.filter((plan) => {
        return plan.producto.nombre.match(this.pfilter.toLowerCase()) 
        && plan.nombre.match(this.plfilter.toLowerCase());
      });
    }
  },
  created: function(){
    this.getPlans();
  }
};
</script>

<style type="text/css">

</style>
