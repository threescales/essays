import decorateComponentWithProps from 'decorate-component-with-props';
import PageCardComponent from './components/pageCard';
import { types } from '../../../../constants/entityType'
const defaultTheme = {
    image: {},
};


export default (config: any = {}) => {
    const theme = config.theme ? config.theme : defaultTheme;

    let PageCard = PageCardComponent
    if (config.decorator) {
        PageCard = config.decorator(PageCard)
    }
    const ThemedPageCard = decorateComponentWithProps(PageCard, { theme });

    return {
        blockRendererFn: (block, { getEditorState }) => {
            if (block.getType() === 'atomic') {
                const contentState = getEditorState().getCurrentContent();
                const entity = block.getEntityAt(0);
                if (!entity) {
                    return null
                }
                const type = contentState.getEntity(entity).getType();
                if (type === types.PAGE) {
                    return {
                        component: ThemedPageCard,
                        editable: false,
                    };
                }
                return null;
            }

            return null;
        },
    }
}