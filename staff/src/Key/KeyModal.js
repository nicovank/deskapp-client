import React, {Component} from "react";

class KeyModal extends Component {

    constructor(props) {
        super(props);
        this.state = props.key;
        this.state.create = true;
    }

    componentWillReceiveProps(props) {
        if (!props.key) {

            // Blank state
            this.setState({
                id: "",
                building_id: "",
                type: "",
                create: true
            });

        } else {
            this.setState(props.key);
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

        fetch("/api/keys/save", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "Token": window.globals.token
            },
            body: JSON.stringify({
                id: this.state.id,
                building_id: this.state.building_id,
                type: this.state.type
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
            <div id="key-modal" className="modal-box hide">
                <div className="modal">
                    <span className="close"></span>
                    <div className="modal-header">Add / Edit Key</div>
                    <div className="modal-body">
                        <form className="form">
                            <div className="form-item">
                                <label>Key ID <span className="req">*</span></label>
                                <input type="text" name="id" onChange={this.handleChange.bind(this)}
                                       className={(this.state.create ? "" : "disabled")}
                                       value={this.state.id}></input>
                            </div>
                            <div className="form-item">
                                <label>Building ID <span className="req">*</span></label>
                                <input type="text" name="building_id" onChange={this.handleChange.bind(this)}
                                       className={(this.state.create ? "" : "disabled")}
                                       value={this.state.building_id}></input>
                            </div>
                            <div className="form-item">
                                <label>Type <span className="req">*</span></label>
                                 <input type="text" name="type"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.type}></input>
                            </div>
                            <div id="saveButton" className="button" onClick={this.submit.bind(this)}>Save</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default KeyModal;