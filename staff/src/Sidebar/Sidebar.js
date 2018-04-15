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

					<p className="small category">Equipment</p>
					<ul className="unstyled">
						<li><Link to="/equipment/log">Log In / Out</Link></li>
						<li><Link to="/equipment/manage">Manage Equipment</Link></li>
					</ul>

					<p className="small category">Keys</p>
					<ul className="unstyled">
						<li><Link to="/keys/log">Log In / Out</Link></li>
						<li><Link to="/keys/manage">Manage keys</Link></li>
					</ul>

					<p className="small category">Residents</p>
					<ul className="unstyled">
						<li><Link to="/residents/warning">Warnings</Link></li>
						<li><Link to="/residents/manage">Manage Residents</Link></li>
					</ul>

					<p className="small category">General Administration</p>
					<ul className="unstyled">
						<li><Link to="/admin/users">Users</Link></li>
					</ul>

					<p className="small category">External Links</p>
					<ul className="unstyled">
						<li><a target="_blank" rel="noopener noreferrer" href="https://subitup.com">Clock in / Clock out</a></li>
						<li><a target="_blank" rel="noopener noreferrer" href="https://oswego.datacenter.adirondacksolutions.com/oswego_thd_prod/mobile">The Housing Director</a></li>
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
