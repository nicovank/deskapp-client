import React, { Component } from "react";

import Sidebar from "./Sidebar/Sidebar.js";
import Content from "./Content.js"
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="app row">
				<Sidebar />
				<Content />
			</div>
		);
	}
}

export default App;
