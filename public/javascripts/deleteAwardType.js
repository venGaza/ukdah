function deleteAwardType(id){
    $.ajax({
        url: '/admin/awardTypes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};