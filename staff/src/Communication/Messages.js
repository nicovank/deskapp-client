import React, { Component } from "react";

import "./Messages.css";

class Messages extends Component {
	// Calls fetchMessages().
	constructor(props) {
		super(props);

		this.state = {
			html: <div className="message">Loading messages...</div>
		};

		this.fetchMessages();
	}

	// When props change, reload messages
	componentWillReceiveProps(props) {
		this.props = props;
		this.setState({
			html: <div className="message">Loading messages...</div>
		});
		this.fetchMessages();
	}

	// Fetch Messages from the Server and update state of the component.
	fetchMessages() {

		fetch("/api/communication/list", {
			method: "POST",
			credentials: 'same-origin',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Token": window.globals.token
			},
			body: JSON.stringify({
				page: this.props.page
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.error !== undefined) {
					return Promise.reject(data.error);
				}

				const messageArray = [];
				for (let message of data) {
					messageArray.push(
						<blockquote key={message.id} className={message.importance}>
							<p>{message.message}</p>

							<p className="small"> — <b>{message.firstName} {message.lastName}</b>, &nbsp;
							<span className="smaller">{new Date(message.time).toLocaleString()}</span></p>
						</blockquote>
					);
				}

				this.setState({
					html: messageArray
				});
			})
			.catch(error => {
				this.setState({
					html: (
						<div className="message error">
							<p>There was an error loading messages. The request failed with the following message:</p>
							<pre>{error}</pre>
						</div>
					)
				});
			});
	}

	render() {
		return (
			<div className="messages">
				{this.state.html}
			</div>
		);
	}
}

export default Messages;
