const tableClickEvent = () => {
  $('tbody tr').click(function(){
    console.log('click!');
    const tr = $(this);
    const td = tr.children();
    const id = td.eq(0).text();

    window.location.href = `/matching/${id}`;
  });

  $('tbody tr').mouseover(function(){
    $(this).css("background-color", '#f2f2f2');
  });
  $('tbody tr').mouseout(function(){
    $(this).css("background-color", '');
  });
}

tableClickEvent();
