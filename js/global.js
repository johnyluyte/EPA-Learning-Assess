// 包含 人員與上課情形 的 excel 檔案
var fileExcelAll;
// 僅有該地區機關人員的 excel 檔案
var filePersonnel;

var JSON_FILE_NAME = "lecture.json";
// 不在我們的 JSON 資料庫內的課程名稱
var OFFICIAL_LECTURE_NAME_UNKNOW = "unknown";
// 在我們的 JSON 資料庫內的課程名稱，且我們已認定其為 非環保科目（基礎日文、舞蹈課程等）
var OFFICIAL_LECTURE_NAME_OTHER = "other";

var OUTPUT_FILENAME_SUFFIX = "-分析結果.csv"; // ex: 台中市環保局網路學習-分析結果

var countTotal;
var countMatchID;
var countMatchIdAndLecture;

// 最後的資料結果中，一共有多少地區人員
var countTotalPersonnel;

// 加分條件： 每個人都上過一堂 = 加一分, 兩堂 = 加兩分, 三堂 = 加三分，最高就加三分
var plus0PointCount;
var plus1PointCount;
var plus2PointCount;
var plus3PointCount;
// 最終所有人加幾分，這個程式的最終解答
var totalPlusPoint;


// 是否要計算未知課程（會拖慢運算速度）
var isListUnknown;
// 未知的課程都會存到此字串內，不同課程之間以半形逗號相連接，其資料結構如下
// "打造職場好形象,職場必備的商務禮儀,撥蝦專業教學"
var unknowLectures;


/*
  javascript 的 hashMap 用法：

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

/*
  key: 課程別名
  value: 官方課程名稱
  lecturesMap 的來源為 lecture.json，其結構如下：

  lecturesMap["社區綠美化"] => "清淨家園（Ecolife）-社區綠美化";
  lecturesMap["噴藥器材簡介"] => "病媒防治：噴藥器材簡介";
  lecturesMap["社區推動環境改造實務"] => "清淨家園（Ecolife）-社區推動環境改造實務";

  我們會判斷 輸入的資料的子字串中 是否包含 lecturesMap 的 key，如果是，就認定該資料符合我們的課程
  例如：
  if(inputLecture.containSubstring(key)){
    //
  }
*/
var lecturesMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的環保課程總數
  idMap 的結構如下：

  idMap["A****35182"] = "0";
  idMap["N****17852"] = "1";
  idMap["E****00245"] = "3";
*/
var idMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的環保課程
  注意這裏是以 全形逗號 來分隔，資料結構如下

  idLecturesMap["A****35182"] = "";
  idLecturesMap["N****17852"] = "病媒防治：噴藥器材簡介";
  idLecturesMap["E****00245"] = "病媒防治：噴藥器材簡介、海洋油污染應變(基礎篇)、清淨家園（Ecolife）-社區綠美化";
*/
var idLecturesMap = {};

/*
  key: 地方人員身分證 ID
  value: 上過的其他課程，非環保課程
  注意這裏是以全形逗號來分隔

  idLecturesMap["A****35182"] = "";
  idLecturesMap["N****17852"] = "打造職場好形象";
  idLecturesMap["E****00245"] = "打造職場好形象、職場必備的商務禮儀";
*/
var idOtherMap = {};
