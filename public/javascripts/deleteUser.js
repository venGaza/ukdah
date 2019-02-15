function deleteUser(id){
    $.ajax({
        url: '/adminEmployees/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};