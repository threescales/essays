export function checkIsNotEmail(str) {
    if (str.match(/[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g) == null) {
        return true;
    }
    return false
}

export function isEmpty(str) {
    if(!str.trim()) {
        return true;
    }
    return false
}

export function checkQuote(str) {
    var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
    items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
    items.push("admin", "administrators", "administrator", "管理员", "系统管理员");
    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    str = str.toLowerCase();
    for (var i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
            return true;
        }
    }
    return false;
}

export function isChina(s) {
    var regu = "[\u4e00-\u9fa5]+$"; 
    var re = new RegExp(regu); 
     if (re.test(s)) { 
       return true; 
     } else { 
       return false; 
     } 
 } 

 export function checkNameLength(str) {
     if(isChina(str)&&str.length>7) {
        return true
     }
     if(str.length>21) {
         return true
     }
     return false
 }

 export function checkPasswordLength(str) {
     if(str.length>20||str.length<6) {
         return true
     }
     return false
 }