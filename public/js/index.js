/* eslint-disable eqeqeq */
$(document).ready(function() {
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas");
  var canvas = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");
  var outputData = document.getElementById("outputData");
  var newId;
  $("#result").click(function() {
    window.location.pathname = "./result";
  });
  $(function() {
    $("#myTab a:first").tab("show");
  });
  //Next and prev buttons
  $("#submit").click(function() {
    event.preventDefault();
    //toggleTable();
    var newQr = {
      text: outputData.innerText
    };
    if (!newQr.text) {
      alert("No QR Detected! Please scan QR!");
      return;
    }
    var newArr = newQr.text.split("|");
    newId = newArr[0];

    $("#resultDiv").empty();
    $.ajax({ url: "/api/" + newId, method: "GET" }).then(function(tableData) {
      // Here we then log the tableData to console, where it will show up as an object.
      console.log(tableData);

      $("#resultDiv").append("<p> Product ID: " + tableData.prod_id + "</p>");
      $("#resultDiv").append(
        "<p> Product Name: " + tableData.prod_name + "</p>"
      );
      $("#resultDiv").append(
        "<p> Product Location: " + tableData.location + "</p>"
      );
      $("#resultDiv").append("<p> Product Price: " + tableData.price + "</p>");
    });
  });
  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }
  // Use facingMode: environment to attemt to get the front camera on phones
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });
  function tick() {
    loadingMessage.innerText = "⌛ Loading video...";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      });
      if (code) {
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
      } else {
        //outputMessage.hidden = false;
        //outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
  /*
  function tableData() {
    $.ajax({ url: "/product", method: "GET" }).then(function(tableData) {
      // Here we then log the tableData to console, where it will show up as an object.
      console.log(tableData);
      for (var i = 0; i < tableData.length; i++) {
        var tableList = $("#defaultTable");

        // Then display the fields in the HTML (Section Name, Date, URL)
        var listItem = $("<tr>");

        listItem.append(
          $("<td>").text(tableData[i].prod_id),
          $("<td>").text(tableData[i].prod_name),
          $("<td>").text(tableData[i].location),
          $("<td>").text(tableData[i].price)
        );

        tableList.append(listItem);
      }
    });
  }

  //tableData();


  function toggleTable() {
    //var elem = document.getElementById("defaultDiv");
    var elem1 = document.getElementById("resultDiv");
    var hide = elem1.style.visibility == "hidden";
    if (hide) {
      //elem.style.display = "none";
      elem1.style.visibility = "visible";
    } else {
      //elem.style.display = "table";
      elem1.style.visibility = "none";
    }
  } */
});
