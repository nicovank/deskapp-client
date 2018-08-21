import React, {Component} from "react";

import Modal from "./EquipModal.js";
import { Link } from 'react-router-dom';

class Manage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            html: <tr>
                <td colSpan="5">
                    <div className="message">Loading data...</div>
                </td>
            </tr>,
            data: [],
            selectedEquipment: {},
            selectedID: null
        };

        this.fetchData();
    }

    openModal(equipmentInfo, id) {
        return function () {
            this.setState({
                selectedEquipment : equipmentInfo,
                selectedID: id
            });

            window.$.modalwindow({target: '#equipment-modal'});
        };
    }

    delete(equipmentInfo) {
        return function () {
            if (window.confirm(`Do you really want to delete equipment ${equipmentInfo.name}?`)) {
                fetch("/api/equipment/delete", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        "Token": window.globals.token
                    },
                    body: JSON.stringify({
                        id: equipmentInfo.id
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
                    <td><Link to={"/equipment/history/" + record.id}>{record.id}</Link></td>
                    <td>{record.name}</td>
                    <td>{record.category}</td>
                    <td>
                        <button onClick={this.openModal(record, record.id).bind(this)}>
                            <i className="fas fa-edit"></i></button>
                        &nbsp;
                        <button onClick={this.delete(record).bind(this)} className="button secondary">
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
        fetch("/api/equipment/list", {
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
                        <td colSpan="5">
                            <div className="message error">{error}</div>
                        </td>
                    </tr>
                });
            });
    }

    render() {
        return (
            <div>
                <Modal equipment={this.state.selectedEquipment}></Modal>
                <h2>Manage Equipments</h2>
                <div className="form-item right-align">
                    <button onClick={this.openModal(null, null).bind(this)}>
                        <i className="fas fa-plus"></i></button>
                </div>
                <table className="bordered striped">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Options</th>
                    </tr>
                    {this.state.html}
                </table>
            </div>
        );
    }
}

export default Manage;