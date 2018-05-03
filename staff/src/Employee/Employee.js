import React, { Component } from "react";

import Modal from "./Modal.js";

class Employee extends Component {

    constructor(props) {
        super(props);

        window.$('#employee-modal').on('closed.modal', () => {
            this.fetchData();
        });

        this.state = {
            html: <tr><td colSpan="7"><div className="message">Loading data...</div></td></tr>,
            data: [],
            selectedEmployee: {},
            selectedID: null
        };

        this.fetchData();
    }

    openModal(employeeInfo, id) {
        return function() {
            this.setState({
                selectedEmployee: employeeInfo,
                selectedID: id
            });

            window.$.modalwindow({ target: '#employee-modal' });
        };
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
                    <td><button onClick={this.openModal(record, record.id).bind(this)}>Edit</button></td>
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
            })
            .catch(error => {
               this.setState({
                   html: <tr><td colSpan="7"><div className="message error">{error}</div></td></tr>
               });
            });
    }

    render() {
        return (
            <div>
                <Modal employee={this.state.selectedEmployee}></Modal>
                <h2>Employee List</h2>
                <div className="form-item right-align"> <button onClick={this.openModal(null, null).bind(this)}>Add</button></div>
                <table className="bordered striped" >
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