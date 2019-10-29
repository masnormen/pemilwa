import React, { Component } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { AuthConsumer } from "../AuthContext";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nim: "",
			password: "",
			nama: "",
			prodi: "",
			loading: false,
			message: false
		};
	}

	render() {
		return (
			<AuthConsumer>
				{({ login, setStatus, setLoading }) => (
					<div id="top">
						<div id="headercontain">
							<div id="welcome">PEMILWA SI 2019</div>
							<div className="desc">Login menggunakan akun SIAM untuk pendaftaran calon KEMSI-WAKEMSI*/BPMSI.<br/>*)didaftarkan oleh akun CAKEMSI</div>
							<Form size="large">
								<Form.Input fluid type="number" icon="user" iconPosition="left" placeholder="NIM" onChange={input => this.setState({ nim: input.target.value })} />
								<Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={input => this.setState({ password: input.target.value })} />
								{this.state.loading && (
									<Button fluid size="large" loading primary>
										Loading
									</Button>
								)}
								{this.state.loading === false && (
									<Button
										color="blue"
										fluid
										size="large"
										onClick={async () => {
											this.setState({ loading: true });
											//cek nim
											if (this.state.nim.length == 15) {
												await login(this.state.nim, this.state.password).then(ress => {
													let a = ress;
													console.log(ress);
													if (!a.status) {
														this.setState({ message: true });
														this.setState({ loading: false });
													} else {
														const URL = 'http://api.pemilwa.online/api/v1/post/auth'
														const body = {
															nim: this.state.nim
														}
														const res = fetch(URL, {
															method: "POST",
															headers: {
																"content-type": "application/json",
																"authorization": "bearer " + ress.token
															},
															body: JSON.stringify(body)
														}).then(ress => {
															return ress.json()
														}).then(resss => {
															setStatus(resss.value);
															if (resss.status === true) {
																this.setState({ loading: false });
																if (resss.value === null) {
																	setLoading(false);
																	this.props.history.replace("/success");
																}
															} else {
																setLoading(false);
															}
														}).catch(err => {
															// alert('Request Time Out. Try Again!')
															console.log(err)
														})
														this.setState({ loading: false });
														this.props.history.replace("/pilihan");
													}
												});
											} else {
												this.setState({ loading: false });
												this.setState({ message: true });
											}
										}}>
										Login
									</Button>
								)}
							</Form>
						<br></br>
						<br></br>
						<br></br>
						<br></br>
						{this.state.loading === true && (
							<div style={{ marginBottom: 50, marginTop: -10 }}>
								<div className="ui icon message">
									<i className="notched circle loading icon" />
									<div className="content">
										<div className="header">Tunggu sebentar!</div>
										<p>Sebentar lagi Anda akan berpindah halaman...</p>
									</div>
								</div>
							</div>
						)}
						{this.state.message === true && (
							<Message
								style={{ marginBottom: 50, marginTop: -10 }}
								error
								header='Password atau NIM Anda salah!'
								content='Silahkan mencoba login kembali!'
							/>
						)}
						</div></div>
				)}
			</AuthConsumer>
		);
	}
}
