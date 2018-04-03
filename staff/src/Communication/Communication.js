import React, { Component } from "react";

import Messages from "./Messages.js"

class Communication extends Component {
	constructor(props) {
		super(props);

		const page = parseInt(props.match.params.page, 10) | 0;

		this.state = {
			messages: <Messages page={page}></Messages>,
			message: "",
			error: false
		};
	}

	// When props change, reload messages
	componentWillReceiveProps(props) {
		const page = parseInt(props.match.params.page, 10) | 0;

		this.setState({
			messages: <Messages page={page}></Messages>
		});
	}

	handleChange(event) {
		this.setState({
			message: event.target.value,
			error: false
		});
	}

	postMessage() {
		if (this.state.message === "") {
			this.setState({error: true});
			return;
		}

		fetch("/api/communication/add", {
        	method: "POST",
        	credentials: 'same-origin',
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify({
        		message: this.state.message
        	})
        })
        	.then(() => {
				this.setState({
					messages: <Messages page={0}></Messages>
				});
			})
        	.catch(e => alert(e));
	}

	render() {
		return (
			<div>
				<h2>Communication Log</h2>

                <div className="form-item">
                    <textarea name="message" rows="3" autoFocus
						value={this.state.message}
                    	onChange={this.handleChange.bind(this)}
                    	className={this.state.error ? "error" : ""}
                    />
                </div>
                <div className="form-item right-align">
                    <button onClick={this.postMessage.bind(this)}>Post</button>
                </div>

                <h4>Previous posts</h4>

				{this.state.messages}
			</div>
		);
	}
}

export default Communication;
