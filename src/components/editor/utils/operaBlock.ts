import { List, Repeat, OrderedMap } from 'immutable';
import { EditorState, ContentState, ContentBlock, SelectionState, genKey, Modifier, BlockMapBuilder, CharacterMetadata } from 'draft-js';


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

  newEditorState = selectBlock(newEditorState, key,blockAfter.getLength())
  return newEditorState
}


export function selectBlock(editorState: EditorState, blockKey: string, anchorOffset?: number, focusOffset?: number): EditorState {
  const block = editorState.getCurrentContent().getBlockForKey(blockKey)

  var targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: anchorOffset ? anchorOffset : 0,
    focusKey: blockKey,
    focusOffset: focusOffset ? focusOffset : block.getLength(),
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

/**
 * 插入一个block
 * @param editorState
 * @param blockType
 * @param blockData
 * @param entityType
 * @param entityData
 * @param blockKey
 */
export function insertBlock(
  editorState: EditorState,
  blockType: string,
  blockData: any,
  entityType: string,
  entityData = {},
  blockKey?: string): EditorState {


  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();

  var afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  );

  var targetSelection = afterRemoval.getSelectionAfter();
  var afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
  var insertionTarget = afterSplit.getSelectionAfter();

  var asMedia = Modifier.setBlockType(afterSplit, insertionTarget, blockType);

  var entityKey = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    entityData
  ).getLastCreatedEntityKey();

  var charData = CharacterMetadata.create({ entity: entityKey });
  var key = blockKey ? blockKey : genKey()
  var fragmentArray = [
    new ContentBlock({
      key,
      type: blockType,
      text: ' ',
      characterList: List(Repeat(charData, 1)),
      data: blockData
    }),
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    })
  ];

  var fragment = BlockMapBuilder.createFromArray(fragmentArray);

  var withMedia = Modifier.replaceWithFragment(
    asMedia,
    insertionTarget,
    fragment
  );

  var newContent = withMedia.merge({
    selectionBefore: selectionState,
    selectionAfter: withMedia.getSelectionAfter().set('hasFocus', true),
  }) as ContentState


  var newState = EditorState.push(editorState, newContent, 'insert-fragment');

  return newState
}


export function removeBlockFromBlockMap(editorState: EditorState, blockKey: string) {
  var contentState = editorState.getCurrentContent();
  var blockMap = contentState.getBlockMap();
  var newBlockMap = blockMap.remove(blockKey)
  var blockAfterKey = contentState.getBlockAfter(blockKey).getKey()
  var newContentState = contentState.merge({
    blockMap: newBlockMap
  }) as ContentState
  var newEditorState = EditorState.push(editorState, newContentState, 'remove-range')
  newEditorState = selectBlock(newEditorState, blockAfterKey, 0)

  return newEditorState
}