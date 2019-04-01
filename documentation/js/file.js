
$(function () {
	$('#myTab a:first').tab('show');
});

//Next and prev buttons
$('#submit').click(function(){
	var nextListItem = $('.left-content ul > .active').next('li');
	nextListItem.removeClass('ghost');
	nextListItem.find('a').trigger('click');
});

