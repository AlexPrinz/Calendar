import * as React from 'react';
import * as theme from './theme.scss';

interface IEventProps {
  onEventChange?: (event: Calendar.Event) => void;
  onEventClick?: (event: Calendar.Event) => void;
  onEventContextMenu?: (event: Calendar.Event, e: Event) => void;
  event: Calendar.Event;
  time: Date;
}

interface IEventState {
  offset: number;
}


export default class Event extends React.Component<IEventProps, IEventState> {

  isDragging = false;
  hourSize = 50.5;
  stepDivider = 4;
  didMove = false;
  startY;

  trunc(x:number) {
    if (isNaN(x)) {
      return NaN;
    }
    if (x > 0) {
      return Math.floor(x);
    }
    return Math.ceil(x);
  }

  getHeight() {
    const currentHeight = (
      ((this.props.event.end.getTime() - this.props.event.start.getTime()) / 60) / 60
    )  / 1000 * this.hourSize;
    if (this.state && typeof this.state.offset !== 'undefined' && this.isDragging) {
      return  (currentHeight + this.state.offset);
    }
    return currentHeight;
  }

  roundTime(time, roundMinutes): number {
    const roundMilliseconds = (60 * 1000 * roundMinutes);
    return time + roundMilliseconds / 2 - (time + roundMilliseconds / 2) % roundMilliseconds;
  }

  pixleToTime(pixle): number {
    return ((pixle * 1000) / this.hourSize) * 60 * 60;
  }

  getStart() {
    return (
      (((this.props.event.start.getTime() - this.props.time.getTime()) / 60) / 60) / 1000
    ) * this.hourSize;
  }

  handleMouseMove = (e: MouseEvent) => {
    if (this.isDragging) {
      this.didMove = true;
      const divider: number = this.hourSize / this.stepDivider;
      let offset: number = this.trunc((e.clientY - this.startY) / divider) * divider;
      offset = (e.clientY - this.startY);
      this.setState({ offset });
    }
  }

  startDragging(e) {
    this.isDragging = true;
    this.startY = e.clientY;
    this.didMove = false;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.endDragging);
  }

  endDragging = (e) => {
    if (this.didMove) {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.endDragging);
      this.isDragging = false;
      if (typeof this.props.onEventChange === 'function') {
        const event = this.props.event;
        event.end = new Date(this.roundTime(
          this.trunc(event.end.getTime() + this.pixleToTime(this.state.offset)), 15,
        ));
        this.props.onEventChange(event);
      }
    } else {
      this.onEventClick(true);
    }
  }

  onEventClick(force) {
    if (typeof this.props.onEventClick === 'function' && (force || this.didMove === false)) {
      this.props.onEventClick(this.props.event);
    }
    this.didMove = false;
  }

  onContextMenu(e) {
    if (typeof this.props.onEventContextMenu === 'function') {
      this.props.onEventContextMenu(this.props.event, e);
    }
  }

  getIcon() {
    return (
      <span
        onMouseDown={this.startDragging.bind(this)}
        className={theme.dragHandle}
      >
        Drag
      </span>
    );
  }

  render() {
    const style = {
      top: this.getStart(),
      height: this.getHeight(),
    };
    return (
      <div
        onClick={this.onEventClick.bind(this, false)}
        onContextMenu={this.onContextMenu.bind(this)}
        style={style}
        className={theme.event}
      >
        <div className={theme.summary}>{this.props.event.summary}</div>
        <div className={theme.description}>{this.props.event.description}</div>
        {this.getIcon()}
      </div>
    );
  }
}
