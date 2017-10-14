import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data(){
  	return {
  		labels : [],
      cantidad: []
  	}
  },
  mounted () {
    this.$http.post('/api/Venta/VendidoporMes').then(res => {
      this.labels = res.data.meses
      this.cantidad = res.data.cantidad
      this.setGraph()
    })
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.labels,
  			datasets: [
  				{label: 'Ventas', data: this.cantidad, backgroundColor: '#FFA630'}
  			]
  		}, {legend: {display : true}, maintainAspectRatio: false})
  	}
  }
}