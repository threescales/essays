import * as React from 'react';
import map = require("lodash/map");
import './catalogue.less';
const jump = require("jump.js")
export default class Catalogue extends React.Component<any, any> {
    public catalogueBlockList: Array<any>;
    constructor(props: any) {
        super(props)
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
        jump.default(targetDom, {
            duration: 1000,
            offset: 0,
            callback: undefined,
            a11y: false
        })
    }
    render() {
        const editorState = this.props.editorState || this.props.store.getItem('editorState')
        const blockMap = editorState.getCurrentContent().getBlockMap().toJSON()
        let catalogueBlockList = []
        let catalist = map(blockMap, ((block: any, index) => {
            if (block.type === 'header-one' || block.type === 'header-two' || block.type === 'header-three') {
                let catalogueBlock = []
                let tagName = this.getDataType(block.type)
                catalogueBlock.push(block.key)
                catalogueBlock.push(tagName)
                catalogueBlockList.push(catalogueBlockList);
                return <div key={block.key}
                    className={`catalogue-${block.type}`}
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