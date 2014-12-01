$(function() {
  init();
  clean();
  loadJSON();
});

function clean(){
  fileExcelAll = null;
  filefilePersonnel = null;
}

function init() {
    // lecturesMap = {};  // 這個是 json 的資訊，不該清空？
    idMap = {};
    idLecturesMap = {};
    countTotal = 0;
    countMatchID = 0;
    countMatchIdAndLecture = 0;
    countTotalPersonnel = 0;
    unknowLectures = "";
    idOtherMap = {};

    plus0PointCount = 0;
    plus1PointCount = 0;
    plus2PointCount = 0;
    plus3PointCount = 0;
    totalPlusPoint = 0;
  } // init()


function loadJSON() {
  $.getJSON(JSON_FILE_NAME, function(data) {
      var list = data.lectureLists;
      for (var i in list) {
        // using hash map
        var value = list[i].name;
        for (var k in list[i].alias) {
          var key = list[i].alias[k].aName;
          // add to map
          lecturesMap[key] = value;
        }
      }
      afterLoadJSON();
    })
    .error(function() {
      alert("Error loading JSON_FILE_NAME:" + JSON_FILE_NAME);
    });
}

function afterLoadJSON() {
  // printMap();
  bindButton();
}


function bindButton() {
  $('#input_fileExcelAll').change(function(e) {
    fileExcelAll = e.target.files[0];
  });

  $('#input_filePersonnel').change(function(e) {
    filePersonnel = e.target.files[0];
  });

  $('#btn_start').bind('click', function() {
    init();
    loadFromFile();
  });
}

// TODO: 要不要改用 Worker tread 避免卡住?
function loadFromFile() {
  if (fileExcelAll === null) {
    alert("您尚未指定檔案(A)：人員與上課情形（兩欄式）");
    return;
  }

  if (filePersonnel) {
    // 要取 fileExcelAll 和 filePersonnel 的 ID 的交集
    modeBstep1();
  } else {
    modeAstep1();
  }

}



function strGetLectureOfficialName(lectureName) {
  // 完全比對
  // if (lectureName in lecturesMap) {
  //   return lecturesMap[lectureName];
  // }

  // 比對 substring，只要 lectureName 字串中包含 lecturesMap 的 key，就回傳 lecturesMap[key]
  // lectureName = 我們遇到的資料，要判斷是否為環保課程
  // key = 我們資料庫中的 alias 名稱、非官方名稱，但是我們認可的環保課程
  // lecturesMap[lectureName]
  for (var key in lecturesMap) {
    // 找看看 lectureName 是否包含 key
    //alert("foo".indexOf("oo") > -1);
    if (lectureName.indexOf(key) > -1) {
      // console.log(key + ":" + lectureName.indexOf(key) + " = " + lecturesMap[lectureName]);
      return lecturesMap[key];
    }
  }
  return OFFICIAL_LECTURE_NAME_UNKNOW;
}

// 先讀取 fileExcelAll 中的 id，將其加入 idMap 的 key
// 再看若其課程名稱對應到已知環保課程名稱，將其 idMap value 加一
function modeAstep1() {
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    var content = fileReader.result;
    var lines = content.split('\n');
    var linesLength = lines.length;
    for (var i = 0; i < linesLength; i++) {
      var token = lines[i].split(',');
      countTotal++;

      // [0] 身分證id , [1] 課程名稱
      var id = token[0].trim();
      if(id===""){
        continue;
      }
      var lecture = token[1].trim();
      if (!(id in idMap)) {
        idMap[id] = 0;
        idLecturesMap[id] = "";
        idOtherMap[id] = "";
      }
      countMatchID++;
      var officialName = strGetLectureOfficialName(lecture);
      if (officialName == OFFICIAL_LECTURE_NAME_UNKNOW) {
        // TODO: 顯示在 warning 中
        addToUnknownLectures(lecture);
        addToIdOtherMap(id, lecture);
      } else if (officialName == OFFICIAL_LECTURE_NAME_OTHER) {
        // TODO: 非環保課程，不列在課程總數中
        addToIdOtherMap(id, lecture);
      } else {
        countMatchIdAndLecture++;
        idMap[id] ++;
        addToIdLectureMap(id, lecture);
      }
    }
    printResultTable("modeA");
  };
  fileReader.readAsText(fileExcelAll);
  // TODO: 印出是 modeAstep1 做的
}


