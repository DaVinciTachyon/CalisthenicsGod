import React from 'react'
import { Button as MaterialButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const Button = withStyles(({ palette }) => ({
  root: {
    color: palette.background.default,
    backgroundColor: palette.text.primary,
    '&.thin': {
      height: '1em',
    },
    display: 'block',
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

const ErrorButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.main,
    backgroundColor: palette.background.default,
  },
}))(Button)

const DeleteButton = withStyles(({ palette }) => ({
  root: {
    color: palette.background.default,
    backgroundColor: palette.error.main,
  },
}))(Button)

const SuccessButton = withStyles(({ palette }) => ({
  root: {
    color: palette.background.default,
    backgroundColor: palette.success.main,
  },
}))(Button)

export { Button, ErrorButton, DeleteButton, SuccessButton }
