import * as React from 'react'
import decorateComponentWithProps from 'decorate-component-with-props';
import Catalogue from './components/catalogue'
import createStore from '../../utils/createStore'
export default (config = {}) => {
    const store = createStore({

    })
    const { } = config;
    const catalogueProps = {
        store
    }

    return {
        initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
            store.updateItem('getEditorRef', getEditorRef);
        },
        onChange: (editorState) => {
            store.updateItem('editorState', editorState);
            return editorState;
        },
        Catalogue: decorateComponentWithProps(Catalogue, catalogueProps)
    }
}