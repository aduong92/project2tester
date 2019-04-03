$(document).ready(function() {
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
  tableData();
});
