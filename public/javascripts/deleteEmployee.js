function deleteEmployee(id){
    $.ajax({
        url: '/admin/employees/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};