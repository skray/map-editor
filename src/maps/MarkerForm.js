var $ = require('jquery');
var React = require('react');

var container = $('#marker-form');

function render() {
    return ( 
    <form>
        <label>Title</label>
        <input name="title" type="text" ref="title"/>

        <label>Date</label>
        <input type="text" name="date" ref="date"/>

        <label>Lat</label>
        <input type="text" name="lat" ref="lat"/>
        <label>Long</label>
        <input type="text" name="long" ref="long"/>

        <label>Description</label>
        <textarea name="description" ref="description"></textarea>

        <button>Cancel</button>
        <button>Save</button>
    </form>
    );
}

function show(marker) {
    console.log(container);
    container.addClass('shown');
}

function hide() {
    container.removeClass('shown');
}

var MarkerForm = React.createClass({
    render: render,
    show: show,
    hide: hide
});

React.render(
  <MarkerForm />,
  container[0]
);

module.exports = MarkerForm;