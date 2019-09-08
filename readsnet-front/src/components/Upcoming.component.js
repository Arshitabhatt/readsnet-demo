import React, { Component } from 'react';
import axios from 'axios';
import '../styles/upcoming.css'

export default class UpcomingList extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            events: [],
            search: 'Select a City'
        };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/upcoming/')
        .then(res =>{this.setState({events: res.data});
        
    })
    .catch((err) =>{
        console.log(err)
    })
    }
    
    render(){
        
        let filterEvents = this.state.events.filter(    
            (evt) =>{
                if(this.state.search === 'Select a City'){
                    return(
                        this.state.events
                    )
                } else{
                    return(
                        evt.city === this.state.search
                    );
                }
                
            }
        );

        return(
            <div className="mt-0 mb-5">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={require('../uploads/cara1.jpg')} className="d-block w-100" alt="1"></img>
            </div>
            <div className="carousel-item">
            <img src={require('../uploads/cara2.jpg')} className="d-block w-100" alt="2"></img>
            </div>
            <div className="carousel-item">
            <img src={require('../uploads/cara3.jpg')} className="d-block w-100" alt="3"></img>
            </div>

            </div>
            <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span aria-hidden="true"><i className="fas fa-chevron-left fa-5x"></i></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span aria-hidden="true"><i className="fas fa-chevron-right fa-5x"></i></span>
            <span className="sr-only">Next</span>
            </a>
            </div>
                    {this.renderCardSelector()}
        <div>
            <div className="row ">
            { filterEvents.map((event) => { 
                return( 
                        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-around" key={event._id}>
                            <div className="card m-5 border-0 p-4">
                            <p className="display-5 mb-1 text-center">{event.date}</p>
                            <img src={event.file} className="card-img-top border" alt=''></img>
                                <div className="card-body">
                                    <h3 className="card-title text-center fw">{event.name}</h3>
                                    <p className="card-text text-justify">{event.description}</p>
                                    <hr className="b" />
                                    <h5 className="d-inline"> <a href={event.orgurl}> {event.org} </a></h5>
                                </div>
                            </div>
                        </div>
                    
                    )} 
                )}
            </div>
            </div>
        </div>
        );
    }

    selectCity(){
         
    }
    renderCardSelector(){
        return(
            <div className="form-group top-margin d-flex justify-content-center citys">
            <select className="card-selector form-control" 
              onChange={(e) => this.setState({ search: e.target.value })}>
                <option> Select a City</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Chennai</option>
                <option>Banglore</option>

            </select>
          </div>
        )
    }

  
}



