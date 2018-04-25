import React, { Component } from "react";

import { Link } from 'react-router-dom';

class LogList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: <tr><td colspan="6"><div className="message">Loading data...</div></td></tr>,
            data: []
        };

        this.fetchData();
    }

    refreshHTML() {
        const dataArray = [];
        for (let record of this.state.data) {
            dataArray.push(
                <tr>
                    <td>{record.resident.id}</td>
                    <td>{record.resident.firstName} {record.resident.lastName}</td>
                    <td><Link to={ "/equipment/id/" + record.equipment.id }>{record.equipment.id}</Link></td>
                    <td>{record.equipment.name}</td>
                    <td>{record.employee.firstName} {record.employee.lastName}</td>
                    <td>{new Date(record.timeOut).toLocaleString()}</td>
                </tr>
            );
        }

        this.setState({
            html: dataArray
        });
    }

    fetchData() {
        fetch("/api/equipment/rented", {
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
            <div className="w100">
                <h3>Equipments Currently Logged Out</h3>
                <table class="bordered striped w100">
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Equipment ID</th>
                        <th>Equipment Name</th>
                        <th>Employee</th>
                        <th>Time Out</th>
                    </tr>
                    {this.state.html}
                </table>
            </div>
        );
    }
}
export default LogList;