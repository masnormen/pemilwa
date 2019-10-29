import React from "react";
import { Message} from "semantic-ui-react";
import { AuthConsumer } from "../AuthContext";

const Sukses = () => (
	<div style={{ paddingTop :50,marginBottom:50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
		<div style={{ width: '50vw' }}>
			<AuthConsumer>
				{({ link }) => (
					<Message success>
						<h1>Terimakasih, Anda telah terdaftar sebagai CAKEMSI/CAWAKEMSI/Calon BPMSI!</h1>
						
					</Message>
				)}
			</AuthConsumer>
		</div>
	</div>
);

export default Sukses;
