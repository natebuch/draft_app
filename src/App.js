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
          <li className="list-group-item">
            <div>
              { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week } 
            </div>
            <div className="btn-group justify-content-right" role="group" aria-label="Basic example">
              <button className="btn btn-warning btn-sm d-flex justify-content-right" onClick={ () => this.selectPlayer(index) }>Picked</button> 
              <button className="btn btn-danger btn-sm d-flex justify-content-right" onClick={ () => this.selectForTeam(index) }>Add to Team</button>   
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

    delete players[index]
    
    selected.push(player)
    this.setState({pickedPlayers: selected})
    this.setState({players: players})
    console.log(this.state.players)
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
          <li className="list-group-item list-group-item-danger">
            { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week }
            <button className="btn btn-warning btn-sm d-flex justify-content-right" onClick={ () => this.unselectPlayer(index) }>Remove</button>    
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
          <li className="list-group-item list-group-item-warning">
            { overall_rank }. { player_name } - Pos. { positional_rank } - Bye: { bye_week }
            <button className="btn btn-danger btn-sm d-flex justify-content-right" onClick={ () => this.unselectTeam(index) }>Remove</button>    
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
          <div>
            <img id="fork" src="https://i.redd.it/odmx4dqcaory.jpg" width="60" height="60" alt=""/>
            <span style={{color: "#FFC300"}} className='justify-content-left'>DRAFT 'EM</span>
            </div>
            <span id="logo" className="navbar-brand mb-0 h1" style={{color: "#FFC300"}}>S.D.I.F.F.L.</span>
          </nav> 
        </div> 
        <div className="d-flex justify-content-around">
          <section>
            <h3  style={{color: "#900C3F", borderBottom: "2px solid #900C3F"}}>Avail. Players</h3>
            <ul className="list-group">
              { this.listAvailablePlayers() }
            </ul>
          </section>
          <section>
            <h3 style={{color: "#900C3F", borderBottom: "2px solid #900C3F"}}>Drafted Players</h3>
            <ul className="list-group">
              { this.listUnavailablePlayers() }
            </ul>
          </section>
          <section>
            <h3 style={{color: "#900C3F", borderBottom: "2px solid #900C3F"}}>My Team</h3>
            <ul className="list-group">
              { this.listMyTeam() }
            </ul>
          </section>
        </div>
      </div>
    )
  }
}
 
export default App;

