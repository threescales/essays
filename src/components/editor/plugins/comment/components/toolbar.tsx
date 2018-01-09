import * as React from 'react'
import CommentButton from './commentButton'
import { getVisibleSelectionRect } from 'draft-js';

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
            position: {}
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
            this.setState({
                selection, isVisible: true
            })
            this.getPosition(selection)
        }
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

    render() {
        let data = { ...this.state.position }
        data.position = 'absolute'

        return (
            <div style={data} ref={(node) => { this.toolbar = node }}>
                {
                    this.state.isVisible && <CommentButton />
                }
            </div>
        )
    }
}