import React, { Component } from "react";

class EmployeeModal extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="employee-modal" className="modal-box hide">
				<div className="modal">
					<span className="close"></span>
					<div className="modal-header">Modal Header</div>
					<div className="modal-body">THIS IS WHERE THE FORM WILL BE.</div>
				</div>
			</div>
		);
	}
}

export default EmployeeModal;