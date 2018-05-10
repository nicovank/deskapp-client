import React, {Component} from "react";

class EquipModal extends Component {

    constructor(props) {
        super(props);
        this.state = props.equipment;
        this.state.create = true;
    }

    componentWillReceiveProps(props) {
        if (!props.equipment) {

            // Blank state
            this.setState({
                id: "",
                name: "",
                category: "",
                create: true
            });

        } else {
            this.setState(props.equipment);
            this.setState({
                create: false
            });
        }
    }

    handleChange(event) {
        if (!event.target.className.includes("disabled")) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    submit() {
        window.$("#saveButton").addClass("disabled");

        fetch("/api/equipment/save", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "Token": window.globals.token
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                category: this.state.category
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

    render() {
        return (
            <div id="equipment-modal" className="modal-box hide">
                <div className="modal">
                    <span className="close"></span>
                    <div className="modal-header">Add / Edit Equipment</div>
                    <div className="modal-body">
                        <form className="form">
                            <div className="form-item">
                                <label>Equipment ID <span className="req">*</span></label>
                                <input type="text" name="id" onChange={this.handleChange.bind(this)}
                                       className={(this.state.create ? "" : "disabled")}
                                       value={this.state.id}></input>
                            </div>
                            <div className="form-item">
                                <label>Name <span className="req">*</span></label>
                                <input type="text" name="name"
                                       onChange={this.handleChange.bind(this)}
                                       value={this.state.name}></input>
                            </div>
                            <div className="form-item">
                                <label>Category <span className="req">*</span></label>
                                 <input type="text" name="category"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.category}></input>
                            </div>
                            <div id="saveButton" className="button" onClick={this.submit.bind(this)}>Save</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EquipModal;