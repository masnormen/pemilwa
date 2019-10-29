import React from "react";
import { Message} from "semantic-ui-react";

const Registered = () => (
	<div style={{PaddingTop :50,marginBottom:50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
		<div style={{ width: '50vw' }}>
			<Message success>
				<h1>Pendaftaran Telah Ditutup Lur!</h1>
			</Message>
		</div>
	</div>
);

export default Registered;