// 讀取 fileExcelAll 中符合 idMap 的 key 的 id，若其課程名稱對應到已知環保課程名稱，將其 idMap value 加一
function modeBstep2() {
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    var content = fileReader.result;
    var lines = content.split('\n');
    var linesLength = lines.length;
    for (var i = 0; i < linesLength; i++) {
      var token = lines[i].split(',');
      countTotal++;

      // [0] 身分證id , [1] 課程名稱
      var id = token[0].trim();
      if(id===""){
        continue;
      }
      var lecture = token[1].trim();
      if (id in idMap) {
        countMatchID++;
        var officialName = strGetLectureOfficialName(lecture);
        if (officialName == OFFICIAL_LECTURE_NAME_UNKNOW) {
          // TODO: 顯示在 warning 中
          addToUnknownLectures(lecture);
          addToIdOtherMap(id, lecture);
        } else if (officialName == OFFICIAL_LECTURE_NAME_OTHER) {
          // TODO: 非環保課程，不列在課程總數中
          addToIdOtherMap(id, lecture);
        } else {
          countMatchIdAndLecture++;
          idMap[id] ++;
          addToIdLectureMap(id, lecture);
        }
      }
    }
    printResultTable("modeB");
  };
  fileReader.readAsText(fileExcelAll);
  // TODO: 印出是 modeAstep1 做的
}

// 找出 filePersonnel 的 ID 並儲存至 idMap 的 key，其預設 value 為 0
function modeBstep1() {
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    var content = fileReader.result;
    var lines = content.split('\n');
    var linesLength = lines.length;
    for (var i = 0; i < linesLength; i++) {
      var token = lines[i].split(',');
      var id = token[0].trim();
      // Add to Map
      if (!(id in idMap)) {
        idMap[id] = 0; // init value = 0
        idLecturesMap[id] = "";
        idOtherMap[id] = "";
      }
    }
    modeBstep2();
  };
  fileReader.readAsText(filePersonnel);
}



function addToUnknownLectures(lecture) {
  if (unknowLectures === "") {
    unknowLectures = lecture;
  } else {
    unknowLectures += "," + lecture;
  }
}

function addToIdOtherMap(id, lecture) {
  if (idOtherMap[id] === "") {
    idOtherMap[id] = lecture;
  } else {
    idOtherMap[id] += "、" + lecture;
  }
}

function addToIdLectureMap(id, lecture) {
  if (idLecturesMap[id] === "") {
    idLecturesMap[id] = lecture;
  } else {
    idLecturesMap[id] += "、" + lecture;
  }
}

function printMap() {
  for (var key in lecturesMap) {
    console.log(key + " : " + lecturesMap[key]); // print key:value
  }
}



// javascript
// 先處理完
// (A) 人員與上課情形（兩欄式）
// 與
// (B) 單位人員名單（單欄式）
// 的交集
// 再交由 php 去做 json 比對

// [24-Nov-2014 22:20:17 America/Denver] PHP Warning:  Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini. in Unknown on line 0
// PHP 把 json 丟給 javascript，在 javascript 比對？


/*
  // Variable to hold request
  var request;
  var msg = "getJsonFromPHP";


  $('#btn_start').bind('click', function(event) {
    // Abort any pending request
    if (request) {
      request.abort();
    }

    // Fire off the request to /form.php
    request = $.ajax({
      url: "checkCSV.php",
      type: "post",
      data: msg
    });

    // Callback handler that will be called on success
    request.done(function(response, textStatus, jqXHR) {
      // Log a message to the console
      console.log("Hooray, it worked!");
      alert(response);
    });

    // Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
      // Log the error to the console
      console.error(
        "The following error occurred: " +
        textStatus, errorThrown
      );
    });

    // Callback handler that will be called regardless if the request failed or succeeded
    request.always(function() {});

    // Prevent default posting of form
    event.preventDefault();
  });
*/
