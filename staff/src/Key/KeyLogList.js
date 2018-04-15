import React, { Component } from "react";

import { Link } from 'react-router-dom';

class KeyLogList extends Component {
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
                    <td><Link to={ "/key/id/" + record.key.id }>{record.key.id}</Link></td>
                    <td>{record.key.name}</td>
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
        fetch("/api/key/rented", {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json"
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
            <table class="bordered striped" >
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Key ID</th>
                    <th>Key Name</th>
                    <th>Employee</th>
                    <th>Time Out</th>
                </tr>
                {this.state.html}
            </table >
        );
    }
}
export default LogList;