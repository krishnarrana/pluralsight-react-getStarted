import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class Card extends Component{
    render(){
        return(
            <div >
                <img style={{float: 'left', margin:'0 10px 20px 0'}} width='70'src={this.props.avatar_url} alt=""/>
                <p>{this.props.name}</p>
                <p>{this.props.company}</p>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

class CardList extends Component{
    render(){
        return(
            <div>
                {
                    this.props.cards.map((card,index)=>{
                        return <Card key={index} {...card}/>
                     })
                }
            </div>
        )
    }
}
class Form extends Component {
    state= {
        userName:""
    }
    handleSubmit= (event)=>{
        event.preventDefault();
        console.log("Event form submit",this.state.userName);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp =>{
                this.props.onSubmit(resp.data)
                this.setState({userName:''})
            })
    }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    value={this.state.userName}
                    onChange={(event)=>{
                        return (
                            this.setState({
                                userName: event.target.value
                            })
                        )
                    }}
                    placeholder="GitUser Name" required />
                <button type="submit">Add Card</button>
                <br /><br />
            </form>
         );
    }
}
 
class App extends Component {
    state={
        datas:[]
    }
    addNewCard= (cardInfo)=>{
        this.setState(prevState=>({
            datas:prevState.datas.concat(cardInfo)
        }))
    }
    render() { 
        return (  
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards= {this.state.datas}/>
            </div>
        );
    }
}
 
ReactDOM.render(<App />,
    document.getElementById('root'))