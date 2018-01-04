import createPlugin from 'draft-js-image-plugin'
import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, ContentBlock } from 'draft-js'
import './style.less'
import ImageComponent from './components/image';

export const createImagePlugin = (config?: PluginConfig): ImagePluginObject => {
  const originProps = createPlugin(config)
  const { blockRendererFn } = originProps


  const theme = config.theme ? config.theme : {};
  const readOnly = config.readOnly || false
  let Image = config.imageComponent || ImageComponent;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  const ThemedImage = decorateComponentWithProps(Image, { theme });

  return {
    ...originProps,

    blockRendererFn: (block, { getEditorState, getReadOnly }) => {
      let readOnly = getReadOnly()
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) { return null; }
        const type = contentState.getEntity(entity).getType();
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: false,
          };
        }
        return null;
      }

      return null;
    },

    blockStyleFn(block: ContentBlock, { getEditorState }) {
      const entityKey = block.getEntityAt(0);
      const contentState = getEditorState().getCurrentContent();
      const alignmentData = entityKey ? contentState.getEntity(entityKey).data : {};

      if (alignmentData.src) {
        switch (alignmentData.alignment) {
          case 'left':
            return 'img-align-left'

          case 'right':
            return 'img-align-right'

          case 'center':
            return 'img-align-center'

          case 'default':
            return 'img-no-margin'
        }
      }
    }
  }
}

interface PluginConfig {
  imageComponent?: React.ComponentClass<any>
  theme?: {
    image?: string
  }
  decorator: any
  readOnly?
}

interface ImagePluginObject {
  addImage: AddImageBlock
}

export type AddImageBlock = (editorState: EditorState, url: string, extraData: any) => EditorState