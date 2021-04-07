import { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				this.setState({ monsters: users });
			})
			.catch((err) => console.error(err));
	}

	handleChange = (e) => {
		this.setState({ searchField: e.target.value });
	};

	render() {
		let { monsters, searchField } = this.state;
		searchField = searchField.toLowerCase();
		const filteredMonsters = monsters.filter((monster) =>
			monster.name.toLowerCase().includes(searchField)
		);
		return (
			<div className="App">
				<h1>Monsters Rolodex</h1>
				<SearchBox
					placeholder="search monsters"
					handleChange={this.handleChange}
				/>
				<CardList monsters={filteredMonsters}></CardList>
			</div>
		);
	}
}

export default App;
