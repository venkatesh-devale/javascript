import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="white">
                    <div class="nav-wrapper">
                    <ul class="right hide-on-med-and-down white">
                        <li><Link to="/"><span class="blue-text text-darken-2">Login</span></Link></li>
                        <li><Link to="/about"><span class="blue-text text-darken-2">Signup</span></Link></li>
                        <li><a class="waves-effect waves-light btn orange">Post a Project</a></li>
                    </ul>
                    
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;