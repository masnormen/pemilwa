import React from "react";
import { Message } from "semantic-ui-react";

const Predate = () => (
    <div style={{paddingTop :50,marginBottom:50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '50vw' }}>
            <Message success>
                <h1>Pendaftaran Belum Dibuka</h1>
                <p>Silahkan pantau terus sosial media Kami!</p>
            </Message>
        </div>
    </div>
);

export default Predate;