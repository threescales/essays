import { Modifier, EditorState } from "draft-js";
import decorateComponentWithProps from "decorate-component-with-props";
import PageCardComponent from "./components/pageCard";
import { types } from "../../../../constants/entityType";
import { isUrl, getEntityTypeByUrl } from "../../../../utils/url";
import {
  focusSelectionAfter,
  selectBlock,
  removeBlockFromBlockMap
} from "../../utils/operaBlock";
import { getAjax } from "../../../../utils/ajax";
import * as Paths from "../../../../constants/path";

const defaultTheme = {
  image: {}
};

export default (config: any = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  const readOnly = config.readOnly;
  let PageCard = PageCardComponent;
  if (config.decorator) {
    PageCard = config.decorator(PageCard);
  }
  const ThemedPageCard = decorateComponentWithProps(PageCard, {
    theme,
    readOnly
  });

  const getPageData = (editorState, getEditorState, setEditorState, block) => {
    let newEditorState = selectBlock(editorState, block.getKey());
    let contentState = newEditorState.getCurrentContent();
    let selectionState = newEditorState.getSelection();
    getAjax(Paths.getPageInfo, { url: block.getText() })
      .then(({ data }) => {
        let editorState = getEditorState();
        let contentState = editorState.getCurrentContent();
        let newContentState = Modifier.setBlockType(
          contentState,
          selectionState,
          "atomic"
        ).createEntity(getEntityTypeByUrl(block.getText()), "MUTABLE", {
          type: getEntityTypeByUrl(block.getText()),
          title: data.title,
          description: data.description,
          src: block.getText(),
          previewImg: data.previewImg
        });
        let lastEntityKey = newContentState.getLastCreatedEntityKey();
        newContentState = Modifier.replaceText(
          newContentState,
          selectionState,
          " ",
          null,
          lastEntityKey
        );
        newEditorState = EditorState.push(
          editorState,
          newContentState,
          "change-block-type"
        );
        newEditorState = focusSelectionAfter(newEditorState, block.getKey());
        setEditorState(newEditorState);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === "atomic") {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) {
          return null;
        }
        const type = contentState.getEntity(entity).getType();
        if (type === types.PAGE) {
          return {
            component: ThemedPageCard,
            editable: false
          };
        }
        return null;
      }

      return null;
    },
    handleReturn(e, editorState, { setEditorState, getEditorState }) {
      const contentState = editorState.getCurrentContent();
      let selectionState = editorState.getSelection();
      const blockKey = selectionState.getAnchorKey();
      const block = contentState.getBlockForKey(blockKey);
      if (block && block.getType() == "unstyled" && isUrl(block.getText())) {
        getPageData(editorState, getEditorState, setEditorState, block);
      }
      return "not-handled";
    }
  };
};
