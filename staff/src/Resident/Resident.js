import React, {Component} from "react";

import Modal from "./ResModal.js";

class Resident extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr>
                <td colSpan="7">
                    <div className="message">Loading data...</div>
                </td>
            </tr>,
            data: [],
            selectedResident: {},
            selectedID: null
        };

        this.fetchData();
    }

    openModal(residentInfo, id) {
        return function () {
            this.setState({
                selectedResident: residentInfo,
                selectedID: id
            });

            window.$.modalwindow({target: '#resident-modal'});
        };
    }

    delete(residentInfo, id) {
        return function () {
            if (window.confirm(`Do you really want to delete resident ${residentInfo.firstName} ${residentInfo.lastName} ?`)) {
                fetch("/api/residents/delete", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        "Token": window.globals.token
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.error !== undefined) {
                            return Promise.reject(data.error);
                        }

                        window.location.reload();
                    });
            }
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
                    <td>{record.building}</td>
                    <td>{record.roomNb}</td>
                    <td>{record.email}</td>
                    <td>
                        <button onClick={this.openModal(record, record.id).bind(this)}>
                            <i className="fas fa-edit"></i></button>
                        &nbsp;
                        <button onClick={this.delete(record, record.id).bind(this)} className="button secondary">
                            <i className="fas fa-trash"></i></button>
                    </td>
                </tr>
            );
        }

        this.setState({
            html: dataArray
        });
    }

    fetchData() {
        fetch("/api/residents/list", {
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
                    html: <tr>
                        <td colSpan="7">
                            <div className="message error">{error}</div>
                        </td>
                    </tr>
                });
            });
    }

    render() {
        return (
            <div>
                <Modal resident={this.state.selectedResident}></Modal>
                <h2>Resident List</h2>
                <div className="form-item right-align">
                    <button onClick={this.openModal(null, null).bind(this)}>
                        <i className="fas fa-plus"></i></button>
                </div>
                <table className="bordered striped">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Building</th>
                        <th>Room Number</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>

                    {this.state.html}
                </table>
            </div>
        );
    }
}

export default Resident;