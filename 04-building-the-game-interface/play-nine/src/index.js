import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/scss/bootstrap.scss";
import './index.scss'

class Stars extends Component{
    
    render(){
        const numberOfStars= 1+ Math.floor(Math.random()*9);
        let stars= [];
        for(let i=0; i<numberOfStars; i++){
            stars.push(<FontAwesomeIcon className='icon' icon={faStar} />)
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
                 <button className='btn btn-primary'>=</button>
           </div>
        )
    }
}

class Answers extends Component{
    render(){
        return(
           <div className="col-sm-5">
                 <div className="number-list">
                    <span >1</span>
                 </div>
           </div>
        )
    }
}
class Numbers extends Component{
    render(){
        let numbers= [1,2,3,4,5,6,7,8,9]
        return(
           <div className="card text-center">
                <div className="number-list">
                    {numbers.map((number,i)=>{
                       return <span key={i}>{number}</span>
                    })}
                </div>
           </div>
        )
    }
}
class Game extends Component {
    render() { 
        return ( 
            <div className="container">
                <h1>Game Nine</h1>
                <div className="row" style={{marginBottom:'20px'}}>
                    <Stars/>
                    <Buttons/>
                    <Answers/>
                </div>
                <Numbers />
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