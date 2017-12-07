import * as React from 'react'
import './pageCard.less'
import { getImageUrl } from '../../../../../utils/getInfo'
import { getDomain, getUrl } from '../../../../../utils/url'
export default class PageCardComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    jump = (url) => {
        const { readOnly } = this.props
        if (readOnly) {
            window.location.href = url
        }
    }
    render() {
        const {
            block,
            className,
            theme = {},
            blockProps, // eslint-disable-line no-unused-vars
            customStyleMap, // eslint-disable-line no-unused-vars
            customStyleFn, // eslint-disable-line no-unused-vars
            decorator, // eslint-disable-line no-unused-vars
            forceSelection, // eslint-disable-line no-unused-vars
            offsetKey, // eslint-disable-line no-unused-vars
            selection, // eslint-disable-line no-unused-vars
            tree, // eslint-disable-line no-unused-vars
            contentState,
          } = this.props;
        // leveraging destructuring to omit certain properties from props
        const combinedClassName = `draft-js-page-card ${className}`
        const data = contentState.getEntity(block.getEntityAt(0)).getData();
        return (
            <div role="presentation" className={combinedClassName} onClick={() => this.jump(data.src)}>
                <div className="left">
                    <strong>
                        {data.title}
                    </strong>
                    <em>
                        {data.description}
                    </em>
                    <a>{getDomain(data.src)}</a>
                </div>
                {data.previewImg && <div className="right" style={{ backgroundImage: `url(${getUrl(data.previewImg)})` }}></div>}
            </div>
        )
    }
}