import * as React from 'react'
import './input.less'

export const Label = ({ value }) => {
    return value ? <label className="label">{value}</label> : null
}
export const Input = ({ value, onChange, placeholder='请输入内容',type = 'text' }) => {
    return <input className="input" type={type} value={value} onChange={onChange} placeholder={placeholder}/>
}

export const Textarea = ({ value, onChange,placeholder="请输入内容" }) => {
    return <textarea className="textarea" onChange={onChange} value={value} placeholder={placeholder}/>
}
export const InputLabel = ({ value, onChange, label,placeholder="请输入内容", type = 'text' }) => {
    return <div className="input-area">
        <Label value={label} />
        <Input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
}
export const TextareaLabel = ({ value, onChange, label,placeholder="请输入内容" }) => {
    return <div className="textarea-area">
        <Label value={label} />
        <Textarea value={value} onChange={onChange} placeholder={placeholder}/>
    </div>
}

