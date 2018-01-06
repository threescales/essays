import unionClassNames from 'union-class-names';
import * as React from 'react';
import { getCompressImg, getImageUrl, getGaussianImg } from '../../../../../utils/getInfo'
import ImageZoom from 'react-medium-image-zoom'
import store from "../../../../../store/configure-store";
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
        const { src, width, height, valid } = contentState.getEntity(block.getEntityAt(0)).getData();
        let imgUrl = getCompressImg(src)
        let readOnly = !store.getState().show.toJS().editor
        var imageStyle = style || {}
        imageStyle.position = 'relative'

        let imgWidth = getImgWidth(width)
        imageStyle.width = imgWidth
        return (
            <div className={combinedClassName} style={imageStyle} {...elementProps} role="presentation">
                {readOnly ?
                    <LazyImage
                        src={src}
                        width={width}
                        height={height}
                    />
                    :
                    [
                        <img src={imgUrl} key="1"/>,
                        !valid && <Battery progress="1" key="2" />
                    ]
                }
            </div>
        );
    }
}

class LazyImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: getGaussianImg(this.props.src),
            blurClass: 'image-blur'
        }
    }

    loadFinish = (src) => {
        this.setState({
            image: src,
            blurClass: ''
        })
    }

    render() {
        let { src, width, height, className, ...elementProps } = this.props
        className = unionClassNames(className, this.state.blurClass)
        return (
            [
                <LazyLoad height='1px' key="1">
                    <LoadImg src={src} loadFinish={this.loadFinish}/>
                </LazyLoad>,
                <ImageZoom
                    key="0"
                    image={{
                        src: this.state.image,
                        ...elementProps,
                        className
                    }}
                    zoomImage={{
                        src: getImageUrl(src),
                    }}
                />]
        )
    }
}

class LoadImg extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let that = this
        this.element.onload = () => {
            that.props.loadFinish(getCompressImg(that.props.src))
        }
        this.element.onerror = () => {
            that.props.loadFinish(getImageUrl(that.props.src))
        }
    }
    render() {
        return <img ref={(e) => this.element = e} src={getCompressImg(this.props.src)} style={{ height: '1px', width: '1px', display: 'none' }} />
    }
}