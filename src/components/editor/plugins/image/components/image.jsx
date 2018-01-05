import unionClassNames from 'union-class-names';
import * as React from 'react';
import { getCompressImg,getImageUrl } from '../../../../../utils/getInfo'
import ImageZoom from 'react-medium-image-zoom'
import store from "../../../../../store/configure-store";

export default class Image extends React.Component {
    constructor(props) {
        super(props)
        this.shouldHandle = this.shouldHandle.bind(this)
    }
    shouldHandle = (e) => {
        this.props.onClick(e)
        return true
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
            ...elementProps
        } = this.props;
        const combinedClassName = unionClassNames(theme.image, className);
        const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
        let imgUrl = getCompressImg(src)
        let readOnly = !store.getState().show.toJS().editor
        return (
            readOnly ?
                <ImageZoom
                    image={{
                        src: imgUrl,
                        ...elementProps,
                        role: "presentation",
                        className: combinedClassName,

                    }}
                    zoomImage={{
                        src: getImageUrl(src),
                    }}
                /> :
                <img {...elementProps } src={imgUrl} role="presentation" className={combinedClassName} />
        );
    }
}