import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./Sidebar.css";

class Sidebar extends Component {

	static isManager() {
		return window.globals.employee.position === "RHD" || window.globals.employee.position === "AHD";
	}

	render() {
		return (
			<div className="sidebar col col-3">
				<div className="menu">
					<h1><Link to="/">Reslife DeskApp</Link></h1>
					<p className="small subtitle">{window.globals.employee.building}</p>

					<ul className="unstyled">
						<li><Link to="/communication">Communication Log</Link></li>
					</ul>

					<p className="small category">Equipments</p>
					<ul className="unstyled">
						<li><Link to="/equipment/log">Log In / Out</Link></li>
						<li><Link to="/equipment/manage" className={Sidebar.isManager() ? "" : "hide"}>Manage Equipments</Link></li>
					</ul>

					<p className="small category">Keys</p>
					<ul className="unstyled">
						<li><Link to="/keys/log">Log In / Out</Link></li>
						<li><Link to="/keys/manage" className={Sidebar.isManager() ? "" : "hide"}>Manage Keys</Link></li>
					</ul>

					<p className={Sidebar.isManager() ? "small category" : "hide"}>Residents</p>
					<ul className="unstyled">
						<li><Link to="/residents/manage" className={Sidebar.isManager() ? "" : "hide"}>Manage Residents</Link></li>
					</ul>

					<p className={Sidebar.isManager() ? "small category" : "hide"}>General Administration</p>
					<ul className={Sidebar.isManager() ? "unstyled" : "hide"}>
						<li><Link to="/admin/employees">Employees</Link></li>
					</ul>

					<p className="small category">External Links</p>
					<ul className="unstyled">
						<li><a target="_blank" rel="noopener noreferrer" href="http://sunyoswego.timeclock.subitup.com">Clock in / Clock out</a></li>
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
