import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home/Home.js"
import Communication from "./Communication/Communication.js"

class Content extends Component {
	render() {
		return (
			<div className="content col offset-1 col-8">
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/communication" component={Communication}></Route>
					<Route exact path="/communication/:page" component={Communication}></Route>
				</Switch>
			</div>
		);
	}
}

export default Content;
