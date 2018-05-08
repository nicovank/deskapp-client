import React, {Component} from "react";

class ResidentModal extends Component {

    constructor(props) {
        super(props);
        this.state = props.employee;
        this.state.create = true;
    }

    componentWillReceiveProps(props) {
        if (!props.resident) {

            // Blank state
            this.setState({
                id: "",
                firstName: "",
                lastName: "",
                roomNb: "",
                email: "",
                phoneNb: "",
                create: true
            });

        } else {
            this.setState(props.resident);
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

        fetch("/api/residents/save", {
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
                roomNb: this.state.roomNb,
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
            <div id="resident-modal" className="modal-box hide">
                <div className="modal">
                    <span className="close"></span>
                    <div className="modal-header">Add / Edit Resident</div>
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
                                <label>Room Number <span className="req">*</span></label>
                                <input type="room" name="roomNb"
                                       onChange={this.handleChange.bind(this)}
                                       value={this.state.roomNb}></input>
                             </div>
                            <div className="form-item">
                                <label>Email <span className="req">*</span></label>
                                <input type="email" name="email" 
                                        onChange={this.handleChange.bind(this)}
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

export default ResidentModal;