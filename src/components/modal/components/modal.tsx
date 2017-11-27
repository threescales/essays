import * as Modal from 'react-modal'
import * as React from 'react'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class CustomModal extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} contentLabel={this.props.contentLabel} style={customStyles}>
                {this.props.children}
            </Modal>
        )
    }
}