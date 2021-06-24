import React from 'react'
import { Background, Success, Error, Colours } from './constants'
import { Button as MaterialButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const Button = withStyles(() => ({
  root: {
    color: Background.primary,
    backgroundColor: Colours.primary.standard,
    '&.maxWidth': {
      width: '100%',
    },
    '&.minWidth': {
      width: 'fit-content',
      height: 'fit-content',
    },
    '&.thin': {
      height: '1vw',
      'font-size': '0.5vw',
    },
  },
}))(({ children, isSecondary, isTertiary, dataId, ...rest }) => (
  <MaterialButton
    variant={isSecondary ? 'outlined' : isTertiary ? 'text' : 'contained'}
    data-id={dataId || 'button'}
    {...rest}
  >
    {children}
  </MaterialButton>
))

const ErrorButton = withStyles(() => ({
  root: {
    color: Error.primary,
    backgroundColor: Background.primary,
  },
}))(Button)

const DeleteButton = withStyles(() => ({
  root: {
    color: Background.primary,
    backgroundColor: Error.primary,
  },
}))(Button)

const SuccessButton = withStyles(() => ({
  root: {
    color: Background.primary,
    backgroundColor: Success.primary,
  },
}))(Button)

export { Button, ErrorButton, DeleteButton, SuccessButton }
