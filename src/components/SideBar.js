import React, { Component } from 'react';
import {Tab, Table, Tabs} from "react-bootstrap";
import './SideBar.css';

export default class SideBar extends Component {


    render() {
        return (
            <Tabs id="SideBar" className="SideBar" defaultActiveKey="profile" style={{width: this.props.display? "33%" : 0}}>
                <Tab eventKey="profile" title="Profile" >
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                        <tr>
                            <th className="tableImg"
                                style={{backgroundImage: `url("github-512.png")`, backgroundSize: "100% 100%"}}
                            />
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.followers.map((user) =>
                            <tr>
                                <td className="tableImg"
                                    style={{backgroundImage: `url("${user.avatarUrl}")`, backgroundSize: "100% 100%"}}
                                    onDoubleClick={()=>{window.location.pathname=user.login}}
                                    onClick={()=>{
                                        this.props.network.current.network.selectNodes([user.login])
                                    }}
                                />
                                <td><a href={user.url}>{user.login}</a></td>
                                <td>{user.name}</td>
                            </tr>
                        )}
                        <hr/>
                        {this.props.following.map((user) =>
                            <tr>
                                <td className="tableImg"
                                    style={{backgroundImage: `url("${user.avatarUrl}")`, backgroundSize: "100% 100%"}}
                                    onDoubleClick={()=>{window.location.pathname=user.login}}
                                    onClick={()=>{
                                        this.props.network.current.network.selectNodes([user.login])
                                    }}
                                />
                                <td><a href={user.url}>{user.login}</a></td>
                                <td>{user.name}</td>
                            </tr>
                        )}

                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="customize" title="Customization" disabled>
                    TODO
                </Tab>
                <Tab eventKey="settings" title="Settings" disabled>
                    TODO
                </Tab>
            </Tabs>
        )
    }


}