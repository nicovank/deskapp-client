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
				<figure>
					<img alt="" src="/public/home.jpg"></img>
					<figcaption>Sheldon Hall</figcaption>
				</figure>
				<div>
					<h3>Contact Info</h3>

					<h4>RHDs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.rhds}
					</table>

					<h4>AHDs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.ahds}
					</table>

					<h4>RAs</h4>
					<table className="bordered striped">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Phone Number</th>
						</tr>
						{this.state.ras}
					</table>

					<h4>DAs</h4>
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
