import * as React from 'react'
import * as Modal from 'react-modal'
import { createArticle } from '../../actions/article'
interface ICreateNewArticleProps {
    dispatch
}

interface ICreateNewArticleState {
    title?: string
    description?: string
    cover?: string
    tag?: string
    modalIsOpen: boolean
}

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

export default class CreateNewArticle extends React.Component<ICreateNewArticleProps, ICreateNewArticleState> {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            title: '',
            description: '',
            cover: '',
            tag: ''
        };
    }
    toggleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    toggleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    toggleCover = (url) => {
        this.setState({
            cover: url
        })
    }
    toggleTag = (e) => {
        this.setState({
            tag: e.target.value
        })
    }
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }
    createArticle = () => {
        const { title, description, cover, tag } = this.state
        this.props.dispatch(createArticle(title, description, cover, tag))
    }
    render() {
        return (
            <div>
                <button onClick={this.openModal}>创建文章</button>
                <Modal isOpen={this.state.modalIsOpen} contentLabel="创建文章" style={customStyles}>
                    <input type="text" placeholder="请输入文章标题" onChange={this.toggleTitle} />
                    <textarea placeholder="请输入文章简介" onChange={this.toggleDescription}></textarea>
                    <input type="text" placeholder="请输入标签" onChange={this.toggleTag} />
                    <button onClick={this.createArticle}>创建文章</button>
                </Modal>
            </div>
        )
    }
}