import React, {Component} from 'react';

export default class City extends Component {
  render(){
    return (
      <div className='alert alert-danger alert-dismissible fade show' role='alert'>
        I Invite us to your city!
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




