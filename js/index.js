var JSON_FILE_NAME = "lecture.json";


$(function() {
  init();
});


function init() {
    loadJSON();
  } // init()


function loadJSON() {
  $.getJSON(JSON_FILE_NAME, function(data) {
      // Assign json contents to Global variable "lectures".
      var list = data.lectureLists;
      for (var i in list) {
        var lecture = new Lecture();
        lecture.name = list[i].name;
        lecture.aliasArray = new Array();

        var aliasList = list[i].alias;
        for (var k in aliasList) {
          // console.log(list[i].name+aliasList[k].aName);
          lecture.aliasArray[k] = aliasList[k].aName;
        }

        // Add to array
        lectures[i] = lecture;
      }
      afterLoadJSON();
    })
    .error(function() {
      alert("Error loading JSON_FILE_NAME:" + JSON_FILE_NAME);
    });
}

function afterLoadJSON() {
  printLectures();
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
