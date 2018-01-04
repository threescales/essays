import unionClassNames from 'union-class-names';
import * as React from 'react';
import { getCompressImg } from '../../../../../utils/getInfo'
export default class Image extends React.Component {
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
            ...elementProps
        } = this.props;
        const combinedClassName = unionClassNames(theme.image, className);
        const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
        let imgUrl = getCompressImg(src)
        return (
            <img {...elementProps }
                src={imgUrl}
                role="presentation"
                className={combinedClassName}
            />
        );
    }
}