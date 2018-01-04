const groupBy = require('lodash/groupBy')
export function smartArrayToTree(array, options) {
    options = Object.assign({
        id: 'id',
        pid: 'pid',
        children: 'children',
        firstPid: null
    }, options);
    //正序
    var groupArray = groupBy(array, function (n) {
        return n[options.pid];
    });

    var firstArray = groupArray[options.firstPid];
    transform(firstArray);
    function transform(startList) {
        if (startList) {
            for (var i = 0; i < startList.length; i++) {
                groupArray[startList[i][options.id]] && (startList[i][options.children] = groupArray[startList[i][options.id]]);
                transform(startList[i][options.children]);
            }
        }
    }
    return firstArray;
}
