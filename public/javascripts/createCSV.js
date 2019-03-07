function download(filename, text) {
    var file = new File([text], filename);
    var element = document.createElement('a');
    element.setAttribute('href', URL.createObjectURL(file));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function createCSV(data) {
    csv = "";

    for (i = 0; i < Object.keys(data[0]).length; i++) {
        if (i === Object.keys(data[0]).length - 1) {
            csv += Object.keys(data[0])[i] + '\n';
        }
        else {
            csv += Object.keys(data[0])[i] + ',';
        }
    }

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < Object.values(data[i]).length; j++) {
            if (j === Object.values(data[i]).length - 1) {
                csv += Object.values(data[i])[j] + '\n';
            }
            else {
                csv += Object.values(data[i])[j] + ',';
            }
        }
    }

    document.getElementById('premadeExport').onclick = function () {
        download("data.csv", csv);
    };
}
