import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./Sidebar.css";

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar col col-3">
				<div className="menu">
					<h1><Link to="/staff/build/">Reslife DeskApp</Link></h1>
					<p className="small subtitle">Mackin</p>

					<ul className="unstyled">
						<li><Link to="/staff/build/communication">Communication Log</Link></li>
					</ul>

					<p className="small category">Equipement</p>
					<ul className="unstyled">
						<li><Link to="/staff/build/equipment/log">Log in / out</Link></li>
						<li><Link to="/staff/build/equipment/list">List equipment rented out</Link></li>
						<li><Link to="/staff/build/equipment/manage">Manage equipment</Link></li>
					</ul>

					<p className="small category">Keys</p>
					<ul className="unstyled">
						<li><Link to="/staff/build/keys/log">Log in / out</Link></li>
						<li><Link to="/staff/build/keys/list">List keys rented out</Link></li>
						<li><Link to="/staff/build/keys/manage">Manage keys</Link></li>
					</ul>

					<p className="small category">Residents</p>
					<ul className="unstyled">
						<li><Link to="/staff/build/residents/warning">Give a warning</Link></li>
						<li><Link to="/staff/build/residents/manage">Manage residents</Link></li>
					</ul>

					<p className="small category">General Administration</p>
					<ul className="unstyled">
						<li><Link to="/staff/build/admin/users">Users</Link></li>
					</ul>

					<p className="small category">External Links</p>
					<ul className="unstyled">
						<li><a href="https://subitup.com">Clock in / Clock out</a></li>
						<li><a href="/">The Housing Director</a></li>
					</ul>

					<div className="row align-right">
						<button className="button secondary outline small">Log out</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Sidebar;
