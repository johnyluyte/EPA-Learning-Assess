$(function() {
  init();
  loadJSON();
});


function init() {
    fileExcelAll = null;
    filefilePersonnel = null;
    lecturesMap = {};
    idMap = {};
    idLecturesMap = {};
  } // init()


function loadJSON() {
  $.getJSON(JSON_FILE_NAME, function(data) {
      var list = data.lectureLists;
      for (var i in list) {
        // using hash map
        var value = list[i].name;
        for (var k in list[i].alias) {
          // console.log(list[i].name+aliasList[k].aName);
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
    loadFromFile();
  });
}

// TODO: 要不要改用 Worker tread 避免卡住?
function loadFromFile() {
  if (fileExcelAll == null) {
    alert("您尚未指定檔案(A)：人員與上課情形（兩欄式）");
    return;
  }

  if (filePersonnel) {
    // 要取 fileExcelAll 和 filePersonnel 的 ID 的交集
    modeAstep1();
    modeAstep2();
  }

}

function strGetLectureOfficialName(lectureName){
  // console.log(lectureName);
  // apple = "病媒防治：噴藥器材簡介";
  // if(apple==lectureName){
  //   console.log("same");
  // }
  if(lectureName in lecturesMap){
    return lecturesMap[lectureName];
  }
  return OFFICIAL_LECTURE_NAME_UNKNOW;
}

// 讀取 fileExcelAll 中符合 idMap 的 key 的 id，若其課程名稱對應到已知環保課程名稱，將其 idMap value 加一
function modeAstep2() {
  var countTotal = 0;
  var countIDMatch = 0;
  var countLectureMatch = 0;

  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    var content = fileReader.result;
    var lines = content.split('\n');
    var linesLength = lines.length;
    for (var i = 0; i < linesLength; i++) {
      var token = lines[i].split(',');
      countTotal++;
      // console.log(token[0]);

      // [0] 身分證id , [1] 課程名稱
      var id = token[0].trim();
      var lecture = token[1].trim();
      if (id in idMap) {
        countIDMatch++;
        var officialName = strGetLectureOfficialName(lecture);
        if(officialName == OFFICIAL_LECTURE_NAME_UNKNOW){
          // TODO: 顯示在 warning 中
        }else if(officialName == OFFICIAL_LECTURE_NAME_OTHER){
          // 非環保課程，不列在課程總數中
        }else{
          countLectureMatch++;
          idMap[id]++;
          idLecturesMap[id] += lecture+",";
        }
      }

      // console.log(id)
    }
    // TODO: 印出總人數那些資訊
    console.log(countTotal);
    console.log(countIDMatch);
    console.log(countLectureMatch);
  }
  fileReader.readAsText(fileExcelAll);
  // TODO: 印出是 modeAstep1 做的
}

// 找出 filePersonnel 的 ID 並儲存至 idMap 的 key，其預設 value 為 0
function modeAstep1() {
  var count = 0;
  var countMap = 0;

  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    var content = fileReader.result;
    var lines = content.split('\n');
    var linesLength = lines.length;

    // Workaround for issue 1, we enforce filePersonnel contains two column data, the 1st is ID and the 2nd is empty.
    // var workaround = lines[0].split(',');
    // if(!workaround[1]){
    //   alert("請確認您的 (B) 單位人員名單（兩欄式）檔案為兩欄式，第二欄全為空白即可");
    //   return;
    // }

    for (var i = 0; i < linesLength; i++) {
      var token = lines[i].split(',');
      count++;

      var id = token[0].trim();
      // Add to Map
      if (!(id in idMap)) {
        // console.log(token[0]);
        idMap[id] = 0; // init value = 0
        countMap++;
      }

      // console.log(token[0])
    }
    // TODO: 印出總人數那些資訊
    // console.log(count);
    // console.log(countMap);
    // console.log(idMap);
  }
  fileReader.readAsText(filePersonnel);
  // TODO: 印出是 modeAstep1 做的
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
