import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home/Home.js"
import Communication from "./Communication/Communication.js"
import History from "./Equipment/History.js"
import Log from "./Equipment/Log.js"
import KeyHistory from "./Key/KeyHistory.js"
import KeyLog from "./Key/KeyLog.js"
import Employee from "./Employee/Employee.js"
import Resident from "./Resident/Resident.js";

class Content extends Component {
	render() {
		return (
			<div className="content col offset-1 col-8">
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/communication" component={Communication}></Route>
					<Route exact path="/communication/:page" component={Communication}></Route>
                    <Route exact path="/equipment/history/:id" component={History}></Route>
					<Route exact path="/equipment/log" component={Log}></Route>
					<Route exact path="/keys/log" component={KeyLog}></Route>
					<Route exact path="/keys/history/:id" component={KeyHistory}></Route>
					<Route exact path="/admin/employees" component={Employee}></Route>
					<Route exact path="/residents/manage" component={Resident}></Route>

				</Switch>
			</div>
		);
	}
}

export default Content;
