import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Exercise = props => (
    <tr>
        <td>{props.execise.username}</td>
        <td>{props.execise.description}</td>
        <td>{props.execise.duration}</td>
        <td>{props.execise.date.substring(0,10)}</td>
        <td><Link to={"/edit/"+props.execise._id} > edit </Link> | <a href="#" onClick={ () =>  props.deleteExercise(props.execise._id)} > delete </a></td> 
    </tr>
)

export default class ExercisesList extends Component {

    constructor (props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises : []
        }
    }

    componentDidMount (){
        axios.get("http://localhost:5000/api/exercises/")
        .then((result) => {
            if(result.data.length > 0){
                console.log(result.data);

                this.setState({
                    exercises : result.data
                });
            }           
        })
        .catch(error => {
            console.error(error);
        });
    }

    deleteExercise (id){
        axios.delete("http://localhost:5000/api/exercises/"+id)
        .then((result) => {
            console.log(result.data);
            this.setState({
                exercises : this.state.exercises.filter(el => el._id !== id)
            })         
        })
        .catch(error => {
            console.error(error);
        });
    }

    exerciseList () {
        console.log("method called...")
        
        return this.state.exercises.map( currentExecise => {
                console.log(currentExecise);
                return <Exercise execise={currentExecise} deleteExercise={this.deleteExercise} key={currentExecise._id}/>;
            } )
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration (in Minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}