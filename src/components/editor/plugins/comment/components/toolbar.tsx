import * as React from 'react'
import CommentButton from './commentButton'
import { getVisibleSelectionRect } from 'draft-js';
import PostComment from '../../../../comment/postComment'
import './toolbar.less'
const getRelativeParent = (element) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement);
};

export default class Toolbar extends React.Component<any, any> {
    public toolbar
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            selection: null,
            position: {},
            blockKey: '',
            blockText: '',
            showPostComment: false
        }
        this.updateSelection = this.updateSelection.bind(this)
        this.getPosition = this.getPosition.bind(this)
    }

    componentDidMount() {
        this.initSelectListener()
    }
    componentWillUnmount() {
        this.clearSelectListener()
    }


    initSelectListener() {
        // 监听双击事件
        document.addEventListener("dblclick", this.updateSelection, true);

        // 监听释放鼠标按钮事件
        document.addEventListener("mouseup", this.updateSelection, true);
    }

    clearSelectListener() {
        // 监听双击事件
        document.removeEventListener("dblclick", this.updateSelection, true);

        // 监听释放鼠标按钮事件
        document.removeEventListener("mouseup", this.updateSelection, true);
    }


    updateSelection = () => {
        if (window.getSelection) {
            let selection = window.getSelection()
            let blockKey = this.getBlockKey(selection)
            let blockText = selection.toString()
            let offset = selection.anchorOffset
            this.setState({
                selection, isVisible: true, blockKey, blockText, offset
            })
            this.getPosition(selection)
        }
    }

    getBlockKey(selection) {
        let dataOffsetKey = selection.anchorNode.parentElement.parentElement.getAttribute('data-offset-key')
        let blockKey = dataOffsetKey.split('-')[0]
        return blockKey
    }

    getPosition(selection) {
        const relativeParent = getRelativeParent(this.toolbar.parentElement)
        const toolbarHeight = this.toolbar.clientHeight;
        const relativeRect = (relativeParent || document.body).getBoundingClientRect();
        const selectionRect = getVisibleSelectionRect(window);

        if (!selectionRect) { return; }

        const position = {
            top: (selectionRect.top - relativeRect.top) - toolbarHeight,
            left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
        };
        this.setState({ position });
    }

    showPostComment = () => {
        this.setState({
            showPostComment: true
        })
        this.clearSelectListener()
    }

    hidePostComment = () => {
        this.initSelectListener()
        this.setState({
            showPostComment: false,
            isVisible: false
        })
    }

    render() {
        let { blockText, blockKey, position, offset } = this.state

        let data = { ...position }
        data.position = 'absolute'
        data.zIndex = 10

        let commentStyle: any = {}
        commentStyle.top = position.top
        commentStyle.right = position.right
        return (
            [
                <div style={data} ref={(node) => { this.toolbar = node }}>
                    {
                        this.state.isVisible && !this.state.showPostComment &&
                        <CommentButton
                            showPostComment={this.showPostComment}
                        />
                    }
                </div>,
                this.state.showPostComment ?
                    <div className="block-post-comment" style={commentStyle}>
                        <PostComment articleId={this.props.articleId} blockText={blockText} blockKey={blockKey} depth={0} closeComment={this.hidePostComment} offset={offset} />
                    </div> : null
            ]
        )
    }
}