<template>
  <div class="container">
  <br>
  <b-modal :active.sync="isComponentModalActive" has-modal-card :canCancel="canCancel">
      <ModalForm :plans="plans" :sendPlan="sendPlan" @newList="plans = $event"></ModalForm>
  </b-modal>

  <section>
    <b-panel>
      <strong slot="header">PLAN</strong>
      <div class="content">
        <div class="columns">
          <div class="column is-4">
            <b-field label="Producto">
              <b-select placeholder="Producto" icon="list" v-model="plan.productoId">
                <option v-for="producto in productos" :value="producto.nombre" >{{ producto.nombre }}</option>
              </b-select>
            </b-field>  
          </div>
          <div class="column is-5">
            <b-field label="Nombre Plan" expanded>
              <b-autocomplete v-model="plan.nombre" placeholder="Plan" :data="searchPlan" field="nombre" @select="option => nombre = option" required></b-autocomplete>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Precio">
              <b-input type="number" v-model="plan.monto" placeholder="S/." icon="money" required />
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
  <h1 class="has-text-info title"><span class="has-text-info">Lista de Planes</span></h1>
    <b-field>
      <b-field grouped>
        <b-input placeholder="plan" type="search" icon-pack="fa" icon="search" v-model="plfilter" class="inputBusqueda"></b-input>
        <b-input placeholder="producto" type="search" icon-pack="fa" icon="search" v-model="pfilter" class="inputBusqueda"></b-input>
      </b-field>
    </b-field>

    <b-table :data="searchPlan" :mobile-cards="true" :paginated="true" per-page="10" default-sort-direction="desc" >
      <template scope="props">
        <b-table-column field="nombre" label="Plan" sortable>
          {{ props.row.nombre }}
        </b-table-column>
        <b-table-column field="productoId" label="Producto" sortable>
        <div v-if="props.row.producto">
          {{ props.row.producto.nombre }}
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
      productos: [],
      plan: {
        nombre: '',
        monto: '',
        productoId: ''
      },
      plfilter: '',
      pfilter:'',
      sendPlan: {},
      canCancel: ['escape', 'x', 'outside'], //poner esta wea para q no salga el error
      isComponentModalActive: false
    };
  },
  methods:{
    getProductos(){
      this.$http.get('/api/Productos').then(res => {
      this.productos = res.data
      })
    },
    getPlans(){
      this.$http.get('/api/Plans?filter=%7B%22include%22%3A%20%22producto%22%7D').then(res => this.plans = res.data).catch(err => console.log(err))
    },
    savePlan(){
      this.plan.nombre = this.plan.nombre.toLowerCase()
      this.$http.post('/api/Plans', this.plan).then(res => {
      this.plans.unshift(res.data)
      this.$emit('newList', this.plans)
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
    this.getProductos();
  }
};
</script>

<style type="text/css">

</style>
