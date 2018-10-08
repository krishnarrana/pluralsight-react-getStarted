import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/scss/bootstrap.scss";
import './index.scss'

class Stars extends Component{
    
    render(){
        let stars= [];
        for(let i=0; i<this.props.randomNumbers; i++){
            stars.push(<FontAwesomeIcon className='icon' icon={faStar} key={i} />)
        }
        return(
           <div className="col-sm-5">
                 {stars}
           </div>
        )
    }
}

class Buttons extends Component{
    render(){
        return(
           <div className="col-sm-2 text-center">
                 <button className='btn btn-primary' disabled={this.props.selectedNumbers.length===0}>=</button>
           </div>
        )
    }
}

class Answers extends Component{
    render(){
        return(
           <div className="col-sm-5">
                 <div className="number-list">
                    {
                        this.props.selectedNumbers.map((number,i)=>{
                           return <span key={i}
                           onClick={()=>this.props.unselectNumber(number)}
                           >{number}</span>
                        })
                    
                    }
                 </div>
           </div>
        )
    }
}
class Numbers extends Component{
    numberClassName =(number)=>{
        if(this.props.selectedNumbers.indexOf(number)>=0){
            return "selected";
        }
    }
    render(){
        let numbers= [1,2,3,4,5,6,7,8,9]
        return(
           <div className="card text-center">
                <div className="number-list">
                    {numbers.map((number,i)=>{
                       return <span key={i} className={this.numberClassName(number)}
                       onClick={()=>this.props.selectNumber(number)}
                       >{number}</span>
                    })}
                </div>
           </div>
        )
    }
}
class Game extends Component {
    state={
        selectedNumbers: [],
        randomNumbers:1+ Math.floor(Math.random()*9)
    }
    selectNumber= (clickedNumber)=>{
        if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
            return;
        }
        this.setState(prevState=>({
            selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
        }));
    }
    unselectNumber= (clickedNumber)=>{
        this.setState(prevState=>({
            selectedNumbers:prevState.selectedNumbers.filter(number=> number !== clickedNumber)
        }));
    }
    render() { 
        return ( 
            <div className="container">
                <h1>Game Nine</h1>
                <div className="row" style={{marginBottom:'20px'}}>
                    <Stars randomNumbers={this.state.randomNumbers}/>
                    <Buttons selectedNumbers={this.state.selectedNumbers} />
                    <Answers selectedNumbers={this.state.selectedNumbers} unselectNumber= {this.unselectNumber}/>
                </div>
                <Numbers  selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
}
 
export default Game;

class App extends Component {
    render() { 
        return (
            <div className="main-container">
                <Game />
            </div>
          );
    }
}
 

ReactDOM.render(
    <App />,
    document.getElementById('root')
);