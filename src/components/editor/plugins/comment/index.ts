import decorateComponentWithProps from 'decorate-component-with-props';
import CommentButton from './components/commentButton'

export default (config: any = {}) => {
    const { theme, placeholder, Link, linkTarget } = config;
    const store = {
        getEditorState: undefined,
        setEditorState: undefined
    }

    return {
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        },
        CommentButton: decorateComponentWithProps(CommentButton,{
            store,
            placeholder
        })
    }
}