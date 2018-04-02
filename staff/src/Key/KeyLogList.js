import React, { Component } from "react";

class KeyLogList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: <tr><td colspan="6"><div className="message">Loading data...</div></td></tr>,
            data: []
        };
    }

    fetchData() {
        fetch("/api/key/rented", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json"
            }
        })
    }

    render() {
        return (
            <table class="bordered striped">
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Key ID</th>
                    <th>Employee</th>
                    <th>Time Out</th>
                </tr>
                {this.state.html}
            </table>
        );
    }
}
export default LogList;