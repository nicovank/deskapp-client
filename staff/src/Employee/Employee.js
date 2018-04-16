import React, { Component } from "react";

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: "",
            key: ""
        };
    }

    render() {
        return (
            <div>
                <h3>Employee List</h3>
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