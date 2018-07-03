import React from 'react';
import './Track.css';

class Track extends React.Component{
constructor(props){
  super(props);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.renderAction = this.renderAction.bind(this);
}

  renderAction(){
    if(this.props.isRemoval){
      return(<a>-</a>);
    }
    return(<a>+</a>);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render(){
    return(
      <div class="Track">
        <div class="Track-information">
          <h3>track name will go here</h3>
          <p>track artist will go here | track album will go here</p>
        </div>
      <a class="Track-action" onClick={this.addTrack}>
      {this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
