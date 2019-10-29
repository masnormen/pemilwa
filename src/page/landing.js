import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./style.scss";
import { AuthConsumer } from "../AuthContext";
export default class Landing extends Component {
	render() {
		return (
			<AuthConsumer>
				{() => (
					<React.Fragment>
						<div id="top">
							<div id="headercontain">
								<div id="welcome">PEMILWA SI 2019</div>
								<Button
									color="orange"
									animated="vertical"
									size="big"
									centered
									onClick={
									async () => {
										this.props.history.replace("/FormEMSI");
									}}>
									<Button.Content visible>Daftar KEMSI-WAKEMSI</Button.Content>
									<Button.Content hidden>Go Now</Button.Content>
								</Button>
								<br/><br/>
								<Button
									color="vk"
									animated="vertical"
									size="big"
									centered
									onClick={async () => {
										this.props.history.replace("/FormBPMSI");
									}}>
									<Button.Content visible>Daftar BPMSI</Button.Content>
									<Button.Content hidden>Go Now</Button.Content>
								</Button>
							</div>
						</div>
					</React.Fragment>
				)}
			</AuthConsumer>
		);
	}
}
