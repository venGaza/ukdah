function deleteUser(id){
    $.ajax({
        url: '/admin/users/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};