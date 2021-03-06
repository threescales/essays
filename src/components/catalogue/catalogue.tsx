import * as React from "react";
import map = require("lodash/map");
import throttle = require("lodash/throttle");
import "./catalogue.less";
import * as classnames from "classnames";
import { show, hide } from "../../actions/show";
import { CATALOGUE } from "../../constants/showKey";
const jump = require("jump.js");
interface ICatalogueProps {
  editorState;
  show;
  dispatch;
  readOnly;
}

const OFFSET = 50;

export default class Catalogue extends React.Component<ICatalogueProps, any> {
  public catalogueBlockList: Array<any>;
  public isScroll: boolean = false;
  public documentHeight = document.documentElement.clientHeight;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKey: ""
    };
    this.scrollToWhere = throttle(this.scrollToWhere, 500);
  }
  getDom(tagName, name, value) {
    var selectDom = null;
    var doms = document.getElementsByTagName(tagName);
    let domsLenght = doms.length;
    for (var i = 0; i < domsLenght; i++) {
      if (value === doms[i].getAttribute(name)) {
        selectDom = doms[i];
        break;
      }
    }
    return selectDom;
  }
  getDataType(sourceType) {
    if (sourceType === "header-one") {
      return "h1";
    }
    if (sourceType === "header-two") {
      return "h2";
    }
    if (sourceType === "header-three") {
      return "h3";
    }
  }

  jump = (targetKey, targetType) => {
    let targetDom: any = this.getDom(
      targetType,
      "data-offset-key",
      `${targetKey}-0-0`
    );
    this.isScroll = true;
    jump.default(targetDom, {
      duration: 1000,
      offset: 0,
      callback: () => {
        this.isScroll = false;
        this.setState({
          selectedKey: targetKey
        });
      },
      a11y: false
    });
  };
  isScrollToElement = (el): boolean => {
    return el
      ? el.offsetTop + el.clientHeight < window.scrollY - this.documentHeight
      : false;
  };
  setSelectedKey = (selectedKey: string) => {
    if (this.state.selectedKey !== selectedKey) {
      this.setState({
        selectedKey
      });
    }
  };
  scrollToWhere = () => {
    if (!this.isScroll) {
      const catalist = this.catalogueBlockList || [];
      let newSelectedKey = this.state.selectedKey;
      let length = catalist.length;
      for (let i = 0; i < length; i++) {
        const cataData = catalist[i];
        if (this.isScrollToElement(cataData.dom)) {
          newSelectedKey = cataData.key;
          if (i == length - 1) {
            this.setSelectedKey(newSelectedKey);
            break;
          }
        } else {
          this.setSelectedKey(newSelectedKey);
          break;
        }
      }
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.scrollToWhere, false);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollToWhere);
  }
  toggleShow = () => {
    if (this.props.show) {
      this.props.dispatch(hide(CATALOGUE));
    } else {
      this.props.dispatch(show(CATALOGUE));
    }
  };
  render() {
    const editorState = this.props.editorState;
    const blockMap = editorState
      .getCurrentContent()
      .getBlockMap()
      .toJSON();
    let catalogueBlockList = [];
    let catalist = map(blockMap, (block: any, index) => {
      if (
        (block.type === "header-one" ||
          block.type === "header-two" ||
          block.type === "header-three") &&
        block.text
      ) {
        let catalogueBlock: any = { key: "", tagName: "", dom: null };
        let tagName = this.getDataType(block.type);
        if (this.props.readOnly) {
          catalogueBlock.key = block.key;
          catalogueBlock.tagName = tagName;
          catalogueBlock.dom = this.getDom(
            catalogueBlock.tagName,
            "data-offset-key",
            `${catalogueBlock.key}-0-0`
          );
          catalogueBlockList.push(catalogueBlock);
        }

        let isSeleted =
          this.state.selectedKey === block.key && this.props.readOnly;
        return (
          <li
            key={block.key}
            className={classnames({
              "catalogue-item": true,
              [`catalogue-${block.type}`]: true,
              selected: isSeleted
            })}
            onClick={() => this.jump(block.key, tagName)}
          >
            {block.text}
          </li>
        );
      }
      return null;
    });
    this.catalogueBlockList = catalogueBlockList;
    return (
      <div
        className={classnames({
          catalogue: true,
          "catalogue--moveLeft": this.props.show
        })}
      >
        <a className="catalogue--toggle" onClick={this.toggleShow}>
          <i className="iconfont icon-zhankai" />
        </a>
        <ul className="catalogue-list">{catalist}</ul>
      </div>
    );
  }
}
