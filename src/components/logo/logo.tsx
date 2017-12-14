import { Link } from 'react-router-dom'
import * as React from 'react'
import './logo.less';

export const Logo = ({ className = "" }) => {
    return <Link to="/" className={`logo ${className}`}><i className="iconfont icon-logo"></i></Link>

}