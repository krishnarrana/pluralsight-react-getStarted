import React, {Component}from "react";
import ReactDOM from "react-dom";

class App extends Component {
    state = { 
        counter: 0
     }
     incrementCounter =(incrementValue)=>{
        this.setState((prevState)=>({
            counter: prevState.counter + incrementValue
        }));
     }
     resetCounter= ()=>{
        this.setState(()=>({
            counter: 0
        }));
     }
    render() { 
        return (
            <div>
                <Result counter={this.state.counter}/>
                <Button incrementValue= {1} onClickFunction= {this.incrementCounter}/>
                <Button incrementValue= {10} onClickFunction= {this.incrementCounter}/>
                <Button incrementValue= {20} onClickFunction= {this.incrementCounter}/>
                <Button incrementValue= {40} onClickFunction= {this.incrementCounter}/>
                <Button incrementValue= {50} onClickFunction= {this.incrementCounter}/>
                <Button incrementValue= {100} onClickFunction= {this.incrementCounter}/><br/>
                <Reset onClickReset ={this.resetCounter} />
            </div>
        );
    }
}
class Reset extends Component {
    render() { 
        return ( 
            <button onClick={this.props.onClickReset}>Reset</button>
         );
    }
}
 
export default Reset;
class Result extends Component {
    render() { 
        return ( 
            <div>
                <h1>{this.props.counter}</h1>
            </div>
         );
    }
}
class Button extends Component {
    handleClick= ()=>{
        this.props.onClickFunction(this.props.incrementValue);
    }
    render() { 
        return ( <button onClick= {this.handleClick}>+{this.props.incrementValue}</button> );
    }
}
 
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);