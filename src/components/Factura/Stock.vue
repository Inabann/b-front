<template>
	<div>
		<b-table :data="stock" :mobile-cards="true" :paginated="true" per-page="15" default-sort-direction="desc"
			default-sort="cantidad">

      <template scope="props">
          <b-table-column field="_id" label="Producto" width="40" sortable>
              {{ props.row._id }}
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
  	</b-table>
	</div>
</template>

<script>
export default {

  name: 'Stock',

  data () {
    return {
    	stock: []
    };
  },
  methods: {
  	getStock(){
  		this.$http.post('/api/DetalleProductos/stock').then( res => this.stock = res.data)
  	}
  },
  created(){
  	this.getStock()
  }
};
</script>

<style lang="css" scoped>
</style>