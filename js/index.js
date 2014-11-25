$(function() {
  init();
  loadJSON();
});


function init() {
    fileExcelAll = "";
    filefilePersonnel = "";
    lecturesMap = {};
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
  // printLectures();
  // printMap();
  bindButton();
}


function bindButton() {
  // document.getElementById('studentChangeFileInput').addEventListener('change', loadFromFile, false);

  $('#input_fileExcelAll').change(function(e) {
    fileExcelAll = e.target.files[0];
  });

  $('#input_filePersonnel').change(function(e) {
    filePersonnel = e.target.files[0];
  });

  $('#btn_start').bind('click', function(){
    loadFromFile();
  });

}

// TODO: 要不要改用 Worker tread 避免卡住?
function loadFromFile() {
  // var file = fileExcelAll;
  var file = filePersonnel;
  if (file) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var content = fileReader.result;
      var lines = content.split('\n');
      var linesLength = lines.length;
      for (var i = 0; i < linesLength; i++) {
        var words = lines[i].split(',');
        // TODO:
        console.log(words)
      }
    }
    fileReader.readAsText(file);
  } else {
    alert("Failed to load file");
  }
}


function printMap() {
  for (var key in lecturesMap) {
    console.log(key + " : " + lecturesMap[x]); // print key:value
  }
}


/*
  從 JSON 讀取進 javascript 之後，資料結構為 Lecture，屬性為 name 和 aliasArray 這兩個而已
  已經跟 alias, aName 等等名稱沒關係了，不要被 JSON 給影響，已經沒有關連了
*/
function printLectures() {
  // alert("ss");
  for (var x in lectures) {
    var tmp = lectures[x];
    for (var m in tmp.aliasArray) {
      // console.log(tmp.name + ": ");
      console.log(tmp.name + ": " + tmp.aliasArray[m]);
    }
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
