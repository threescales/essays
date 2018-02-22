require("app-module-path").addPath(__dirname + "/");
const server = require("./server");

const PORT = 3000;
process.title = "Essays-backend";
//start app
if (!module.parent) {
  (async () => {
    await server.listen(PORT, function() {
      console.log(
        `=============================================================
          [${process.platform}:${process.pid}]Starting ${process.title}
    =============================================================`
      );
    });
  })();
}
