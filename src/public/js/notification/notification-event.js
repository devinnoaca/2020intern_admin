$('[name="receiver"]').on('change', function(){
  if ($(this).val() === 'user') {
    $('[name="receiver_ID"]').attr('disabled',false);
  } else {
    $('[name="receiver_ID"]').attr('disabled',true);
  }
});