// Uses "blob" and "html5 <a download></a> attribute" to perform offline download.
// http://blog.darkthread.net/post-2014-03-12-html5-object-url.aspx
function createDownloadableContent() {
  createCSV();
  /*
  TODO:
    要 Clean blob，避免 memory leak
    a.onclick = function(e) {
      cleanUp(this);
    };
  */
}

// 分析 idLecturesMap[id] 內的課程，分成 我們認定的課程 跟 其他課程
// 我們認定的課程 彼此之間用全形逗號連接，例如：噴藥器材簡介、入侵紅火蟻防治
// 其他課程 彼此之間用全形逗號連接，例如：打造職場好形象、職場必備的商務禮儀
// 其他課程 彼此之間用半形逗號連接，例如：噴藥器材簡介、入侵紅火蟻防治,打造職場好形象、職場必備的商務禮儀
// 排序一律都是先 我們認定的課程 後面才接 其他課程
function distincOurLectureAndOtherLecture(id) {
  var ourLecture = idLecturesMap[id];
  var otherLecture = idOtherMap[id];


  /*
    var strLectures = idLecturesMap[id].split('、');
    var count;
    if (strLectures[0].trim() === "") {
      count = 0; // there is no lecture here, we init count at 0;
    } else {
      count = strLectures.length; // there is at least 1 lecture here, we init count at its length;
    }
    for (var i = 0; i < count; i++) {
      ourLecture += strLectures[i].trim();
    }
  */



  /*
    var length = strLectures.length;
    for (var i = 0; i < length; i++) {
      var trim = strLectures[i].trim();
      console.log("trim="+trim);
      if(trim === ""){
        continue;
      }
      var name = strGetLectureOfficialName(trim);
      console.log("name="+name);
      if (name == OFFICIAL_LECTURE_NAME_UNKNOW) {
        otherLecture += name + "、";
      } else if (name == OFFICIAL_LECTURE_NAME_OTHER) {
        otherLecture += name + "、";
      } else {
        ourLecture += name + "、";
      }
    }
    ourLecture = ourLecture.substring(0, ourLecture.length - 1);
    otherLecture = ourLecture.substring(0, ourLecture.length - 1);
    */
  // console.log(id);
  // console.log(ourLecture);
  // console.log(otherLecture);

  return ourLecture + "," + otherLecture;
}



function createCSV() {
  // 將目前頁面上的 option select 用 逗號 和 換行 分隔，並存入變數中。
  var BOM = "\uFEFF";
  var content = BOM + content;
  content += " 人員ID,符合的課堂數,符合的環保課程,其他課程\n";
  for (var id in idMap) {
    content += id + ",";
    content += idMap[id] + ",";
    content += distincOurLectureAndOtherLecture(id);
    content += "\n";
  }
  content += "尚未修課人數," + plus0PointCount + "\n";
  content += "一堂以上人數," + plus1PointCount + "\n";
  content += "兩堂以上人數," + plus2PointCount + "\n";
  content += "三堂以上人數," + plus3PointCount + "\n";
  content += "總加分," + totalPlusPoint + "\n";

  // 將此變數利用 blob 轉成可下載的物件。
  const MIME_TYPE = 'text/csv';
  var blob = new Blob([content], {
    type: MIME_TYPE
  });
  var blobUrl = window.URL.createObjectURL(blob);

  var inputFileName = $("#input_fileExcelAll").val().split('/').pop().split('\\').pop();
  inputFileName = inputFileName.substring(0, inputFileName.length - 4);
  // console.log(inputFileName);

  var fileName = inputFileName + OUTPUT_FILENAME_SUFFIX;

  var $btn_downloadCSV = $('#btn_downloadCSV');
  $btn_downloadCSV.attr({
    href: blobUrl,
    download: fileName
  });

}

/*
// 指定 目前的日期時間 為 檔案名稱。
function getFileName(suffix) {
  var currentdate = new Date();
  var fileName = "" + currentdate.getFullYear() + fixOneDigit((currentdate.getMonth() + 1)) + fixOneDigit(currentdate.getDate()) + "_" + fixOneDigit(currentdate.getHours()) + fixOneDigit(currentdate.getMinutes()) + fixOneDigit(currentdate.getSeconds()) + suffix;
  return fileName;
}

// 如果現在時間是 2014/11/1, 21:07, 02
// 可能我們會得到 2014111_2172
// 而我們想要的是 20141101_210702 才對
// 這個 function 可以 fix 上述問題。
function fixOneDigit(x) {
  var result = x;
  if (result < 10) {
    result = "0" + result;
  }
  return result;
}
*/
