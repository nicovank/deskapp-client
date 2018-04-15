import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home/Home.js"
import Communication from "./Communication/Communication.js"
import Log from "./Equipment/Log.js"
import KeyLog from "./Key/KeyLog.js"

class Content extends Component {
	render() {
		return (
			<div className="content col offset-1 col-8">
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/communication" component={Communication}></Route>
					<Route exact path="/communication/:page" component={Communication}></Route>
					<Route exact path="/equipment/log" component={Log}></Route>
					<Route exact path="/key/log" component={KeyLog}></Route>
				</Switch>
			</div>
		);
	}
}

export default Content;
