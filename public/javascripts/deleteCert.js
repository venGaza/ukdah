function deleteCert(id){
    $.ajax({
        url: '/updateAward/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};