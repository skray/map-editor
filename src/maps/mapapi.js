var $ = require('jquery');

module.exports.listMaps = function listMaps() {
    return $.ajax({
        type: "GET",
        url: 'http://localhost:8080/maps',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};

module.exports.getMap = function getMap(id) {
    return $.ajax({
        type: "GET",
        url: 'http://localhost:8080/maps/' + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};

module.exports.saveMap = function saveMap(serializedMap) {
    return $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/maps/' + serializedMap.id,
        data: JSON.stringify(serializedMap),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};