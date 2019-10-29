import React from "react";
import { Message } from "semantic-ui-react";
import { AuthConsumer } from "../AuthContext";

const Notif = () => (
  <AuthConsumer>
    {({ status }) => {
      if (status == 1) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ width: "50vw" }}>
              <Message success>
                <h1>Selamat!</h1>
                <h4>
                 LOLOS
                </h4>
              </Message>
            </div>
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ width: "50vw" }}>
              <Message warning>
                <h1>Mohon maaf</h1>
                <h4>
                  Sorry
                </h4>
              </Message>
            </div>
          </div>
        );
      }
    }}
  </AuthConsumer>
);

export default Notif;
