import React, { Component } from 'react';
import { Network, Node, Edge } from '@lifeomic/react-vis-network';
import {fetchNodes} from "../utils/networks";
import {Alert} from "react-bootstrap";


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
            }
            else {
                this.setState({error: data.data.error})
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
        else {
            return <></>
        }
    };

    handleDoubleClick = (event) => {
        if (event.nodes[0] && event.nodes[0]!==this.state.user.userId) {
            window.location.pathname = event.nodes[0]
        }
    };



    /*

*/

    render() {
        if (this.state.user.userId && !this.state.error) {
            return (
                <Network className="network" ref={this.networkRef} options={this.state.options}>
                    <Node id={this.state.user.userId} label={this.state.user.userId} shape='circularImage'
                          image={this.state.user.avatarUrl}/>
                    {this.state.user.following.map(this.onlyFollowing)}
                    {this.state.user.followers.map(this.onlyFollower)}
                </Network>
            );
        } else if (this.state.error){
            return (
                <div id="Page">
                    <Alert bsStyle="danger" onDismiss={()=>{window.location.pathname=""}}>
                        <h4>Oh snap! You got an error!</h4>
                        <p>Your query cannot be fulfilled.</p>
                        <p>These are the possible reasons:</p>
                        <ul>The user does not exist.</ul>
                        <ul>The server is not available.</ul>
                    </Alert>
                </div>
            );
        }
        else {
            return (<></>)
        }
    }

}


