import React from "react";
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
	state = {
		isLogged: false,
		dataUser: undefined,
		nama: undefined,
		nim: undefined,
		prodi: undefined,
		link: undefined,
		token: undefined,
		registered: false,
		status: undefined,
		isBPM: undefined,
		loading: true
	};
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.setStatus = this.setStatus.bind(this);
		this.setLoading = this.setLoading.bind(this);
	}
	//   setInfo(){
	//       this.setState({nama:nama});
	//       this.setState({nim:nim});
	//       this.setState({prodi:prodi});
	//       console.log(this.state)
	//   }

	logout() {
		this.setState({ isLogged: false });
		this.setState({ dataUser: undefined });
		this.setState({ nim: undefined });
		this.setState({ prodi: undefined });
		this.setState({ link: undefined });
		this.setState({token:undefined});
	}
	setBPM = (status) => {
		this.setState({isBPM: status});
		console.log(this.state.isBPM)
	}
	setStatus = (status) => {
		this.setState({status: status});
		console.log(this.state.status)
	}
	setLoading = (loading) => {
		this.setState({loading: loading});
		console.log(this.state.loading)
	}
	
	login = async (nim, pass) => {
		const body = {
			nim: nim,
			pass: pass
		};
		try {
			const res = await fetch("http://api.pemilwa.online/api/v1/post/auth", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"content-type": "application/json",
				},
				body: JSON.stringify(body)
			});
			const result = res;
			const data = await res.json();
			console.log(data);
			if (!result.ok) {
				return false;
			}else{
				this.setState({ isLogged: true });
				this.setState({ nim: data.nim });
				this.setState({ nama: data.nama });
				this.setState({ prodi: data.prodi });
				this.setState({token: data.token});
				console.log(this.state)
				return {"status": true, "token": data.token};
			}
			
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					isLogged: this.state.isLogged,
					dataUser: this.state.dataUser,
					nama: this.state.nama,
					nim: this.state.nim,
					prodi: this.state.prodi,
					login: this.login,
					link: this.state.link,
					logout: this.logout,
					token: this.state.token,
					isBPM: this.state.isBPM,
					status: this.state.status,
					setStatus: this.setStatus,
					setLoading: this.setLoading
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };