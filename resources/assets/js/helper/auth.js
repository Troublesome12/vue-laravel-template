export function login(credentials){
	return new Promise((res, rej) => {
		axios.post('/api/auth/login', credentials)
		.then((response) => {
			res(response.data)
		})
		.catch((err) => {
			rej("Wrong email or password")
		})
	})
}

export function getLocalUser(){
	const usrStr = localStorage.getItem('user')

	if(!usrStr){
		return null;
	}

	return JSON.parse(usrStr);
}
