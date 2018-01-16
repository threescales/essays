import decorateComponentWithProps from "decorate-component-with-props";
import CommentButton from "./components/commentButton";
import createStore from "./utils/createStore";
import Toolbar from "./components/toolbar";
import commentStragy from "./commentStrategy";
import CommentShow from "./components/commentShow";

export default (config: any = {}) => {
  const { theme, placeholder, Link, linkTarget } = config;
  const store = createStore({
    isVisible: false
  });

  const toolbarProps = {
    store
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem("getEditorState", getEditorState);
      store.updateItem("setEditorState", setEditorState);
    },
    CommentButton: decorateComponentWithProps(CommentButton, {
      store,
      placeholder
    }),
    decorators: [
      {
        strategy: commentStragy,
        component: decorateComponentWithProps(CommentShow, {})
      }
    ],
    ReaderInlineToolbar: decorateComponentWithProps(Toolbar, toolbarProps)
  };
};
