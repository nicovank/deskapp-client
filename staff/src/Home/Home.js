import React, { Component } from "react";

class Home extends Component {
	constructor(props) {
		super(props);

		const rhds = [];
		const ahds = [];
		const ras = [];
		const das = [];
		for (let record of window.globals.employees) {
			const recordHTML = (
				<tr>
					<td>{record.firstName}</td>
					<td>{record.lastName}</td>
					<td>{record.email}</td>
					<td>{record.phoneNb}</td>
				</tr>
			);

			switch (record.position) {
				case "RHD":
					rhds.push(recordHTML);
					break;
				case "AHD":
					ahds.push(recordHTML);
					break;
				case "RA":
					ras.push(recordHTML);
					break;
				case "DA":
					das.push(recordHTML);
					break;
				default: break;
			}
		}

		this.state = {
			rhds, ahds, ras, das
		};
	}

	render() {
		return (
			<div>
				<h2>Home</h2>
				<div>
					<h3>Contact Info</h3>

					<h4 className="center-align">RHDs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.rhds}
					</table><br />

					<h4 className="center-align">AHDs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.ahds}
					</table><br />

					<h4 className="center-align">RAs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.ras}
					</table><br />

					<h4 className="center-align">DAs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.das}
					</table>
				</div>
			</div>
		);
	}
}

export default Home;
