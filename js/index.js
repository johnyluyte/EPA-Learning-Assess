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
    countTotal = 0;
    countMatchID = 0;
    countMatchIdAndLecture = 0;
    countTotalPersonnel = 0;
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
  }

}


/*
  input: P****42565
  output: P42565
*/
function getShortID(id) {
  var shortID = id.substring(0, 1) + id.substring(5, 10);
  return shortID;
}

function printResultTable() {
  var str = "";
  str += '<table class="table table-bordered">';
  str += '<tr>';
  str += '  <th>ID</th>';
  str += '  <th>課程堂數</th>';
  str += '  <th>ID</th>';
  str += '  <th>課程堂數</th>';
  str += '  <th>ID</th>';
  str += '  <th>課程堂數</th>';
  // str += '</tr>';

  var count = 0;
  for (var id in idMap) {
    count++;
    if (count % 3 == 1) {
      str += '</tr><tr>';
    }
    if (idMap[id] == 0) {
      str += '<td class="danger getInfo" id="td' + getShortID(id) + '">';
    } else {
      str += '<td class="getInfo" id="td' + getShortID(id) + '">';
    }
    // Because the character '*' means something to the jQuery selector
    // We cannot have it in the 'id' field.
    // Thus a id with value "tdP****42565" should be changed to just "tdP42565"
    str += id + '</td>';
    str += '<td>' + idMap[id] + '</td>';
  }
  str += '</tr>';
  str += '</table>';


  str += '<table class="table table-hover table-bordered table-striped">';
  str += '  <tr>';
  str += '    <th>資料總筆數</th>';
  str += '    <th>符合ＩＤ的筆數</th>';
  str += '    <th>符合ＩＤ及環保課程</th>';
  str += '    <th>職員人數</th>';
  str += '    <th>加分</th>';
  str += '  </tr>';

  str += '  <tr>';
  str += '    <td>' + countTotal + '</td>';
  str += '    <td>' + countMatchID + '</td>';
  str += '    <td>' + countMatchIdAndLecture + '</td>';
  str += '    <td>' + countTotalPersonnel + '</td>';
  str += '    <td class="success"><strong>1</strong>';
  str += '    </td>';
  str += '  </tr>';

  str += '</table>';
  str += '註：採用之人數＝總人數—不符合名單的人數';
  str += '<br/>';

  $("#div_result_table").html(str);


  // Bind <span id=""> to function after the HTML is loaded in the $Document
  for (var id in idMap) {

    // TODO: what is the difference between these codes? Why only the last one works?
    // $('#td' + getShortID(id)).bind('click', (function(argId) {
    // $(document).on('click', '#td' + getShortID(id), (function(argId) {
    // $(document).bind('click', '#td' + getShortID(id), (function(argId) {
    document.getElementById('td' + getShortID(id)).addEventListener('click', (function(argId) {
      return function(){
        onClickTableID(argId);
      }
    })(id), false);
  }
}

function onClickTableID(id) {
  console.log("onclick id = " + id);
  // console.log("idLecturesMap[id] = " + idLecturesMap[id]);
  var str = "";
  str += '<table class="table table-hover table-bordered table-striped">';
  str += '  <tr>';
  str += '    <th class="warning">' + id + '</th>';
  str += '  </tr>';

  var strLectures = idLecturesMap[id].split(',');

  var count;
  if(strLectures[0].trim()==""){
    count = 0; // there is no lecture here, we init count at 0;
  }else{
    count = strLectures.length; // there is at least 1 lecture here, we init count at its length;
  }
  for (var i = 0; i < count; i++) {
    str += '<tr><td>';
    str += strLectures[i].trim();
    str += '</td></tr>';
    console.log("strLectures = " + strLectures[i].trim());
  }

  str += '  <tr>';
  str += '    <td class="warning"><strong>共上 ' + count + ' 堂課程</strong></td>';
  str += '  </tr>';
  str += '</table>';
  $('#div_id_lecture_info').html(str);
}


function strGetLectureOfficialName(lectureName) {
  // 完全比對
  // if (lectureName in lecturesMap) {
  //   return lecturesMap[lectureName];
  // }

  // 比對 substring，只要 lectureName 字串中包含 lecturesMap 的 key，就回傳 lecturesMap[lectureName]
  for(var key in lecturesMap){
    // console.log(lectureName.indexOf(key));
    if(lectureName.indexOf(key) > -1){
      return lecturesMap[lectureName];
    }
  }


  return OFFICIAL_LECTURE_NAME_UNKNOW;
}

// 讀取 fileExcelAll 中符合 idMap 的 key 的 id，若其課程名稱對應到已知環保課程名稱，將其 idMap value 加一
function modeAstep2() {
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
        countMatchID++;
        var officialName = strGetLectureOfficialName(lecture);
        if (officialName == OFFICIAL_LECTURE_NAME_UNKNOW) {
          // TODO: 顯示在 warning 中
        } else if (officialName == OFFICIAL_LECTURE_NAME_OTHER) {
          // 非環保課程，不列在課程總數中
        } else {
          countMatchIdAndLecture++;
          idMap[id] ++;
          if (idLecturesMap[id] == "") {
            idLecturesMap[id] = lecture;
          } else {
            idLecturesMap[id] += "," + lecture;
          }
          // onClickTableID(id);

        }
      }
      // console.log(id)
    }
    countTotalPersonnel = Object.keys(idMap).length;
    printResultTable();


    // TODO: 印出總人數那些資訊
    // console.log( countTotal);
    // console.log( countMatchID);
    // console.log( countMatchIdAndLecture);
  }
  fileReader.readAsText(fileExcelAll);
  // TODO: 印出是 modeAstep1 做的
}

// 找出 filePersonnel 的 ID 並儲存至 idMap 的 key，其預設 value 為 0
function modeAstep1() {
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
      }
    }
    modeAstep2();
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
