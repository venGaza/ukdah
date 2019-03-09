function deleteUserEmployee(id){
    $.ajax({
        url: '/user/employees/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};