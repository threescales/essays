import * as React from 'react'
import * as classnames from 'classnames'
export const Button = ({ onClick, isActive = false, children, onlyPC = false }) => {
    return <button
        className={classnames({ 'button': true, 'active': isActive, 'only-pc': onlyPC })}
        disabled={isActive}
        onClick={onClick}>
        {children}
    </button>
}