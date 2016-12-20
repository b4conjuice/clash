var React = require('react');
var Member = require('./Member');

var Clan = React.createClass({

	render: function() {
		var clan = this.props.clan;
		var clanList = clan.map(function(member, index) {
			return <Member key={index} member={member} />
		}) 
		return (
			<div>{clanList}</div>
		);
	}

});

module.exports = Clan;