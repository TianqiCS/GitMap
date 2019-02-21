import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';
import {fetchNodes} from "../utils/networks";
import {Alert, Button} from "react-bootstrap";
import SideBar from "./SideBar";


export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                userId: "",
                name: "",
                avatarUrl: "",
                url: "",
                followers: [],
                following: [],
            },
            options: {
                "manipulation": {
                    enabled: true,
                },
                "edges": {
                    smooth: {
                        "type": "dynamic",
                        "forceDirection": "none"
                    },
                    length: 100
                }
            }
        };
        this.networkRef = React.createRef();
        this.deleteNodebyEdge = this.deleteNodebyEdge.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetchNodes(window.location.pathname).then((data) =>{
            console.log(data);
            if (data.status === 200 && data.data.data.user) {
                data = data.data.data;
                this.setState({
                    user: {
                        userId: data.user.login,
                        name: data.user.name,
                        avatarUrl: data.user.avatarUrl,
                        url: data.user.url,
                        followers: data.user.followers.nodes,
                        following: data.user.following.nodes,
                    }
                });
                this.networkRef.current.network.on("doubleClick", this.handleDoubleClick);
                this.networkRef.current.network.on("oncontext", this.handleContext);
            }
            else {
                this.setState({error: data.data.errors})
            }
        });


    }


    onlyFollower = (user) => {
        if (!this.state.user.following.some(u => u.login === user.login)) {
            return [
                <Node id={user.login} label={user.login} shape='circularImage' image={user.avatarUrl} color="#3333ff"/>,
                <Edge id={user.login} from={this.state.user.userId} to={user.login} arrows="from" color={{inherit:'to'}}/>
                ]
        }
        else {
            return [
                <Node id={user.login} label={user.login} shape='circularImage' image={user.avatarUrl} color="#33ff33"/>,
                <Edge id={user.login} from={this.state.user.userId} to={user.login} arrows="to;from" color={{inherit:'to'}}/>
            ]
        }
    };

    onlyFollowing = (user) => {
        if (!this.state.user.followers.some(u => u.login === user.login)) {
            return [
                <Node id={user.login} label={user.login} shape='circularImage' image={user.avatarUrl} color="#ff6633"/>,
                <Edge id={user.login} from={this.state.user.userId} to={user.login} arrows="to" color={{inherit:'to'}}/>
            ]
        }
    };

    handleDoubleClick = (event) => {
        if (event.nodes[0] && event.nodes[0]!==this.state.user.userId) {
            window.location.pathname = event.nodes[0]
        }
    };

    handleContext = (event) => {
        this.networkRef.current.network.deleteSelected();
        console.log(event);
        event.edges.forEach((element)=>{
            this.deleteNodebyEdge(element);
        });
    };

    deleteNodebyEdge(edge) {
        let user =  this.state.user;
        user.followers = this.state.user.followers.filter(e => e.login !== edge);
        user.following = this.state.user.following.filter(e => e.login !== edge);
        this.setState({
            user: user
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.deleteNodebyEdge(this.state.value);
        event.preventDefault();
    }

    /*

*/

    render() {
        console.log(this.networkRef);
        if (this.state.user.userId && !this.state.error) {
            return (
                <div className="page">
                    <Network className="network" ref={this.networkRef} options={this.state.options}>
                        <Node id={this.state.user.userId} label={this.state.user.userId} shape='circularImage'
                              image={this.state.user.avatarUrl}/>
                        {this.state.user.following.filter((user)=>{return !this.state.user.followers.some(u => u.login === user.login)}).map(this.onlyFollowing)}
                        {this.state.user.followers.map(this.onlyFollower)}
                    </Network>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <SideBar followers={this.state.user.followers} following={this.state.user.following} display={this.state.displaySideBar} network={this.networkRef}/>
                    <Button variant="outline-primary"
                            className="SideBarButton"
                            onClick={()=>{this.setState({displaySideBar: !this.state.displaySideBar})}}>
                        Menu
                    </Button>
                </div>
            );
        } else if (this.state.error){
            console.log(this.state.error);
            return (
                <div id="Page">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Alert bsStyle="danger" onDismiss={()=>{window.location.pathname=""}}>
                        <h4>Oh snap! You got an error!</h4>
                        <p>Your query cannot be fulfilled.</p>
                        <p>These are the error logs:</p>
                        {this.state.error.map(error=><ul>{"["+error.type+"] "+error.message}</ul>)}
                    </Alert>
                </div>
            );
        }
        else {
            return (<></>)
        }
    }

}


