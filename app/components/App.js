var React = require('react');
var Clan = require('./Clan');
var FilterButton = require('./FilterButton');

var App = React.createClass({
	getInitialState: function() {
		return {
			clan: [], // all members
			warClan: [], // members in war
			currentClan: [] // members to be shown
		};
	},
	componentDidMount: function() {
		var _this = this;
		var url = 'https://spreadsheets.google.com/feeds/list/15dO8WTAAgjTULdk2Ku2NRJlkmrv1mHvroJQxdG6a9AQ/od6/public/values?alt=json';

		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);
				var entries = data.feed.entry;
				var clan = [];
				var warClan = [];

				Object.keys(entries).forEach(function(key) {
					var entry = entries[key];
					var name = entry.gsx$name.$t;
					var th = entry.gsx$th.$t;
					var war = entry.gsx$war.$t;
					var weight = entry.gsx$weight.$t;
					var active = entry.gsx$active.$t;
					var rank = entry.gsx$rank.$t;
					var member = {
						name: name,
						th: parseInt(th),
						weight: parseInt(weight),
						active: active,
						war: war,
						rank: rank
					};
					clan.push(member);
					if (war == 'TRUE')
						warClan.push(member);
				});
				warClan.sort(function(a, b) {
					return a.weight - b.weight;
				})

				_this.setState({
					clan: clan,
					warClan: warClan,
					currentClan: clan
				})
			}
			else
				console.log('error')
		};
		request.send();
	},
	handleClick: function(event) {
		var label = event.target.name;
		var currentClan = [];
		if (label == 'war') 
			currentClan = this.state.warClan;
		else if (label == 'all')
			currentClan = this.state.clan;
		this.setState({
			currentClan: currentClan
		})
	},
	render: function() {
		return (
			<div>
				<FilterButton onClick={this.handleClick} label='war'/>
				<FilterButton onClick={this.handleClick} label='all'/>
				<Clan clan={this.state.currentClan} />
			</div>
		);
	}

});

module.exports = App;