import unionClassNames from 'union-class-names';
import * as React from 'react';
import { getCompressImg, getImageUrl, getGaussianImg } from '../../../../../utils/getInfo'
import ImageZoom from 'react-medium-image-zoom'
import LazyLoad from "react-lazyload"
import { getImgWidth } from "../../../utils/image"
import Battery from '../../../../progress/battery'
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
            store= {},
            blockProps, // eslint-disable-line no-unused-vars
            customStyleMap, // eslint-disable-line no-unused-vars
            customStyleFn, // eslint-disable-line no-unused-vars
            decorator, // eslint-disable-line no-unused-vars
            forceSelection, // eslint-disable-line no-unused-vars
            offsetKey, // eslint-disable-line no-unused-vars
            selection, // eslint-disable-line no-unused-vars
            tree, // eslint-disable-line no-unused-vars
            contentState,
            style,
            ...elementProps
        } = this.props;
        const combinedClassName = unionClassNames('editor-image', className);
        const { src, width, height, valid,progress } = contentState.getEntity(block.getEntityAt(0)).getData();
        let readOnly = store.getReadOnly()
        var imageStyle = style || {}
        imageStyle.position = 'relative'

        let imgWidth = getImgWidth(width)
        imageStyle.width = imgWidth
        return (
            <div className={combinedClassName} style={imageStyle} {...elementProps} role="presentation">
                    <LazyImage
                        src={src}
                        width={width}
                        height={height}
                        readOnly={readOnly}
                        progress={progress}
                        valid={valid}
                    />
            </div>
        );
    }
}

class LazyImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: getGaussianImg(this.props.src),
            blurClass: 'image-blur',
            showLazy:true
        }
    }

    loadFinish = (src) => {
        this.setState({
            image: src,
            blurClass: '',
            showLazy:false
        })
    }
    onError = () => {

        this.loadFinish(getImageUrl(this.props.src))
    }
    render() {
        let { src, width, height, className,readOnly,progress,valid } = this.props
        className = unionClassNames(className, this.state.blurClass)
        return (
                readOnly?
                    [
                        <LazyLoad height='1px' key="1">
                            {this.state.showLazy&&<LoadImg src={src} loadFinish={this.loadFinish} />}
                        </LazyLoad>,
                        <ImageZoom
                            key="0"
                            image={{
                                src: this.state.image,
                                className,
                                onError: this.onError
                            }}
                            zoomImage={{
                                src: getImageUrl(src),
                            }}
                        />]
                        :[
                            <img src={this.state.image} key="1"/>,
                            !valid && <Battery progress={progress} key="2" />
                        ]
        )
    }
}

class LoadImg extends React.Component {
    constructor(props) {
        super(props)
    }

    onLoad = () => {
        this.props.loadFinish(getCompressImg(this.props.src))
    }
    onError = () => {
        this.props.loadFinish(getImageUrl(this.props.src))
    }
    render() {
        return <img onLoad={this.onLoad} onError={this.onError} src={getCompressImg(this.props.src)} style={{ height: '1px', width: '1px', display: 'none' }} />
    }
}