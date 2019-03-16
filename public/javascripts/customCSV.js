var csv = document.getElementById('preview').innerHTML;
csv = csv.substr(1);
csv = csv.trim();

function downloadCSV() {
    var file = new File([csv], "data.csv");
    var element = document.createElement('a');
    element.setAttribute('href', URL.createObjectURL(file));
    element.setAttribute('download', "data.csv");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function fixPreview() {
    var first = true;
    var str = document.getElementById('preview').innerHTML.split("\n");
    document.getElementById('preview').innerHTML = "";
    str = str.slice(1);
    str.forEach(addInnerHTML);
    function addInnerHTML(value) {
        if (first) {
            document.getElementById('preview').innerHTML = value + "<br>";
            first = false;
        }
        else {
            document.getElementById('preview').innerHTML += value + "<br>";
        }
    }
}


fixPreview();