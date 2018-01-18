import * as React from "react";
import { connect } from "react-redux";
class Article extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div>这是一个文章页</div>;
  }
}

function mapStateToProps(state: any, props: any) {
  return {
    aa: "111"
  };
}

export default connect()(Article);
