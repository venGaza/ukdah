function selectType(id){
    if (id == 1) {
        $("#user-type-user").prop("checked", true);
    } else {
        $("#user-type-admin").prop("checked", true);
    }
}