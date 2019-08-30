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
          <li class="list-group-item">
            { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week }
            <button class="btn btn-warning btn-sm d-flex justify-content-right" onClick={ () => this.selectPlayer(index) }>Select</button>    
          </li>
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
          <li class="list-group-item">
            { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week }
            <button class="btn btn-warning btn-sm d-flex justify-content-right" onClick={ () => this.unselectPlayer(index) }>Un-Select</button>    
          </li>
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
      <div>
        <div>
          <nav className="navbar" style={{backgroundColor: '#900C3F'}}>
            <img id="fork" src="https://i.redd.it/odmx4dqcaory.jpg" width="60" height="60" alt=""/>
            <span id="logo" className="navbar-brand mb-0 h1" style={{color: "#FFC300"}}>S.D.I.F.F.L.</span>
          </nav> 
        </div> 
        <div class="d-flex justify-content-center">
          <section>
            <h1 style={{color: "#900C3F"}}>Available Players</h1>
            <ul class="list-group">
              { this.listAvailablePlayers() }
            </ul>
          </section>
          <section>
            <h1 style={{color: "#900C3F"}}>My Team</h1>
            <ul class="list-group">
              { this.listUnavailablePlayers() }
            </ul>
          </section>
        </div>
      </div>
    )
  }
}
 
export default App;

