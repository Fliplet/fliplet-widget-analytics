Fliplet.Widget.autosize();

$('form').submit(function (event) {
  event.preventDefault();

  Fliplet.Widget.save({
    trackUsers: !$('#disable-user-tracking').is(':checked')
  }).then(function () {
    Fliplet.Widget.complete();
  });
});

// Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function () {
  $('form').submit();
});

var data = Fliplet.Widget.getData();
$('#disable-user-tracking').prop('checked', data.trackUsers === false);