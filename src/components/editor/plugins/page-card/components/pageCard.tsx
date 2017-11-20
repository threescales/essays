import * as React from 'react'

export default class PageCardComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
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
        const combinedClassName = className
        const data = contentState.getEntity(block.getEntityAt(0)).getData();
        return (
            <div role="presentation" className={combinedClassName}>
                {data.src}
            </div>
        )
    }
}