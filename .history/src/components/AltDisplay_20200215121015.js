import React from 'react';
import '../styles/AltDisplay.css'




class AltDisplay extends React.Component{

  constructor(props){
    super(props);

    this.state = {username: '',
    userNumber: '',
    emergencyName: '',
    emergencyNumber: '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  this.setState({username: event.target.username, userNumber: event.target.userNumber});

}

handleSubmit(event) {

  alert('A name was submitted: ' + this.state.username);
  event.preventDefault();
}

render(){
    return(
        <>

<div className='alt-con'>

<div className='alt-header'>
<h1>meMap</h1>
</div>

<form class="contact-section" onSubmit={this.handleSubmit}>
      <div class="inner-width">
        <input type="text" class="name" placeholder="Your Name" value={this.state.username} onChange={this.handleChange} ></input>
        <input type="email" class="email" placeholder="Your Phone Number"></input>
        <textarea rows="1" placeholder="Your emergency contact name" class="message"></textarea>
        <textarea rows="1" placeholder="Your emergency contact phone number" class="message"></textarea>
        <button type='submit' value="Submit">Get in touch</button>
      </div>
    </form>

</div>

        </>
    )
}
}


export default AltDisplay;