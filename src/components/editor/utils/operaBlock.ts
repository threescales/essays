import { List, Repeat, OrderedMap } from 'immutable';
import { EditorState, ContentState, ContentBlock,SelectionState, genKey } from 'draft-js';


export function createNewBlock(key?): ContentBlock {
    return new ContentBlock({
        key: key || genKey(),
        type: 'unstyled',
        text: '',
        depth: 0,
        characterList: List()
    })
}


/**
 * 在目标block后新插入一个block
 * @param editorState
 * @param targetBlockKey
 * @param newBlockKey
 */
export function insertNewLineAfter(editorState: EditorState, targetBlockKey: string, newBlockKey?: string): EditorState {
    var contentState = editorState.getCurrentContent()
    var blockMap = contentState.getBlockMap()
    const currentBlock = contentState.getBlockForKey(targetBlockKey)
    const { blocksBefore, blocksAfter } = getBlockAfterAndBefore(blockMap, currentBlock)
    const newBlock = createNewBlock(newBlockKey)

    const newBlockMap = blocksBefore.concat(
        [
            [targetBlockKey, currentBlock],
            [newBlock.getKey(), newBlock]
        ] as any,
        blocksAfter
    ).toOrderedMap().filter(v => v !== undefined)

    const newContentState = contentState.merge({
        blockMap: newBlockMap
    }) as ContentState

    return EditorState.push(editorState, newContentState, 'insert-fragment')
}

/**
 * 聚焦到当前block的下一个block
 * @param editorState
 * @param blockKey
 */
export const focusSelectionAfter = (editorState: EditorState, blockKey: string): EditorState => {
    const contentState = editorState.getCurrentContent()
    const blockAfter = contentState.getBlockAfter(blockKey)
    let key = blockAfter && blockAfter.getKey()
    var newEditorState = editorState
  
    if (!key) {
      key = genKey()
      newEditorState = insertNewLineAfter(editorState, blockKey, key)
    }
  
    newEditorState = selectBlock(newEditorState, key)
    return newEditorState
  }
  

export function selectBlock(editorState: EditorState, blockKey: string, offset?: number): EditorState {
    const block = editorState.getCurrentContent().getBlockForKey(blockKey)
  
    var targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: offset ? offset : block.getLength(),
      focusKey: blockKey,
      focusOffset: offset ? offset : block.getLength(),
      isBackward: false
    });
  
    return EditorState.forceSelection(editorState, targetRange)
  }
  

export function getBlockAfterAndBefore(blockMap: OrderedMap<string, ContentBlock>, block: ContentBlock) {
    const blocksBefore = blockMap.toSeq().takeUntil((v) => {
        return v === block
    })
    const blocksAfter = blockMap.toSeq().skipUntil((v) => {
        return v === block
    }).rest()
    return {
        blocksAfter,
        blocksBefore
    }
}
