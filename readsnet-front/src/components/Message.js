import React, {Component} from 'react';


export default class Message extends Component {
  render(){
    return (
      <div className='alert alert-danger alert-dismissible fade show' role='alert'>
        Upload Image of type png or jpeg
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  }
  
};




