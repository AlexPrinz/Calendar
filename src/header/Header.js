import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import {IconButton} from 'react-toolbox/lib/button';
import theme from './theme.scss'

@observer
export default class Hour extends Component {

  imagePath = 'css/images/calendar/'

  getNextAndPreviewButton(){
    return (
      <div className={theme.nextAndPreviewDiv}>
        <IconButton onClick = {this.props.onPrevouse } className={theme.nextAndPreview} icon='keyboard_arrow_left' />
        <IconButton onClick = {this.props.onNext } className={theme.nextAndPreview} icon='keyboard_arrow_right' />
      </div>
    )
  }

  render() {
    let style = {}
    let asfd = theme
    style[ 'background' ] = `url(${this.imagePath}${this.props.month}.jpg) center center / cover`
    style[ 'backgroundSize' ] = 'cover'
    return (
      <div style = { style } className={theme.headerImage}>
        {this.getNextAndPreviewButton()}
      </div>
    )
  }
}
