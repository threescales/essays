import * as React from 'react'
export default function makeToggleable(Clickable) {
    return class extends React.Component<any, any> {
        constructor(props) {
            super(props)
            this.state = {
                show: false
            }
        }
        show = () => {
            this.setState({
                show: true
            })
        }
        hide = () => {
            this.setState({
                show: false
            }) 
        }
        render() {
            return (
                <div 
                onMouseLeave={ this.hide }
                onMouseEnter={ this.show }
                style={{position:'relative'}}
                >
                    <Clickable
                        {...this.props}
                    />
                    {true && this.props.children}
                </div>
            )
        }
    }
}