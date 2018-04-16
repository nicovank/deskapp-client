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
					<div className="modal-header">Add / Edit Employee</div>
					<div className="modal-body">
						<form className="form">
							<div className="form-item">
								<label>Student ID <input type="text"></input></label>
							</div>
							<div className="form-item">
								<label>Building 
									<select>
										<option value="Hart">Hart</option>
										<option value="Funnelle">Funnelle</option>
									</select>
								</label>
							</div>
							<div className="form-item">
								<label>First Name <input type="text"></input></label>
							</div>
							<div className="form-item">
								<label>Last Name <input type="text"></input></label>
							</div>
							<div className="form-item">
								<label>Position 
									<select>
										<option value="DA">Desk Attendent</option>
										<option value="RA">Resident Assistant</option>
									</select>
								</label>
							</div>
							<div className="form-item">
								<label>Email <input type="text"></input></label>
							</div>
							<div className="form-item">
								<label>Phone Number <input type="text"></input></label>
							</div>
							<button>Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeeModal;