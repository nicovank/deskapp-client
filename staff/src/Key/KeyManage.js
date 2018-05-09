import React, {Component} from "react";

import Modal from "./KeyModal.js";

class KeyManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr>
                <td colSpan="4">
                    <div className="message">Loading data...</div>
                </td>
            </tr>,
            data: [],
            selectedKey: {},
            selectedID: null
        };

        this.fetchData();
    }

    openModal(keyInfo, id) {
        return function () {
            this.setState({
                selectedKey : keyInfo,
                selectedID: id
            });

            window.$.modalwindow({target: '#key-modal'});
        };
    }

    delete(keyInfo, id) {
        return function () {
            if (window.confirm(`Do you really want to delete key ${keyInfo.id}?`)) {
                fetch("/api/key/delete", {
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
                    <td>{record.building_id}</td>
                    <td>{record.type}</td>
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
                <Modal key={this.state.selectedKey}></Modal>
                <h2>Manage Keys</h2>
                <div className="form-item right-align">
                    <button onClick={this.openModal(null, null).bind(this)}>
                        <i className="fas fa-plus"></i></button>
                </div>
                <table className="bordered striped">
                    <tr>
                        <th>ID</th>
                        <th>Building ID</th>
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