import React from 'react'

export function removeSlash (string) {
  return string.replace('/', '')
}

export function captalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function newLineToBr (string) {
  return string.split('\n').map(function (item, index) {
    return (<span key={index}>{item}<br /></span>)
  })
}
