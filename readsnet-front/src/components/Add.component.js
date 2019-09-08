import React, {Component}from 'react';
import Message from './Message';
import axios from 'axios';
import '../styles/add.css';

export default class AddEvent extends Component{
    constructor(props){
        super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOrgName = this.onChangeOrgName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription =  this.onChangeDescription.bind(this);
    this.onChange =  this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name:'',
            description : '',
            file: null,
            date:'',
            org:'',
            orgurl:'',
            city:'',
            message:''
        }
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }

       onChange(e){
        if(e.target.files[0].type === 'image/png'|| e.target.files[0].type === 'image/jpg'|| e.target.files[0].type === 'image/jpeg' ){
            this.setState({
                file: e.target.files[0]
             });
             console.log(e.target.files[0]);
             
        }else{
            this.setState({
                message:"upload only jpg or png"
            })
            console.log("upload only jpg or png");
            console.log(this.state.file);
            // setTimeout(() => { window.location = '/addevent' }, 10000);
        }
        }

        onChangeDate(e){
            this.setState({
                date:e.target.value
            })
            
        }
        onChangeOrgName(e){
            this.setState({
                org:e.target.value
            })
        }
        onChangeUrl(e){
            this.setState({
                orgurl:e.target.value
            })
        }
        onChangeCity(e){
            this.setState({
                city: e.target.value
            })
            
        }

      onSubmit(e){
          e.preventDefault();
        var addedEvent = new FormData();
         addedEvent.append('name', this.state.name)
         addedEvent.append('description', this.state.description)
         addedEvent.append('file', this.state.file)
         addedEvent.append('org', this.state.org);
         addedEvent.append('orgurl', this.state.orgurl);
         addedEvent.append('date', this.state.date);
         addedEvent.append('city', this.state.city);
        console.log(addedEvent);
        
        axios.post('http://localhost:5000/upcoming', addedEvent, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(res => console.log(res))
        .catch(err =>{ console.log(err)});

        this.setState({
            name:' ',
            description:' ',
            file: null,
            date:' ',
            org:' ',
            orgurl:' ',
            city:''
        })

        // setTimeout(() => { window.location = '/upcoming' }, 10000);
      }
 

    render(){
        return(
    <div>
           <div className="margin container py-5">
            {this.state.message==='upload only jpg or png'? <Message />:null}
            <h3 className="text-center fwg mb-5">Share your awesome meetup/event with us</h3>
            <div className="container border rounded bg-light p-5 bg text-light">
                <div className="row">
                <div className="col"></div>
                    <div className="col-8">
                    
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group"> 
                    <label className="label">Event Name: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName} 
                        name="event[name]" placeholder="Name"
                        />
                    </div>
                    <div className="form-group"> 
                    <label className="label">City: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.city}
                        onChange={this.onChangeCity} 
                        name="event[name]" placeholder="City"
                        />
                    </div>
                    <div className="form-group"> 

                    <label className="label">Event Description (in about 140 words): </label>
                    <textarea  type="text"
                        required
                        className="form-control"
                        id="exampleFormControlTextarea1" rows="3"
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        name="event[description]" placeholder="Description"></textarea>
                    </div>
                    <div className="form-group"> 
                        <label className="label" htmlFor="exampleFormControlFile1">Event Image: </label>
                        <input type="file" 
                        className="form-control-file" 
                        id="exampleFormControlFile1"
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                         <div><label className="label">  Date and Timimgs: </label></div>
                        <input  type="text " 
                        className="form-control " 
                        value={this.state.date}
                        onChange={this.onChangeDate} 
                        placeholder="dd mon yyyy   --:-- am/pm to --:-- am /pm"/>
                    </div>
                    <div className="form-group">
                         <div><label className="label">  Your Name: </label></div>
                        <input type="text " 
                        className="form-control" 
                        value={this.state.org}
                        onChange={this.onChangeOrgName} 
                        placeholder="Your Name"/>
                    </div>
                    <div className="form-group">
                        <div><label className="label">  Your Readsnet Profile link: </label></div>
                        <input type="text " 
                        className="form-control" 
                        value={this.state.orgurl}
                        onChange={this.onChangeUrl} 
                        placeholder="Profile Url"/>
                    </div>
             
                    <div className="form-group">
                    <input type="submit" value="Add new Event" className="btn btn-primary" />
                    </div>
                </form>
                </div>
                <div className="col"></div>
                </div>    
              </div>
            </div>
            </div>
        )
    }
}


