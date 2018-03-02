import React, { Component } from "react";

import Messages from "./Messages.js"

class Communication extends Component {
	constructor(props) {
		super(props);

		const page = parseInt(props.match.params.page, 10) | 0;

		this.state = {
			messages: <Messages amount={10} page={page}></Messages>
		};
	}

	// When props change, reload messages
	componentWillReceiveProps(props) {
		const page = parseInt(props.match.params.page, 10) | 0;

		this.setState({
			messages: <Messages amount={10} page={page}></Messages>
		});
	}

	render() {
		return (
			<div>
				<h2>Communication</h2>
				{this.state.messages}
			</div>
		);
	}
}

export default Communication;
