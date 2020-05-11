import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
                <div className="container">
                    <Link to='/' className="navbar-brand"> J Workbook </Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Excercises</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Create Excercise Log</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}


export default Navbar;