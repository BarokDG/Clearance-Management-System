$('#addRecordButton').click(function() {
    $('#exampleModal').modal('hide');
    return false;
 });

 $('#exampleModal').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input,textarea,select")
         .val('')
         .end()
     
  })