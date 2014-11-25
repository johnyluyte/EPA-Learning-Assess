var fileExcelAll;
var filePersonnel;

var JSON_FILE_NAME = "lecture.json";

// 不在我們的 JSON 資料庫內的課程名稱
var OFFICIAL_LECTURE_NAME_UNKNOW = "unknown";
// 在我們的 JSON 資料庫內的課程名稱，且我們已認定其為 非環保科目（基礎日文、舞蹈課程等）
var OFFICIAL_LECTURE_NAME_OTHER = "other";

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

// TODO: 這邊應該用 hash 比較快

/*
  key: 課程別名
  value: 官方課程名稱
  lecturesMap["病媒防治：噴藥器材簡介 - 北市環保局課號N12"] = "病媒防治：噴藥器材簡介";
*/
var lecturesMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的環保課程總數
  idMap["A****35182"] = "3";
*/
var idMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的環保課程總數
  idLecturesMap["A****35182"] = "病媒防治：噴藥器材簡介,海洋油污染應變(基礎篇)";
*/
var idLecturesMap = {};


/*
function Student(){
  var id; // 身分證字號（A****59139）
  var lectureArray; // 參與過的課程 陣列
  var total; // 總上課堂數（3）
}
var students = new Array(); // Array 內的資料結構為 Student
*/

/*
function Lecture(){
  var name;  // 課程名稱
  var aliasArray;  // 課程別名 陣列
}
var lectures = new Array(); // Array 內的資料結構為 Lecture
*/
