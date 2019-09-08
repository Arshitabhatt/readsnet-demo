import React,  { Component } from 'react';

export default class Dropdown extends Component{
    render(){
        return(
            <h1>{this.props.events.name}</h1>
        );
    }
}