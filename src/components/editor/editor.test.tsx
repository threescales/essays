import { mount } from "enzyme";
import * as React from "react";
import Editor from "./index";
import { EDITOR_TYPE } from "../../constants/editorType";
describe("Editor Component", () => {
  it("editor should have place holder", () => {
    const s = "write something";
    const editor = mount(<Editor placeholder={s} type={EDITOR_TYPE.article} />);
    expect(editor.find(".public-DraftEditorPlaceholder-inner").text()).toEqual(
      s
    );
  });
});
