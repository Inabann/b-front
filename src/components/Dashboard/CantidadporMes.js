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
    if(this.$auth.getToken().admin == 'true'){
      this.$http.post('/api/Venta/VendidoporMes').then(res => {
        this.labels = res.data.meses
        this.cantidad = res.data.cantidad
        this.setGraph()
        let c = this.cantidad.slice(-1)
        this.$emit('VentaxMes', c[0])
      })
    } else{
      this.$http.post('/api/Venta/VendidoporLocal', {local: this.$auth.getToken().userId}).then(res => {
        this.labels = res.data.meses
        this.cantidad = res.data.cantidad
        this.setGraph()
        let c = this.cantidad.slice(-1)
        this.$emit('VentaxMes', c[0])
      })
    }
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