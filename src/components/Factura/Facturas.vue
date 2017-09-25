<template>
	<div>
		<button class="button is-primary" @click="isComponentModalActive = true">Agregar Factura</button>
		
		<b-modal :active.sync="isComponentModalActive" :canCancel="canCancel" has-modal-card>
      <ModalNuevaFactura></ModalNuevaFactura>
    </b-modal>

	</div>
</template>

<script>
import ModalNuevaFactura from '@/components/Factura/ModalNuevaFactura'

export default {

  name: 'Facturas',
  components: { ModalNuevaFactura },
  data () {
    return {
    	isComponentModalActive: false,
    	canCancel: ['escape', 'x', 'outside']
    };
  }
};
</script>

<style lang="css" scoped>
</style>