import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
    constructor(props){
        super(props) ;

    }
    componentDidMount(){
        console.log("Parent component");
    }
    render() {
        return (
            <div>
                <h1>About</h1>
                <h2>This is namasthe react </h2>
                
                <UserClass name = {"Priya"}/>;
            </div>
        );
    };
};


export default About ;