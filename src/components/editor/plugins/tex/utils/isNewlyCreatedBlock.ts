import {EditorState} from "draft-js";
export function isNewlyCreated(state: EditorState, entityKey: string): boolean {
  return state.getCurrentContent().getLastCreatedEntityKey() === entityKey
}
