import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ""
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post("/api/users/add", user)
        .then((result) => {
            console.log(result.data);
        }).catch(error => {
            console.error(error);
        });

        this.setState({
            username : "",
        });
    }

    render() {
        return (
            <div >
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">User Name : </label>
                        <input type="text" ref="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />                            
                    </div>

                    
                    <button type="submit" className="btn btn-primary" value="Create User">Create User</button>
                </form>

            </div>
        );
    }
}