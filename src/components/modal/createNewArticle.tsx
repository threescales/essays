import * as React from 'react'
import Modal from './components/modal'
import { createArticle } from '../../actions/article'
import { getUrl } from '../../utils/url'
import Background from '../controlled/background'
import { InputLabel, TextareaLabel } from '../controlled/input'
import { Button } from '../buttons/button'
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
    toggleCover = (key) => {
        this.setState({
            cover: getUrl(key)
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
                <Modal isOpen={this.state.modalIsOpen} contentLabel="创建文章">
                    <InputLabel value={this.state.title} onChange={this.toggleTitle} placeholder="请输入文章标题" label="标题：" />
                    <TextareaLabel placeholder="请输入文章简介" onChange={this.toggleDescription} value={this.state.description} label="简介：" />
                    <InputLabel value={this.state.tag} onChange={this.toggleTag} placeholder="请输入文章标签" label="标签：" />
                    <div style={{ width: '400px', height: '200px' }}>
                        <Background isEditable={true} uploadFinishCallback={this.toggleCover} imageUrl={this.state.cover} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={this.createArticle} isActive={true}>创建文章</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}