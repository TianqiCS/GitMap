import {Component} from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React from "react";

class Input extends Component {

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Enter a Github username</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.value}
                        placeholder="Enter text"
                        onChange={this.props.onChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>You can also use your own Github private token. TODO</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}

export default Input