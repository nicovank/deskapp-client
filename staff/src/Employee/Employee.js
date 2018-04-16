import React, { Component } from "react";

import Modal from "./Modal.js";

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr><td colspan="7"><div className="message">Loading data...</div></td></tr>
        };
    }

    render() {
        return (
            <div>
                <Modal></Modal>
                <h2>Employee List</h2>
                <div className="form-item right-align"> <button>Add</button></div>
                <table class="bordered striped" >
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Options</th>
                    </tr>
                    {this.state.html}
                </table>
            </div>
        );
    }
}

export default Employee;