<template>
	<div>
    <div class="column">
      <h1 class="has-text-centered title"><span class="has-text-info">Almacen</span></h1>
    </div>  
		<b-table :data="sinSaldo" :mobile-cards="true" :paginated="true" per-page="15" default-sort-direction="desc"
			default-sort="cantidad" detailed>

      <template scope="props">
        <b-table-column field="local.username" label="Local" width="40" sortable>
              {{ props.row.local.username }}
          </b-table-column>
          <b-table-column field="_id.producto" label="Producto" width="40" sortable>
              {{ props.row._id.producto }}
          </b-table-column>

          <b-table-column field="cantidad" label="en stock" sortable>
              {{ props.row.cantidad }}
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

      <template slot="detail" scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control" v-for="producto in props.row.productos">
                  <span class="tag is-info" >
                    {{producto}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </template>
  	</b-table>
	</div>
</template>

<script>
export default {

  name: 'Stock',

  data () {
    return {
    	stock: [],
      local: ''
    };
  },
  methods: {
  	getStock(){
  		this.$http.post('/api/DetalleProductos/stock').then( res => this.stock = res.data)
  	}
  },
  computed:{
    sinSaldo(){
      return this.stock.filter(option => {
        return !option._id.producto.match('saldo') && option._id.usuario.match(this.local)
      })
    }
  },
  created(){
    if(this.$auth.getToken().admin == 'false'){
      this.local = this.$auth.getToken().userId
    }
  	this.getStock()
  }
};
</script>

<style lang="css" scoped>
</style>