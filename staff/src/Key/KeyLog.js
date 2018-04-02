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
        this.setState({ key: event.target.value });
    }

    log() {
        alert(this.state.student + " , " + this.state.key)
    }

    render() {
        return (
            <div>
                <h2>Key Log In/Out</h2>
                <div className="row">
                    <form className="form col col-6 offset-3">
                        <div className="form-item">
                            <label>Student ID <span className="req">*</span></label>
                            <input type="text" onChange={this.handleStudentIDChange.bind(this)}></input>
                        </div>

                        <div className="form-item">
                            <label>Key ID <span className="req">*</span></label>
                            <input type="text" onChange={this.handleKeyIDChange.bind(this)}></input>
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