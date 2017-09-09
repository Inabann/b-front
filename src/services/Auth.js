export default function (Vue) {
	Vue.auth = {
		setToken(token, userId, expi, ttl){
			localStorage.setItem('accessToken', token);
			localStorage.setItem('userId', userId);
			localStorage.setItem('expi', expi);
			localStorage.setItem('ttl', ttl);
		},

		destroyToken(){
			localStorage.removeItem('accessToken');
			localStorage.removeItem('userId');
			localStorage.removeItem('expi');
			localStorage.removeItem('ttl');
		},
		getToken(){
			var data = {};
			var token = localStorage.getItem('accessToken');
			var userId = localStorage.getItem('userId');
			var expi = localStorage.getItem('expi');
			var ttl = localStorage.getItem('ttl');
			data.token = token;
			data.userId = userId;

			if (!token )
				return null;

			if((parseInt(Date.now()) - parseInt(expi)) < ttl){
				this.destroyToken();
				return null;
			} else{
				return data;
			}
		},
		
		isAuthd(){
			if(this.getToken()){
				return true;
			} else {
				return false;
			}
		},
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get(){
				return Vue.auth;
			}
		}
	})
}