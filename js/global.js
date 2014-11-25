var JSON_FILE_NAME = "region.json";

function Lecture(){
  var name;  // 課程名稱
  var aliasArray;  // 課程別名 陣列
}
var lectures = new Array(); // Array 內的資料結構為 Lecture

// TODO: 不對，這邊應該用 hash 比較快

function Student(){
  var id; // 身分證字號（A****59139）
  var lectureArray(); // 參與過的課程 陣列
  var total; // 總上課堂數（3）
}
var students = new Array(); // Array 內的資料結構為 Student

/*
function RegionData(){
  var id;
  var name;  // 地區之中文名稱。（花蓮縣環保局）
  var homeName;  // 地區之戶籍地名稱。（花蓮縣）
  var shortName;  // 地區之簡稱。（花蓮）
  var available;  // 地區之役男開放名額。（2）
  var queue;  // 選了這個地區的役男號碼，這些役男要依照分數、戶籍地等條件等待分發。（3、25、44、19）
  var resultArray; // 分發完後，最終分配到這個地區的役男號碼。（3、19）
}
// 儲存 所有可供分發單位資料 的陣列，來源為 JSON。
var regionDatas = new Array(); // Array 內的資料結構為 RegionData
*/
