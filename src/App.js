import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Page from "./components/Page";
import {Button, Jumbotron, MenuItem, Nav, Navbar, NavDropdown, NavItem, PageHeader, Panel} from "react-bootstrap";
import Input from "./components/Input";

// const server = "localhost:3001"; @see utils/networks.js

function App() {
    return (
        <Router>
            <div className="page">
                <Navbar id="nav" inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">GitMap</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/#about">
                                About
                            </NavItem>
                            <NavDropdown eventKey={3} title="Tutorials" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} href="https://developer.github.com/v4/">GitHub API</MenuItem>
                                <MenuItem eventKey={3.2} href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">Create a Private Token</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3} href="https://github.com/TianqiCS/GitMap">GitHub Repo</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                0.3.0
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={Child}/>
            </div>
        </Router>
    );
}

function Child({ match }) {
  return (
      <Page userid={match.params.id}/>  //
  );
}

class Home extends React.Component {
    state = {
      userId: ""
    };

    userRedirect = () => {
        if (this.state.userId) {
            window.location.href="/"+this.state.userId;
        }
    };

    render() {
        return(
            <div id="home">
                <br/><br/><br/>
                <PageHeader>
                    Github User Mapping <small>see your following and followers!</small>
                </PageHeader>

                <Jumbotron>
                    <p>
                        This app enables you to visualize your github user mapping, including followers and followings.
                    </p>
                    <p>
                        <Input value={this.state.userId} onChange={ev => this.setState({userId: ev.target.value})} onPressEnter={this.userRedirect}/>
                        <Button bsStyle="info" onClick={this.userRedirect}>Show me the graph! </Button>
                    </p>
                </Jumbotron>

                <Panel id="example">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Example</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <img id="exampleImg" src="example.png" alt="graph"/>
                    </Panel.Body>
                </Panel>

                <Panel id="about">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">About</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p><a href="https://github.com/TianqiCS/GitMap">GitRepo</a></p>
                        <p>Made by <Link to="/TianqiCS">Tianqi Wang</Link></p>
                        <p>Last Updated on 2019-01-26</p>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default App;
