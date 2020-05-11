import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get("/api/exercises/" + this.props.match.params.id)
            .then((result) => {

                this.setState({
                    username: result.data.username,
                    description: result.data.description,
                    duration: result.data.duration,
                    date: new Date(result.data.date),
                });

            })
            .catch(error => {
                console.error(error);
            });


        axios.get("/api/users/")
            .then((result) => {
                if (result.data.length > 0) {
                    console.log(result.data);

                    this.setState({
                        users: result.data.map((user) => user.username),

                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post("/api/exercises/update/" + this.props.match.params.id, exercise)
            .then((result) => {
                console.log(result.data);
            }).catch(error => {
                console.error(error);
            });

        window.location = "/";
    }

    render() {
        return (
            <div >
                <h3>Edit Exercises Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">User Name : </label>
                        <select ref="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user, index) {
                                    return <option key={index} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="testdescription">Description : </label>
                        <textarea type="text" className="form-control"
                            ref="testdescription"
                            value={this.state.description}
                            onChange={this.onChangeDescription} ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (in minutes) : </label>
                        <input type="text" className="form-control"
                            ref="duration"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mydate">Date : </label>
                        <DatePicker
                            ref="mydate"
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                    </div>
                    <button type="submit" className="btn btn-primary" value="Edit Exercise Log">Edit Exercise Log</button>
                </form>

            </div>
        );
    }
}