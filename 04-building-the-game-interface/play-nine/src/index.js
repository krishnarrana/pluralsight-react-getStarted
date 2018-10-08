import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCheck,faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
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
        let button;
        switch (this.props.answerIsCorrect) {
            case true:
                button= 
                            <button className='btn btn-success' disabled={this.props.selectedNumbers.length===0} onClick={this.props.acceptAnswer}>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        
                break;
            case false:
                button= 
                            <button className='btn btn-danger' disabled={this.props.selectedNumbers.length===0}>
                                 <FontAwesomeIcon  icon={faTimes} /> 
                            </button>
                       
                break;
        
            default:
                button= <button className='btn btn-default' disabled={this.props.selectedNumbers.length===0}
                onClick={this.props.checkAnswer}>+</button>
                break;
        }
        return(
           <div className="col-sm-2 text-center">
                 {button}
                 <br /><br />
                 <button className='btn btn-danger'  onClick={this.props.redraw}  disabled={this.props.redraws===0}>
                        <FontAwesomeIcon  icon={faRedo} /> {this.props.redraws}
                </button>

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
        if(this.props.usednumbers.indexOf(number)>=0){
            return "used";
        }
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
class DoneFrame extends Component{
    render(){
        return (
            <div>
                <h2 className="text-center">{this.props.doneStatus}</h2>
            </div>
        )
    }
}
class Game extends Component {
    state={
        selectedNumbers: [],
        randomNumbers:1+ Math.floor(Math.random()*9),
        answerIsCorrect:null,
        usednumbers:[],
        redraws:5,
        doneStatus:null
    }
    selectNumber= (clickedNumber)=>{
        if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
            return;
        }
        this.setState(prevState=>({
            answerIsCorrect:null,
            selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
        }));
    }
    unselectNumber= (clickedNumber)=>{
        this.setState(prevState=>({
            answerIsCorrect:null,
            selectedNumbers:prevState.selectedNumbers.filter(number=> number !== clickedNumber)
        }));
    }
    checkAnswer=()=>{
        this.setState(prevState=>({
            answerIsCorrect: prevState.randomNumbers===prevState.selectedNumbers.reduce((acc,n)=>acc+n,0)
        }));
    }
    acceptAnswer=()=>{
        this.setState(prevState=>({
            usednumbers:prevState.usednumbers.concat(prevState.selectedNumbers),
            selectedNumbers:[],
            answerIsCorrect:null,
            randomNumbers:1+ Math.floor(Math.random()*9),

        }),this.updateStatus)
    }
    redraw=()=>{
        if(this.state.redraws===0)return;
        this.setState((prevState)=>({
            randomNumbers:1+ Math.floor(Math.random()*9),
            selectedNumbers:[],
            answerIsCorrect:null,
            redraws:prevState.redraws-1
        }),this.updateStatus)
    }
    possibleSolutions=({randomNumbers,usednumbers})=>{
        const possibleNumbers= [1,2,3,4,5,6,7,8,9].filter(number=>
                usednumbers.indexOf(number)===1
            )
            return this.possibleCombinationSum(possibleNumbers,randomNumbers)
    }
     possibleCombinationSum =(arr, n)=> {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };
    updateStatus=()=>{
        this.setState((prevState)=>{
            if(prevState.usednumbers.length===0){
                return {doneStatus: "Done Nicely!"}
            }
            if(prevState.redraws===0 && !this.possibleSolutions(prevState)){
                return {
                    doneStatus: "Game Over"
                }
            }
        })
    }
    render() { 
        return ( 
            <div className="container">
                <h1>Game Nine</h1>
                <div className="row" style={{marginBottom:'20px'}}>
                    <Stars randomNumbers={this.state.randomNumbers}/>
                    <Buttons selectedNumbers={this.state.selectedNumbers} 
                    checkAnswer={this.checkAnswer} 
                    acceptAnswer= {this.acceptAnswer}
                    answerIsCorrect={this.state.answerIsCorrect}
                    redraws={this.state.redraws}
                    redraw ={this.redraw}/>
                    <Answers selectedNumbers={this.state.selectedNumbers} unselectNumber= {this.unselectNumber}/>
                </div>
                {
                    this.state.doneStatus? <DoneFrame doneStatus= {this.state.doneStatus} />:
                        <Numbers  selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} usednumbers={this.state.usednumbers}/>
                }
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