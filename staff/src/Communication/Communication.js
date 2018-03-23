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
				<h2>Communication Log</h2>

                <div className="form-item">
                    <textarea name="message" rows="3"></textarea>
                </div>
                <div className="form-item right-align">
                    <button>Post</button>
                </div>

                <h4>Previous posts</h4>

				{this.state.messages}
			</div>
		);
	}
}

export default Communication;
