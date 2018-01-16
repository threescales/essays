import { ContentState, ContentBlock } from "draft-js";
import { types } from "../../../../constants/entityType";

// Gets all the comment in the text, and returns them via the callback
const commentStrategy = (
  contentBlock: ContentBlock,
  callback,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === types.COMMENT
    );
  }, callback);
};

export default commentStrategy;
