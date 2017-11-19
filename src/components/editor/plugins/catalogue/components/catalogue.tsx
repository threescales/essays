import * as React from 'react';
import map = require("lodash/map");
import throttle = require("lodash/throttle")
import './catalogue.less';
import * as classnames from 'classnames';
const jump = require("jump.js")
export default class Catalogue extends React.Component<any, any> {
    public catalogueBlockList: Array<any>;
    public isScroll: boolean = false;
    constructor(props: any) {
        super(props)
        this.state = {
            selectedKey: ''
        }
        this.scrollToWhere = throttle(this.scrollToWhere, 300)
    }
    getDom(tagName, name, value) {
        var selectDom = [];
        var dom = document.getElementsByTagName(tagName);
        for (var i = 0; i < dom.length; i++) {
            if (value === dom[i].getAttribute(name)) {
                selectDom.push(dom[i]);
            }
        }
        return selectDom;
    }
    getDataType(sourceType) {
        if (sourceType === "header-one") {
            return 'h1'
        }
        if (sourceType === "header-two") {
            return 'h2'
        }
        if (sourceType === "header-three") {
            return 'h3'
        }
    }

    jump = (targetKey, targetType) => {
        let targetDom: any = this.getDom(targetType, 'data-offset-key', `${targetKey}-0-0`)[0]
        this.isScroll = true
        jump.default(targetDom, {
            duration: 1000,
            offset: 0,
            callback: () => {
                this.isScroll = false
                this.setState({
                    selectedKey: targetKey
                })
            },
            a11y: false
        })
    }
    isScrollToElement = (el): boolean => {
        var rect = el.getBoundingClientRect();
        console.log(new Date().getTime())
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
    scrollToWhere = () => {
        if (!this.isScroll) {
            const catalist = this.catalogueBlockList || []
            for (let i = 0; i < catalist.length; i++) {
                const cataData = catalist[i]
                if (this.isScrollToElement(this.getDom(cataData.tagName, 'data-offset-key', `${cataData.key}-0-0`)[0])) {
                    if (this.state.selctedKey !== cataData.key) {
                        this.setState({
                            selectedKey: cataData.key
                        })
                    }
                    break;
                }
            }
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.scrollToWhere, false)
    }
    componentWillUnmount() {

    }
    render() {
        const editorState = this.props.editorState || this.props.store.getItem('editorState')
        const blockMap = editorState.getCurrentContent().getBlockMap().toJSON()
        let catalogueBlockList = []
        let catalist = map(blockMap, ((block: any, index) => {
            if (block.type === 'header-one' || block.type === 'header-two' || block.type === 'header-three') {
                let catalogueBlock: any = { key: '', tagName: '' }
                let tagName = this.getDataType(block.type)
                catalogueBlock.key = block.key
                catalogueBlock.tagName = tagName
                catalogueBlockList.push(catalogueBlock);
                let isSeleted = this.state.selectedKey === block.key
                return <div key={block.key}
                    className={classnames({ [`catalogue-${block.type}`]: true, 'selected': isSeleted })}
                    onClick={() => this.jump(block.key, tagName)}
                >
                    {block.text}
                </div>
            }
            return (
                null
            )
        }))
        this.catalogueBlockList = catalogueBlockList;
        return (
            <div className="catalogue">
                {catalist}
            </div>
        )
    }
}