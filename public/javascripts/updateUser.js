function updateUser(id){
    $.ajax({
        url: '/adminEmployees/' + id,
        type: 'PUT',
        data: $('#updateUser').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};