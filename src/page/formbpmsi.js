import React, { Component } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { AuthConsumer } from "../AuthContext";
// import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { throws } from "assert";

// const URL = 'http://localhost:5000/api/web/protected/postOprecStaffInau';
const URL = "https://backend-bem.herokuapp.com/api/web/protected/postOpregLOT2019";

export default class FormPendaftaran extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nim: "",
			nama: "",
			email: "",
			id_line: "",
			no_hp: "",
			alasan: "",
			loading: false,
		};
	}

	handleChange = (e, { value }) => this.setState({ value });

	daftar = async (nama, nim, token) => {
		const body = {
			nim: nim,
			nama: nama,
			email: this.state.email,
			id_line: this.state.id_line,
			no_hp: this.state.no_hp,
			alasan: this.state.alasan,
		};
		console.log(body);
		await fetch(URL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"authorization": "bearer " + token
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					console.log("sukses");
					return response.json();
				}
				return response.json().then(error => {
					throw new Error(error);
				});
			})
			.then(ress => {
				// console.log(ress)
				this.props.history.replace("/success");
			});
	};

	render() {
		var batas = new Date("2019-11-04T24:00:00+07:00");
		var pembukaan = new Date("2019-10-28T00:00:00+07:00");
		var sekarang = new Date();
		if (batas < sekarang) {
			this.props.history.replace('/registered');
		}
		if (pembukaan > sekarang){
			this.props.history.replace('/closed')
		}
		return (
			<AuthConsumer>
				{({ nama, nim, token }) => (
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '3vw' }}>
						<div class="daftar" style={{ width: '70vw', maxWidth: '500px' }}>
						<Header textAlign="center" as='h1' content='Form Pendaftaran BPMSI' />
							<Form onSubmit={() => {
								this.setState({ loading: true })
								this.daftar(nama, nim, token)
							}}>
								<Form.Input fluid label="Nama" placeholder="Nama" value={nama} readOnly />
								<Form.Input fluid label="NIM" placeholder="NIM" value={nim} readOnly />
								<Form.Input required fluid label="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email" />
								<Form.Input required fluid label="ID LINE" onChange={(e) => { this.setState({ id_line: e.target.value }) }} placeholder="ID Line" />
								<Form.Input required type="number" fluid label="NO HP" onChange={(e) => { this.setState({ no_hp: e.target.value }) }} placeholder="No. HP" />
								<Form.TextArea required label="Alasan Mendaftar" required placeholder="Berikan alasanmu mendaftar, minimal 1 paragraf." onChange={e => this.setState({ alasan: e.target.value })} />
								{this.state.loading === false && (
									<Button
										size="big"
										color="orange"
										fluid
									>
										Submit
							</Button>
								)}
								{this.state.loading === true && (
									<Button size="big" color="green" loading fluid>
										Login
							</Button>
								)}
							</Form>
						</div>
					</div>
				)}
			</AuthConsumer>
		);
	}
}
