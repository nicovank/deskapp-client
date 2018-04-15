import React, { Component } from "react";

import LogList from "./LogList.js"

class Log extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: "",
            equipment: ""
        };
    }

    handleStudentIDChange(event) {
        this.setState({ student: event.target.value });
    }

    handleEquipmentIDChange(event) {
        this.setState({ equipment: event.target.value, error: false });
    }
    
    log() {
        if (this.state.equipment === "") {
			this.setState({error: true});
			return;
        }
        
        fetch("/api/equipment/log", {
        	method: "POST",
        	credentials: 'same-origin',
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify({
                equipment: this.state.equipment,
                resident: this.state.student
        	})
        })
        	.then(() => {
				window.location.reload();
			})
        	.catch(e => alert(e));
    }

    render() {
        return (
            <div>
                <h2>Equipment Log In/Out</h2>
                <div className="row">
                    <form className="form col col-6 offset-3">
                        <div className="form-item">
                            <label>Student ID <div class="desc">Not needed while logging out.</div></label>
                            <input type="text" autoFocus
                                onChange={this.handleStudentIDChange.bind(this)}>
                            </input>
                        </div>

                        <div className="form-item">
                            <label>Equipment ID <span className="req">*</span></label>
                            <input type="text"
                                className={this.state.error ? "error" : ""}
                                onChange={this.handleEquipmentIDChange.bind(this)}>
                            </input>
                        </div>

                        <div className="form-item right-align">
                            <button onClick={this.log.bind(this)}>Submit</button>
                        </div>
                    </form>

                    <LogList></LogList>
                </div>
            </div>
        );
    }
}

export default Log;