import React, { Component } from "react";
import { Form, Button, Header, Divider } from "semantic-ui-react";
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
			namawakemsi: "",
			nimwakemsi: "",
			emailwakemsi: "",
			id_linewakemsi: "",
			no_hpwakemsi: "",			
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
			namawakemsi: this.state.namawakemsi,
			nimwakemsi: this.state.nimwakemsi,
			emailwakemsi: this.state.emailwakemsi,
			id_linewakemsi: this.state.id_linewakemsi,
			no_hpwakemsi: this.state.no_hpwakemsi,
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
						<Header textAlign="center" as='h1' content='Form Pendaftaran KEMSI-WAKEMSI' />
							<Form onSubmit={() => {
								this.setState({ loading: true })
								this.daftar(nama, nim, token)
							}}>
								<Divider inverted horizontal>BIODATA CALON KEMSI</Divider>
								<Form.Input fluid label="Nama Calon KEMSI" placeholder="Nama Calon KEMSI" value={nama} readOnly />
								<Form.Input fluid label="NIM Calon KEMSI" placeholder="NIM Calon KEMSI" value={nim} readOnly />
								<Form.Input required fluid label="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email Calon KEMSI" />
								<Form.Input required fluid label="ID LINE" onChange={(e) => { this.setState({ id_line: e.target.value }) }} placeholder="ID Line Calon KEMSI" />
								<Form.Input required type="number" fluid label="NO HP" onChange={(e) => { this.setState({ no_hp: e.target.value }) }} placeholder="No. HP Calon KEMSI" />
								
								<Divider inverted horizontal>BIODATA CALON WAKEMSI</Divider>
								
								<Form.Input required fluid label="Nama Calon WAKEMSI" onChange={(e) => { this.setState({ namawakemsi: e.target.value }) }} placeholder="Nama Calon WAKEMSI" />
								<Form.Input required type="number" fluid label="NIM Calon WAKEMSI" onChange={(e) => { this.setState({ nimwakemsi: e.target.value }) }} placeholder="NIM Calon WAKEMSI" />
								<Form.Input required fluid label="Email" onChange={(e) => { this.setState({ emailwakemsi: e.target.value }) }} placeholder="Email Calon WAKEMSI" />
								<Form.Input required fluid label="ID LINE" onChange={(e) => { this.setState({ id_linewakemsi: e.target.value }) }} placeholder="ID Line Calon WAKEMSI" />
								<Form.Input required type="number" fluid label="NO HP" onChange={(e) => { this.setState({ no_hpwakemsi: e.target.value }) }} placeholder="No. HP Calon WAKEMSI" />
								
								<Divider inverted horizontal>ALASAN MENDAFTAR</Divider>
								
								<Form.TextArea required placeholder="Berikan alasanmu mendaftar, minimal 1 paragraf." onChange={e => this.setState({ alasan: e.target.value })} />
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
