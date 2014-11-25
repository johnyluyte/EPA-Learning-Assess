<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>環訓所地方績效考核計畫</title>
  <link rel="stylesheet" type="text/css" href="lib/bootstrap/bootstrap.min.css">
  <style type="text/css">
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    padding: 20px 0px 0px 0px;
    /* Margin bottom by footer height */

    margin-bottom: 60px;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */

    height: 40px;
    background-color: #f5f5f5;
  }
  .container .text-muted {
    margin: 10px 0;
  }
  .footer > .container {
    padding-right: 15px;
    padding-left: 15px;
  }
  </style>
</head>

<body>
  <div class="container-fluid">
    <div class="div_management">
      <h2>管理介面</h2>
      <div class="row">

        <div class="col-xs-9">
        <?php

        //  TODOs


        $json = file_get_contents("lecture.json");
        // $json_a=json_decode($string,true);
        echo $json['lectureLists']["name"];
        echo "<br/>aaa";
        echo "<br/>";
        // echo  $json_a['Jennifer'][status];
          var_dump(json_decode($json, true));
        ?>



          <table class="table table-hover table-bordered table-striped">
            <tr>
              <th>ID</th>
              <th>課程堂數</th>
              <th>ID</th>
              <th>課程堂數</th>
              <th>ID</th>
              <th>課程堂數</th>
            </tr>
            <tr>
              <td>B****24375</td>
              <td>3</td>
              <td>C****56335</td>
              <td>3</td>
              <td>B****89432</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B****24375</td>
              <td>3</td>
              <td>C****56335</td>
              <td>3</td>
              <td>B****89432</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B****24375</td>
              <td>3</td>
              <td>C****56335</td>
              <td>3</td>
              <td>B****89432</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B****24375</td>
              <td>3</td>
              <td>C****56335</td>
              <td>3</td>
              <td>B****89432</td>
              <td>3</td>
            </tr>
          </table>


        </div>
        <!-- <div class="col-xs-9"> -->

        <div class="col-xs-3" id="">
        </div>
        <!-- <div class="col-xs-3" id=""> -->

      </div>
      <!-- <div class="row"> -->

    </div>
    <!-- <div class="div_management"> -->

    <hr>
    <footer class="footer">
      <div class="container">
        <p class="text-muted">
          環訓所地方績效考核計畫. Built with
          <a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a> /
          <a href='https://jquery.com/' target='_blank'>jQuery</a>. By <a href='mailto:johnyluyte@gmail.com'>Chun Chien</a>, licensed under the <a href='http://opensource.org/licenses/MIT' target='_blank'>MIT License</a>. Fork me on <a href='https://github.com/johnyluyte/EPA-Learning-Assess' target='_blank'>Github</a>.
          <br/>
        </p>
      </div>

    </footer>

  </div>
  <!-- /container -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="lib/bootstrap/bootstrap.min.js"></script>
  <script src="js/index.js"></script>
</body>

</html>
