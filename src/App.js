import React, { Component } from 'react';
import playerData from './playerData'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      players: playerData,
      pickedPlayers: [],
      myTeam: [] 
     }
  }

  listAvailablePlayers = () => {
    const players = this.state.players.sort((a, b) => a.overall_rank - b.overall_rank)
    return players.map(({player_name, overall_rank, positional_rank, bye_week}, index) => {
      return (
        <div key={ overall_rank }>
          <li class="list-group-item">
            <div>
              { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week } 
            </div>
            <div class="btn-group justify-content-right" role="group" aria-label="Basic example">
              <button class="btn btn-warning btn-sm d-flex justify-content-right" onClick={ () => this.selectPlayer(index) }>Picked</button> 
              <button class="btn btn-danger btn-sm d-flex justify-content-right" onClick={ () => this.selectForTeam(index) }>Add to Team</button>   
            </div>
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

  selectForTeam = (index) => {
    const team = this.state.myTeam
    const players = this.state.players

    let player = players[index]
    console.log('before', players[index])
    delete players[index]
    team.push(player)
    this.setState({myTeam: team})
    this.setState({players: players})
  }
  
  unselectTeam = (index) => {
    const team = this.state.myTeam
    const players = this.state.players

    let player = team[index]

    delete team[index]
    players.push(player)
    this.setState({myTeam: team})
    this.setState({players: players})
  }

  listUnavailablePlayers = () => {
    const players = this.state.pickedPlayers
    return players.map(({player_name, overall_rank, positional_rank, bye_week}, index) => {
      return (
        <div key={ overall_rank }>
          <li class="list-group-item list-group-item-danger">
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

  listMyTeam = () => {
    const players = this.state.myTeam
    return players.map(({player_name, overall_rank, positional_rank, bye_week}, index) => {
      return (
        <div key={ overall_rank }>
          <li class="list-group-item list-group-item-warning">
            { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week }
            <button class="btn btn-danger btn-sm d-flex justify-content-right" onClick={ () => this.unselectTeam(index) }>Un-Select</button>    
          </li>
       </div>
      )
    })  
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
        <div class="d-flex justify-content-around">
          <section>
            <h1 style={{color: "#900C3F"}}>Players</h1>
            <ul class="list-group">
              { this.listAvailablePlayers() }
            </ul>
          </section>
          <section>
            <h1 style={{color: "#900C3F"}}>Picked</h1>
            <ul class="list-group">
              { this.listUnavailablePlayers() }
            </ul>
          </section>
          <section>
            <h1 style={{color: "#900C3F"}}>My Team</h1>
            <ul class="list-group">
              { this.listMyTeam() }
            </ul>
          </section>
        </div>
      </div>
    )
  }
}
 
export default App;

