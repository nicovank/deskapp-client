import React, {Component} from "react";

class EmployeeModal extends Component {

    constructor(props) {
        super(props);
        this.state = props.employee;
        this.state.create = true;
    }

    componentWillReceiveProps(props) {
        if (!props.employee) {

            // Blank state
            this.setState({
                id: "",
                firstName: "",
                lastName: "",
                position: "DA",
                email: "",
                phoneNb: "",
                create: true
            });

        } else {
            this.setState(props.employee);
            this.setState({
                create: false
            });
        }
    }

    handleChange(event) {
        if (!event.target.className.includes("disabled")) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    submit() {
        window.$("#saveButton").addClass("disabled");

        fetch("/api/employees/save", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "Token": window.globals.token
            },
            body: JSON.stringify({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                position: this.state.position,
                email: this.state.email,
                phoneNb: this.state.phoneNb
            })
        })

            .then(res => res.json())
            .then(data => {
                if (data.error !== undefined) {
                    return Promise.reject(data.error);
                }

                window.location.reload();
            });
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
                                <label>Student ID <span className="req">*</span></label>
                                <input type="text" name="id" onChange={this.handleChange.bind(this)}
                                       className={(this.state.create ? "" : "disabled")}
                                       value={this.state.id}></input>
                            </div>
                            <div className="form-item">
                                <label>First Name <span className="req">*</span></label>
                                <input type="text" name="firstName"
                                       onChange={this.handleChange.bind(this)}
                                       value={this.state.firstName}></input>
                            </div>
                            <div className="form-item">
                                <label>Last Name <span className="req">*</span></label>
                                <input type="text" name="lastName"
                                       onChange={this.handleChange.bind(this)}
                                       value={this.state.lastName}></input>
                            </div>
                            <div className="form-item">
                                <label>Position <span className="req">*</span></label>
                                <select value={this.state.position} name="position"
                                        onChange={this.handleChange.bind(this)}>
                                    <option value="DA">Desk Attendant</option>
                                    <option value="RA">Resident Assistant</option>
                                    <option value="AHD">Assistant Hall Director</option>
                                    <option value="RHD">Residence Hall Director</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <label>Email <span className="req">*</span></label>
                                <input type="email" name="email" onChange={this.handleChange.bind(this)}
                                       value={this.state.email}></input>
                            </div>
                            <div className="form-item">
                                <label>Phone Number </label>
                                <input type="phone" name="phoneNb"
                                       onChange={this.handleChange.bind(this)}
                                       value={this.state.phoneNb}></input>
                            </div>
                            <div id="saveButton" className="button" onClick={this.submit.bind(this)}>Save</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeModal;