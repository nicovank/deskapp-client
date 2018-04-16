import React, { Component } from "react";

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr>
                <td colspan="6"><div className="message">Loading data...</div></td>
                <td>
                    <button data-component="modal" data-target="#my-modal">Edit</button>
                    <div id="my-modal" className="modal-box hide">
                        <div className="modal">
                            <span className="close"></span>
                            <div className="modal-header">Modal Header</div>
                            <div className="modal-body">THIS IS WHERE THE FORM WILL BE.</div>
                        </div>
                    </div>
                </td>
            </tr>
        };
    }

    render() {
        return (
            <div>
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