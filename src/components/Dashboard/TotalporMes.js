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
      this.$http.post('/api/Facturas/VendidoporMes').then(res => {
        this.labels = res.data.meses
        this.cantidad = res.data.cantidad
        this.setGraph()
      })
    } else{
      this.$http.post('/api/Facturas/VendidoporLocal', {local: this.$auth.getToken().userId}).then(res => {
        this.labels = res.data.meses
        this.cantidad = res.data.cantidad
        this.setGraph()
      })
    }
    
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.labels,
  			datasets: [
  				{label: 'Invertido', data: this.cantidad, backgroundColor: '#0FA3B1'}
  			]
  		}, {legend: {display : true}, maintainAspectRatio: false})
  	}
  }
}