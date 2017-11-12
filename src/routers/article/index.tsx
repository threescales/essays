declare var require;
import Article from "./article.page";
export default
  {
    path: "/articles/:articleId",
    getComponent(nextState: any, cb: any) {
      require.ensure([], (require) => {
        cb(null, {
          children: require("./article.page").dafult,
        });
      });
    }
  };