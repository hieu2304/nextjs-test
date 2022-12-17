/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import React from 'react'
import styled from 'styled-components'

const ICON_SIZE = {
  xxs: 12,
  xs: 16,
  small: 18,
  normal: 24,
  large: 36,
  xl: 48,
  xxl: 96,
}

const ICON_TYPE = {
  filled: 'material-icons',
  outlined: 'material-icons-outlined',
  rounded: 'material-icons-round',
  'two-tone': 'material-icons-two-tone',
  sharp: 'material-icons-sharp',
}

const Container = styled.div`
  width: ${props => props.width}px !important;
  height: ${props => props.height}px !important;

  &&& > i {
    font-size: ${props => (props.width < props.height ? props.width : props.height)}px !important;
  }
`

export default ({
  className = '',
  iconName,
  iconType = 'filled',
  iconClass = '',
  size = 'normal',
  width,
  height,
  style,
  withBackground = false,
  otherProps = {},
}) => (width && height
  ? (
    <Container
      className={`material-icons-wrapper ${className} ${withBackground ? 'with-background' : ''}`}
      style={style}
      width={width}
      height={height}
      {...otherProps}
    >
      <i className={`${ICON_TYPE[iconType]} ${iconClass}`}>{iconName}</i>
    </Container>
  )
  : (
    <div
      className={`material-icons-wrapper md-${ICON_SIZE[size]} ${className} ${withBackground ? 'with-background' : ''}`}
      style={style}
      {...otherProps}
    >
      <i className={`${ICON_TYPE[iconType]} ${iconClass}`}>{iconName}</i>
    </div>
  )
)
