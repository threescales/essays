import * as React from 'react'

export const ModalFrame = (ModalComponent):any =>
    class Frame extends React.Component<any,any> {
        constructor(props) {
            super(props)
            this.state = {
                modalIsOpen:false
            }
        }
        openModal = () => {
            this.setState({ modalIsOpen: true });
        }
        closeModal = () => {
            this.setState({ modalIsOpen: false });
        }
        render() {
            return(
                <ModalComponent {...this.props} modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} openModal={this.openModal}/>
            )
        }
    }

    export interface IModalFrameProps {
        openModal?
        closeModal?
        modalIsOpen?
    }