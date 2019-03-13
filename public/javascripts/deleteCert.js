function deleteCert(id){
    $.ajax({
        url: '/user/updateAward/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};