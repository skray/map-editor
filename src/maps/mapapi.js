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

module.exports.saveMap = function saveMap(map) {
    var justLatLngs = [];
    var markers = map.markers;
    map.markers.forEach(function(marker) {
        justLatLngs.push([marker.getLatLng().lat, marker.getLatLng().lng]);
    });
    map.markers = justLatLngs;
    var mapString = JSON.stringify(map);
    map.markers = markers;
    return $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/maps/' + map.id,
        data: mapString,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};

module.exports.list = function list() {
    return $.ajax({
        type: "GET",
        url: 'http://localhost:8080/maps/123/markers',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
};

module.exports.save = function save(marker) {

    if(marker._id) {
        return $.ajax({
            type: "PUT",
            url: 'http://localhost:8080/maps/123/markers/' + marker._id,
            data: JSON.stringify(marker),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    } else {
        return $.ajax({
            type: "POST",
            url: 'http://localhost:8080/maps/123/markers',
            data: JSON.stringify(marker),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }
    
};

module.exports.del = function del(marker) {
   return $.ajax({
       type: "DELETE",
       url: 'http://localhost:8080/maps/123/markers/' + marker._id,
       data: JSON.stringify(marker),
       contentType: "application/json; charset=utf-8",
       dataType: "json"
   }); 
};