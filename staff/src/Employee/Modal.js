import React, {Component} from "react";

class EmployeeModal extends Component {

    constructor(props) {
        super(props);
        this.state = props.employee;
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
                    phoneNb: ""
                });

        } else {
            this.setState(props.employee);
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
            body: JSON.stringify( {
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
                                <label>Student ID <input type="text" name="id" onChange={this.handleChange.bind(this)}
                                                         value={this.state.id}></input></label>
                            </div>
                            <div className="form-item">
                                <label>First Name <input type="text" name="firstName"
                                                         onChange={this.handleChange.bind(this)}
                                                         value={this.state.firstName}></input></label>
                            </div>
                            <div className="form-item">
                                <label>Last Name <input type="text" name="lastName"
                                                        onChange={this.handleChange.bind(this)}
                                                        value={this.state.lastName}></input></label>
                            </div>
                            <div className="form-item">
                                <label>Position
                                    <select value={this.state.position} name="position"
                                            onChange={this.handleChange.bind(this)}>
                                        <option value="DA">Desk Attendant</option>
                                        <option value="RA">Resident Assistant</option>
                                        <option value="AHD">Assistant Hall Director</option>
                                        <option value="RHD">Residence Hall Director</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-item">
                                <label>Email <input type="email" name="email" onChange={this.handleChange.bind(this)}
                                                    value={this.state.email}></input></label>
                            </div>
                            <div className="form-item">
                                <label>Phone Number <input type="phone" name="phoneNb"
                                                           onChange={this.handleChange.bind(this)}
                                                           value={this.state.phoneNb}></input></label>
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