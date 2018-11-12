import React, { Component } from 'react'
import theme from './theme.scss'
import FontIcon from 'react-toolbox/lib/font_icon'

export default class Event extends Component {

  isDragging=false
  hourSize = 50.5
  stepDivider = 4
  didMove = false
  startY

  getHeight(){
    const currentHeight = (((this.props.event.end - this.props.event.start) / 60) / 60 )  / 1000 * this.hourSize
    if ( this.state && typeof this.state.offset !== 'undefined' && this.isDragging ) {
      return  (currentHeight + this.state.offset)
    }
    return currentHeight
  }

  roundTime( time, roundMinutes){
    const roundMilliseconds = ( 60 * 1000 * roundMinutes )
    return time + roundMilliseconds/2 - (time + roundMilliseconds/2) % roundMilliseconds
  }

  pixleToTime( pixle ){
    return ( (pixle * 1000) / this.hourSize ) * 60 * 60
  }

  getStart(){
    return ((((this.props.event.start - this.props.time.getTime() ) / 60) / 60 ) / 1000 ) * this.hourSize
  }

  handleMouseMove = ( e )=>{
    if ( this.isDragging ) {
      this.didMove = true
      const divider = this.hourSize / this.stepDivider
      let offset = parseInt( (e.clientY - this.startY ) / divider ) * divider
      offset = (e.clientY - this.startY )
      this.setState({offset:  offset})
    }
  }

  startDragging( e ){
    this.isDragging=true
    this.startY = e.clientY
    this.didMove = false
    window.addEventListener('mousemove', this.handleMouseMove )
    window.addEventListener('mouseup', this.endDragging )
  }

  endDragging = ( e )=>{
    if ( this.didMove ) {
      window.removeEventListener('mousemove', this.handleMouseMove )
      window.removeEventListener('mouseup', this.endDragging )
      this.isDragging=false
      if ( typeof this.props.onEventChange === 'function' ) {
        const event = this.props.event
        event.end = this.roundTime( parseInt( event.end + this.pixleToTime( this.state.offset ) ), 15 )
        this.props.onEventChange( event )
      }
    } else {
      this.onEventClick( true )
    }
  }

  onEventClick( force ) {
    if ( typeof this.props.onEventClick === 'function' && ( force || this.didMove === false)) {
      this.props.onEventClick( this.props.event )
    }
    this.didMove = false
  }

  onContextMenu( e ){
    if ( typeof this.props.onContextMenu === 'function' ) {
      this.props.onContextMenu( this.props.event, e )
    }
  }

  render() {
    const style={
      position: 'absolute',
      top: this.getStart(),
      height: this.getHeight()
    }
    return (
      <div onClick={this.onEventClick.bind(this,false)} onContextMenu={this.onContextMenu.bind(this)} style={style} className={theme.event}>
        <div className={theme.summary}>{this.props.event.summary}</div>
        <div className={theme.description}>{this.props.event.description}</div>
        <FontIcon onMouseDown={this.startDragging.bind(this)} className={theme.dragHandle} value='drag_handle' />
      </div>
    )
  }
}
