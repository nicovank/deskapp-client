import React, { Component } from "react";

import Modal from "./Modal.js";

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr><td colspan="7"><div className="message">Loading data...</div></td></tr>,
            data: []
        };

        this.fetchData();
    }

    refreshHTML() {
        const dataArray = [];
        for (let record of this.state.data) {
            dataArray.push(
                <tr>
                    <td>{record.id}</td>
                    <td>{record.firstName}</td>
                    <td>{record.lastName}</td>
                    <td>{record.position}</td>
                    <td>{record.email}</td>
                    <td>{record.phoneNb}</td>
                    <td><button data-component="modal" data-target="#employee-modal">Edit</button></td>
                </tr>
            );
        }

        this.setState({
            html: dataArray
        });
    }

    fetchData() {
        fetch("/api/employees/list", {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Token": window.globals.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error !== undefined) {
                    return Promise.reject(data.error);
                }

                this.setState({
                    data: data
                });

                this.refreshHTML();
            });
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