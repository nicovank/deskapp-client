import React, {Component} from "react";

class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            data: [{
                equipment: {
                    id: "",
                    name: "Loading..."
                }
            }],
            table: <div className="message">Loading history...</div>
        };

        this.fetchHistory();
    }

    fetchHistory() {
        fetch("/api/equipment/history", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Token": window.globals.token
            },
            body: JSON.stringify({
                id: this.state.id
            })
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

    refreshHTML() {
        const html = [];
        for (let record of this.state.data) {
            html.push(
                <tr>
                    <td>{record.resident.id}</td>
                    <td>{record.resident.firstName} {record.resident.lastName}</td>
                    <td>{record.employee.firstName} {record.employee.lastName}</td>
                    <td>{new Date(record.timeOut).toLocaleString()}</td>
                    <td>{record.employee_in.firstName} {record.employee_in.lastName}</td>
                    <td>{new Date(record.timeIn).toLocaleString()}</td>
                </tr>
            );
        }

        this.setState({
            table: <div className="w100">
                <table className="bordered striped w100">
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Employee Out</th>
                        <th>Time Out</th>
                        <th>Employee In</th>
                        <th>Time In</th>
                    </tr>
                    {html}
                </table>
            </div>
        });
    }

    render() {
        return (
            <div className="w100">
                <h2>{this.state.data[0].equipment.name} #{this.state.data[0].equipment.id}</h2>

                {this.state.table}
            </div>
        );
    }
}

export default History;