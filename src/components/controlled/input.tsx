import * as React from 'react'
import './input.less'
import debounce = require("lodash/debounce")
export const Label = ({ value }) => {
    return value ? <label className="label">{value}</label> : null
}
export const Input = ({ value, onChange, placeholder = '请输入内容', type = 'text' }) => {
    return <input className="input" type={type} value={value} onChange={onChange} placeholder={placeholder} />
}

export const Textarea = ({ value, onChange, placeholder = "请输入内容" }) => {
    return <textarea className="textarea" onChange={onChange} value={value} placeholder={placeholder} />
}
export const InputLabel = ({ value, onChange, label, placeholder = "请输入内容", type = 'text' }) => {
    return <div className="input-area">
        <Label value={label} />
        <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
}
export const TextareaLabel = ({ value, onChange, label, placeholder = "请输入内容" }) => {
    return <div className="textarea-area">
        <Label value={label} />
        <Textarea value={value} onChange={onChange} placeholder={placeholder} />
    </div>
}
interface IValidateInputProps {
    value
    onChange
    placeholder?
    type?
    validations
}
export class ValidateInput extends React.PureComponent<IValidateInputProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            pass: true
        }
        this.validate = debounce(this.validate.bind(this), 800)
    }
    onChange=(e)=> {
        this.props.onChange(e)
        this.validate(e.target.value)

    }
    validate (value) {
        let validations = this.props.validations
        let pass = true
        let message = ''
        for (let validation of validations) {
            if (validation.verify(value)) {
                pass = false
                message = validation.message
                break;
            }
        }
        this.setState({
            pass: pass,
            message: message
        })
    }
    render() {
        let { value, onChange, placeholder, type } = this.props
        return (
            <div className="validate-frame">
                <Input value={value} onChange={this.onChange} placeholder={placeholder} type={type} />
                {!this.state.pass && <label className="validate-message">{this.state.message}</label>}
            </div>
        )
    }
}
