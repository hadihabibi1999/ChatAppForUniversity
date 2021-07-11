import React, { Component } from 'react';


class EachMessage extends Component {
  
    render() { 
        return ( 
            <p class="each-mess">{this.props.text}</p>
         );
    }
}
 
export default EachMessage;