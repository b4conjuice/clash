var React = require('react');

var Member = React.createClass({

	render: function() {
		var member = this.props.member;
		return (
			<div>{member.name + ' th' + member.th}</div>
		);
	}

});

module.exports = Member;