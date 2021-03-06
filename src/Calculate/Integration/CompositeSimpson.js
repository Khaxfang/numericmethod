import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { exactIntegrate, func } from '../../services/Services';

const InputStyle = {
    background: "#F4D03F",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "24px"
};

var I, exact, error;
class Composite_Simpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_simpson(a, b, n) {
        var h = (b - a) / n
        I = (h / 3) * (func(this.state.fx, a) + func(this.state.fx, b) + (4 * this.summationFunction(1, n, h)) + (2 * this.summationFunction(2, n, 2 * h)))
        exact = exactIntegrate(this.state.fx, a, b)
        error = Math.abs((exact - I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }

    summationFunction(start, n, h) {
        var sum = 0
        if (start % 2 === 0) {
            n += 2
        }
        var xi = parseInt(this.state.a) + h
        for (var i = start; i < n; i += 2) {
            sum += func(this.state.fx, xi)
            xi = parseInt(this.state.a) + i * h

        }

        return sum
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Composite Simpson's Rule</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "white", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                            <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                            <h2>N</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.composite_simpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "#999999", color: "#FFFFFFFF" }}
                                id="outputCard"
                            >
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    Approximate = {I}<br />
                                    Exact = {exact}<br />
                                    Error = {error}%
                                </p>
                            </Card>
                        }
                    </div>


                </div>
            </div>
        );
    }
}
export default Composite_Simpson;