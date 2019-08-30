import React, { Component } from 'react';
import playerData from './playerData'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      players: playerData,
      pickedPlayers: [] 
     }
  }

  listAvailablePlayers = () => {
    const players = this.state.players.sort((a, b) => a.overall_rank - b.overall_rank)
    return players.map(({player_name, overall_rank, positional_rank, bye_week}, index) => {
      return (
        <div key={ overall_rank }>
          <li style={{ listStyle: "none" }}>{ overall_rank }. { player_name } Pos. { positional_rank } Bye: { bye_week } </li>  
          <button onClick={ () => this.selectPlayer(index) }>Select</button>     
        </div>
      )
    })
  }


  selectPlayer = (index) => {
    const selected = this.state.pickedPlayers
    const players = this.state.players

    let player = players[index]
    console.log('before', players[index])
    delete players[index]
    selected.push(player)
    this.setState({pickedPlayers: selected})
    this.setState({players: players})
  }
  
  listUnavailablePlayers = () => {
    const players = this.state.pickedPlayers
    return players.map(({player_name, overall_rank, positional_rank, bye_week}, index) => {
      return (
        <div key={ overall_rank }>
          <li style={{ listStyle: "none" }}>{ overall_rank }. { player_name } Pos. { positional_rank } Bye: { bye_week } </li>  
          <button onClick={ () => this.unselectPlayer(index) }>Un-Select</button>     
        </div>
      )
    })  
  }

  unselectPlayer = (index) => {
    const selected = this.state.pickedPlayers
    const players = this.state.players

    let player = selected[index]

    delete selected[index]
    players.push(player)
    this.setState({pickedPlayers: selected})
    this.setState({players: players})
  }


  render() { 
    return (
      <div style={{display: "flex", justifyContent: "flexStart"}}>
        <section>
          <h1>Available Players</h1>
          <ul>
            { this.listAvailablePlayers() }
        </ul>
        </section>
        <section>
          <h1>My Team</h1>
          <ul>
          { this.listUnavailablePlayers() }
          </ul>
        </section>
      </div>
    )
  }
}
 
export default App;

