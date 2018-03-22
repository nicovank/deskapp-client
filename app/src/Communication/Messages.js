import React, { Component } from "react";

import "./Messages.css"

/** 
 * Serialize transforms an object to a serialized, form data-like string that the servlet will be able to use.
 * 
 * Example:
 * 
 * 		{
 * 			page: 0,
 * 			username: "nicovank"
 * 		}
 * 
 * Will be converted to:
 * 
 * 		"page=0&username=nicovank"
 * 
 * Nested properties will not be serialized.
 * 
*/
const serialize = obj => {
	let output = "";
	for (let property in obj) {
		if (typeof obj[property] !== "object") {
			output += property + "=" + obj[property] + "&";
		}
	}

	if (output !== "") {
		output = output.substring(0, output.length - 1);
	}

	return output;
}

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

		fetch("http://localhost:8080/api/communication", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: serialize({
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

							<p className="small"> — <b>{message.user}</b>, &nbsp;
							<span className="smaller">{new Date(message.time).toLocaleString()}</span></p>
						</blockquote>
					);

					this.setState({
						html: messageArray
					});
				}
			})
			.catch(e => {
				console.log(e);
				this.setState({
					html: (
						<div className="message error">
							<p>There was an error loading messages. The request failed with the following message:</p>
							<pre>{e.message}</pre>
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
