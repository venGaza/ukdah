function deleteAward(id){
    $.ajax({
        url: '/admin/awards/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};