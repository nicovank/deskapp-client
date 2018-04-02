import React, { Component } from "react";

class LogList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: <tr><td colspan="6"><div className="message">Loading data...</div></td></tr>,
            data: []
        };
    }

    render() {
        return (
            <table class="bordered striped">
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
        );
    }
}
export default LogList;