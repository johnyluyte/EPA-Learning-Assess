var fileExcelAll;
var filePersonnel;

var OUTPUT_FILENAME_SUFFIX = "-分析結果.csv"; // ex: 台中市環保局網路學習-分析結果

var JSON_FILE_NAME = "lecture.json";

// 不在我們的 JSON 資料庫內的課程名稱
var OFFICIAL_LECTURE_NAME_UNKNOW = "unknown";
// 在我們的 JSON 資料庫內的課程名稱，且我們已認定其為 非環保科目（基礎日文、舞蹈課程等）
var OFFICIAL_LECTURE_NAME_OTHER = "other";

var countTotal;
var countMatchID;
var countMatchIdAndLecture;
var countTotalPersonnel;

var unknowLectures;

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
  value: 上過的環保課程
  idLecturesMap["A****35182"] = "病媒防治：噴藥器材簡介、海洋油污染應變(基礎篇)";
  注意這裏是以全形逗號來分隔
*/
var idLecturesMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的其他課程，非環保課程
  idLecturesMap["A****35182"] = "打造職場好形象、職場必備的商務禮儀";
  注意這裏是以全形逗號來分隔
*/
var idOtherMap = {};


