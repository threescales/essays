import * as React from 'react'
import * as classnames from 'classnames'
export const Button = ({onClick,isActive=false,children})=> {
    return <button className={classnames({'active':isActive})} onClick={onClick}>{children}</button>
}