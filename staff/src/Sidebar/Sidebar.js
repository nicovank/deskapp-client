import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./Sidebar.css";

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar col col-3">
				<div className="menu">
					<h1><Link to="/">Reslife DeskApp</Link></h1>
					<p className="small subtitle">Mackin</p>

					<ul className="unstyled">
						<li><Link to="/communication">Communication Log</Link></li>
					</ul>

					<p className="small category">Equipement</p>
					<ul className="unstyled">
						<li><Link to="/equipment/log">Log in / out</Link></li>
						<li><Link to="/equipment/list">List equipment rented out</Link></li>
						<li><Link to="/equipment/manage">Manage equipment</Link></li>
					</ul>

					<p className="small category">Keys</p>
					<ul className="unstyled">
						<li><Link to="/keys/log">Log in / out</Link></li>
						<li><Link to="/keys/list">List keys rented out</Link></li>
						<li><Link to="/keys/manage">Manage keys</Link></li>
					</ul>

					<p className="small category">Residents</p>
					<ul className="unstyled">
						<li><Link to="/residents/warning">Give a warning</Link></li>
						<li><Link to="/residents/manage">Manage residents</Link></li>
					</ul>

					<p className="small category">General Administration</p>
					<ul className="unstyled">
						<li><Link to="/admin/users">Users</Link></li>
					</ul>

					<p className="small category">External Links</p>
					<ul className="unstyled">
						<li><a target="_blank" href="https://subitup.com">Clock in / Clock out</a></li>
						<li><a target="_blank" href="https://oswego.datacenter.adirondacksolutions.com/oswego_thd_prod/mobile">The Housing Director</a></li>
					</ul>

					<div className="row align-right">
						<a href="/logout"><button className="button secondary outline small">Log out</button></a>
					</div>
				</div>
			</div>
		);
	}
}

export default Sidebar;
