var $ = require('jquery');

module.exports.list = function list() {
    return $.ajax({
        type: "GET",
        url: 'http://localhost:8080/maps/123/markers',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};

module.exports.save = function save(marker) {
    return $.ajax({
        type: "POST",
        url: 'http://localhost:8080/maps/123/markers',
        data: JSON.stringify(marker),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};