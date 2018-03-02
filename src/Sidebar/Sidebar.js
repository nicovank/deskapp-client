import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import "./Sidebar.css";

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar col col-3">
				<div className="menu">
					<h1><NavLink to='/'>Reslife DeskApp</NavLink></h1>
					<p className="small subtitle">Mackin</p>

					<ul className="unstyled">
						<li><NavLink to="/communication">Communication Log</NavLink></li>
					</ul>

					<p className="small category">Equipement</p>
					<ul className="unstyled">
						<li><NavLink to="/equipment/log">Log in / out</NavLink></li>
						<li><NavLink to="/equipment/list">List equipment rented out</NavLink></li>
						<li><NavLink to="/equipment/manage">Manage equipment</NavLink></li>
					</ul>

					<p className="small category">Keys</p>
					<ul className="unstyled">
						<li><NavLink to="/keys/log">Log in / out</NavLink></li>
						<li><NavLink to="/keys/list">List keys rented out</NavLink></li>
						<li><NavLink to="/keys/manage">Manage keys</NavLink></li>
					</ul>

					<p className="small category">Residents</p>
					<ul className="unstyled">
						<li><NavLink to="/residents/warning">Give a warning</NavLink></li>
						<li><NavLink to="/residents/manage">Manage residents</NavLink></li>
					</ul>

					<p className="small category">General Administration</p>
					<ul className="unstyled">
						<li><NavLink to="/admin/users">Users</NavLink></li>
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
