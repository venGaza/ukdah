function updateUser(id){
    $.ajax({
        url: '/admin/users/' + id,
        type: 'PUT',
        data: $('#updateUser').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};