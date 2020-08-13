$('.modal').on('hidden.bs.modal', function (e) {
    
  $(this).find('form')[0].reset()
});