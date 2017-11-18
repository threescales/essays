import * as React from 'react';
import map = require("lodash/map")
export default class Catalogue extends React.Component<any, any> {

    render() {
        const editorState = this.props.editorState || this.props.store.getItem('editorState')
        const blockMap = editorState.getCurrentContent().getBlockMap().toJSON()
        let catalist = map(blockMap, ((block: any, index) => {
            if (block.type === 'header-one' || block.type === 'header-two') {
                return <div key={block.key} className={`catalogue-${block.type}`}>{block.text}</div>
            }
            return (
                null
            )
        }))
        return (
            <div>
                {catalist}
            </div>
        )
    }
}