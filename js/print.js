/*
  input: P****42565
  output: P42565
*/
function getShortID(id) {
  var shortID = id.substring(0, 1) + id.substring(5, 10);
  return shortID;
}

function printResultTable(mode) {
  countTotalPersonnel = Object.keys(idMap).length;

  var str = "";
  if (mode === "modeA") {
    str += "模式 A：僅分析 (A) 人員與上課情形。";
  } else if (mode === "modeB") {
    str += "模式 B：分析 (A) 人員與上課情形 與 (B) 單位人員名單 的交集名單。";
  }
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
    if (idMap[id] === 0) {
      str += '<td class="danger getInfo" id="td' + getShortID(id) + '">';
    } else if (idMap[id] === 1) {
      str += '<td class="warning getInfo" id="td' + getShortID(id) + '">';
    } else if (idMap[id] === 2) {
      str += '<td class="info getInfo" id="td' + getShortID(id) + '">';
    } else {
      str += '<td class="success getInfo" id="td' + getShortID(id) + '">';
    }
    // Because the character '*' means something to the jQuery selector
    // We cannot have it in the 'id' field.
    // Thus a id with value "tdP****42565" should be changed to just "tdP42565"
    str += id + '</td>';
    str += '<td>' + idMap[id] + '</td>';
    switch (idMap[id]) {
      default: plus3PointCount++;
      case 2:
          plus2PointCount++;
      case 1:
          plus1PointCount++;
          break;
      case 0:
          plus0PointCount++;
          break;
    }
  }
  str += '</tr>';
  str += '</table>';


  str += '<table class="table table-hover table-bordered table-striped">';
  str += '  <tr>';
  // str += '    <th>資料總筆數</th>';
  // str += '    <th>符合ＩＤ的筆數</th>';
  // str += '    <th>符合ＩＤ及環保課程</th>';
  // str += '    <th>職員人數</th>';
  str += '    <th>尚未修課人數</th>';
  str += '    <th>一堂以上人數</th>';
  str += '    <th>兩堂以上人數</th>';
  str += '    <th>三堂以上人數</th>';
  str += '    <th>加分</th>';
  str += '  </tr>';

  str += '  <tr>';
  // str += '    <td>' + countTotal + '</td>';
  // str += '    <td>' + countMatchID + '</td>';
  // str += '    <td>' + countMatchIdAndLecture + '</td>';
  // str += '    <td>' + countTotalPersonnel + '</td>';
  str += '    <td class="danger">' + plus0PointCount + ' / ' + countTotalPersonnel + '</td>';
  str += '    <td class="warning">' + plus1PointCount + ' / ' + countTotalPersonnel + '</td>';
  str += '    <td class="info">' + plus2PointCount + ' / ' + countTotalPersonnel + '</td>';
  str += '    <td class="success">' + plus3PointCount + ' / ' + countTotalPersonnel + '</td>';
  if (plus3PointCount === countTotalPersonnel) {
    totalPlusPoint = 3;
  } else if (plus2PointCount === countTotalPersonnel) {
    totalPlusPoint = 2;
  } else if (plus1PointCount === countTotalPersonnel) {
    totalPlusPoint = 1;
  } else {
    totalPlusPoint = 0;
  }
  str += '    <td><strong>' + totalPlusPoint +'</strong>';
  str += '    </td>';
  str += '  </tr>';

  str += '</table>';
  str += '<a type="button" class="btn btn-danger btn-block btn-lg" id="btn_downloadCSV">下載 CSV 檔案</button>';

  $("#div_result_table").html(str);


  // Bind <span id=""> to function after the HTML is loaded in the $Document
  for (var id in idMap) {

    // TODO: what is the difference between these codes? Why only the last one works?
    // $('#td' + getShortID(id)).bind('click', (function(argId) {
    // $(document).on('click', '#td' + getShortID(id), (function(argId) {
    // $(document).bind('click', '#td' + getShortID(id), (function(argId) {
    document.getElementById('td' + getShortID(id)).addEventListener('click', (function(argId) {
      return function() {
        onClickTableID(argId);
      };
    })(id), false);
  }

  printUnknownLectureTable();
  createDownloadableContent();
  clean();
}

function onClickTableID(id) {
  console.log("onclick id = " + id);
  // console.log("idLecturesMap[id] = " + idLecturesMap[id]);
  var str = "";
  str += '<table class="table table-hover table-bordered table-striped">';
  str += '  <tr>';
  str += '    <th class="warning">' + id + '</th>';
  str += '  </tr>';

  var strLectures = idLecturesMap[id].split('、');
  var count;
  if (strLectures[0].trim() === "") {
    count = 0; // there is no lecture here, we init count at 0;
  } else {
    count = strLectures.length; // there is at least 1 lecture here, we init count at its length;
  }
  for (var i = 0; i < count; i++) {
    str += '<tr><td>';
    str += strLectures[i].trim();
    str += '</td></tr>';
    // console.log("strLectures = " + strLectures[i].trim());
  }

  // 印出非我們環保課程的其他課程
  /*
    var apple = idOtherMap[id].split('、');
    var dog;
    if (apple[0].trim() === "") {
      dog = 0; // there is no lecture here, we init count at 0;
    } else {
      dog = apple.length; // there is at least 1 lecture here, we init count at its length;
    }
    for (var i = 0; i < dog; i++) {
      str += '<tr><td>';
      str += apple[i].trim();
      str += '</td></tr>';
      // console.log("apple = " + apple[i].trim());
    }
    */

  str += '  <tr>';
  str += '    <td class="warning"><strong>共上 ' + count + ' 堂課程</strong></td>';
  str += '  </tr>';
  str += '</table>';
  $('#div_id_lecture_info').html(str);
}



function printUnknownLectureTable() {
  if(isListUnknown===false){
    return;
  }
  var str = "<hr>";
  if (unknowLectures === "") {
    str += "<h3>恭喜！沒有遇到未知的課程名稱！</h3>";
  } else {
    str += "<h3>偵測到未知課程名稱如下，請確認以下非環保課程</h3>";
    str += '<table class="table table-hover">';
    str += ' <tr class="danger">';
    str += '   <th>未知的課程名稱</th>';
    str += ' </tr>';

    var splited = unknowLectures.split(',');
    var count = splited.length;
    for (var i = 0; i < count; i++) {
      str += '<tr><td>';
      str += splited[i].trim();
      str += '</td></tr>';
    }
    str += "</table>";
  }
  $("#div_unknown_record").html(str);
}
