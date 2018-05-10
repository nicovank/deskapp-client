import React, {Component} from "react";

import Modal from "./KeyModal.js";
import { Link } from 'react-router-dom';

class KeyManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr>
                <td colSpan="4">
                    <div className="message">Loading data...</div>
                </td>
            </tr>,
            data: []
        };

        this.fetchData();
    }

    static openModal() {
        window.$.modalwindow({target: '#key-modal'});
    }

    delete(id) {
        return function () {
            if (window.confirm(`Do you really want to delete key ${id}?`)) {
                fetch("/api/keys/delete", {
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
                    <td><Link to={"/keys/history/" + record.id}>{record.id}</Link></td>
                    <td>{record.type}</td>
                    <td>
                        <button onClick={this.delete(record.id).bind(this)} className="button secondary">
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
        fetch("/api/keys/list", {
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
                        <td colSpan="4">
                            <div className="message error">{error}</div>
                        </td>
                    </tr>
                });
            });
    }

    render() {
        return (
            <div>
                <Modal></Modal>
                <h2>Manage Keys</h2>
                <div className="form-item right-align">
                    <button onClick={this.openModal}>
                        <i className="fas fa-plus"></i></button>
                </div>
                <table className="bordered striped">
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Options</th>
                    </tr>
                    {this.state.html}
                </table>
            </div>
        );
    }
}

export default KeyManage;