var React = require('react');

var FilterButton = React.createClass({

	render: function() {
		return (
			<button onClick={this.props.onClick} name={this.props.label}>{this.props.label}</button>
		);
	}

});

module.exports = FilterButton;