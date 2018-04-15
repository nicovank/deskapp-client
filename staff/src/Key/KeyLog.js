import React, { Component } from "react";

import KeyLogList from "./KeyLogList.js"

class KeyLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: "",
            key: ""
        };
    }

    handleStudentIDChange(event) {
        this.setState({ student: event.target.value });
    }

    handleKeyIDChange(event) {
        this.setState({ key: event.target.value, error: false });
    }
    
    log() {
        if (this.state.key === "") {
			this.setState({error: true});
			return;
        }
        
        fetch("/api/key/log", {
        	method: "POST",
        	credentials: 'same-origin',
        	headers: {
        		"Content-Type": "application/json"
        	},
        	body: JSON.stringify({
                key: this.state.key,
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
                <h2>Key Log In/Out</h2>
                <div className="row">
                    <form className="form col col-6 offset-3">
                        <div className="form-item">
                            <label>Student ID <div class="desc">Not needed while logging out.</div></label>
                            <input type="text" autoFocus
                                onChange={this.handleStudentIDChange.bind(this)}>
                            </input>
                        </div>

                        <div className="form-item">
                            <label>Key ID <span className="req">*</span></label>
                            <input type="text"
                                className={this.state.error ? "error" : ""}
                                onChange={this.handleKeyIDChange.bind(this)}>
                            </input>
                        </div>

                        <div className="form-item right-align">
                            <button onClick={this.log.bind(this)}>Submit</button>
                        </div>
                    </form>

                    <KeyLogList></KeyLogList>
                </div>
            </div>
        );
    }
}

export default KeyLog;