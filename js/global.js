var fileExcelAll;
var filePersonnel;

var JSON_FILE_NAME = "lecture.json";


// TODO: 這邊應該用 hash 比較快
var lecturesMap = {};
/*
  Init Map:
    var map = {};
  Add value:
    map[key] = value;
  Remove value:
    delete map[key];
  Find element in Map
    key in map;
  要將 key 指向新的 value 之前，必須先將原本的 key 給 remove 掉。
*/


function Student(){
  var id; // 身分證字號（A****59139）
  var lectureArray; // 參與過的課程 陣列
  var total; // 總上課堂數（3）
}
var students = new Array(); // Array 內的資料結構為 Student

/*
function Lecture(){
  var name;  // 課程名稱
  var aliasArray;  // 課程別名 陣列
}
var lectures = new Array(); // Array 內的資料結構為 Lecture
*/
