<template>
  <div class="container">
  <br>
  <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
      <ModalForm :sendPlan="sendPlan" @nuevoPlan="addNuevoPlan($event)"></ModalForm>
  </b-modal>

  <section>
    <b-panel>
      <strong slot="header">PLAN</strong>
      <div class="content">
        <div class="columns">
          <div class="column is-4">
            <b-field label="Nombre Plan" expanded>
              <b-input type="text" v-model="plan.nombre" icon="list" required />
            </b-field>
          </div>
          <div class="column is-5">
            <b-field label="Precio" expanded>
              <b-input type="number" v-model="plan.monto" placeholder="S/." icon="money" required />
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Descuento">
              <b-input type="number" min="0" step=".10" v-model="plan.descuento" placeholder="S/." icon="money" required />
            </b-field>                    
          </div>

          <div class="column is-2">
            <b-field label="Opcion">
              <button class="button is-primary" @click="savePlan">Guardar</button>
            </b-field>
          </div>
        </div>
      </div>
    </b-panel>
  </section>
  <br>
  <h1 class="has-text-centered title"><span class="has-text-info">Lista de Planes</span></h1>
    <b-field>
      <b-field grouped>
        <b-input placeholder="plan" type="search" icon-pack="fa" icon="search" v-model="plfilter" class="inputBusqueda"></b-input>
      </b-field>
    </b-field>

    <b-table :data="searchPlan" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
      <template scope="props">
        <b-table-column field="nombre" label="Plan" sortable>
          {{ props.row.nombre }}
        </b-table-column>
        <b-table-column field="monto" label="Precio" sortable>
          {{ props.row.monto }}
        </b-table-column>
        <b-table-column field="descuento" label="Descuento" sortable>
          {{ props.row.descuento }}
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
      plan: {
        nombre: '',
        monto: '',
        descuento: ''
      },
      plfilter: '',
      sendPlan: {},
      canCancel: ['escape', 'x', 'outside'], //poner esta wea para q no salga el error
      isComponentModalActive: false
    };
  },
  methods:{
    getPlans(){
      this.$http.get('/api/Plans').then(res => this.plans = res.data).catch(err => console.log(err))
    },
    savePlan(){
      this.plan.nombre = this.plan.nombre.toLowerCase()
      this.$http.post('/api/Plans', this.plan).then(res => {
        this.plans.unshift(res.data)
        this.$toast.open({message:'Plan guardado',type: 'is-success'})
      })
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
    },
    addNuevoPlan(plan){
      this.plans[this.plans.indexOf(plan)] = plan
    }
  },
  computed:
  {
    searchPlan: function(){
      return this.plans.filter((plan) => {
        return plan.nombre.match(this.plfilter);
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
