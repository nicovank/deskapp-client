import React, { Component } from "react";

import { Link } from 'react-router-dom';

class KeyLogList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keys: {
                html: <tr><td colspan="6"><div className="message">Loading data...</div></td></tr>
            },
            fobs : {
                html: <tr><td colspan="6"><div className="message">Loading data...</div></td></tr>
            },
            data: []
        };

        this.fetchData();
    }

    refreshHTML() {
        const keysArray = [];
        const fobsArray = [];

        for (let record of this.state.data) {

            const recordHTML = (
                <tr>
                    <td>{record.resident.id}</td>
                    <td>{record.resident.firstName} {record.resident.lastName}</td>
                    <td><Link to={ "/keys/id/" + record.access.id }>{record.access.id}</Link></td>
                    <td>{record.employee.firstName} {record.employee.lastName}</td>
                    <td>{new Date(record.timeOut).toLocaleString()}</td>
                </tr>
            );

            if (record.access.type === "key") {
                keysArray.push(recordHTML);
            } else {
                fobsArray.push(recordHTML);
            }
        }

        this.setState({
            keys: {
                html: keysArray
            },
            fobs: {
                html: fobsArray
            }
        });
    }

    fetchData() {
        fetch("/api/keys/rented", {
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
            <div>
                <div>
                    <h3>Keys Currently Logged Out</h3>
                    <table className="bordered striped" >
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Key ID</th>
                            <th>Employee</th>
                            <th>Time Out</th>
                        </tr>
                        {this.state.keys.html}
                    </table>
                </div>

                <div>
                <h3>Fobs Currently Logged Out</h3>
                <table className="bordered striped" >
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Fob ID</th>
                        <th>Employee</th>
                        <th>Time Out</th>
                    </tr>
                    {this.state.fobs.html}
                </table>
            </div>
        </div>
        );
    }
}
export default KeyLogList;