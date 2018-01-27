import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    padding: '10px',
    boxShadow: '0 2px 20px #000',
    color: '#a1b1b5',
    textAlign: 'left',
    overflow: 'scroll'
  },
})

class Rules extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <ul>
          <h4>Objective:</h4>
          <li>To win the star before the other teams.</li>
        </ul>
        <ul>
          <h4>Rules:</h4>
          <li>4 teams</li>
          <li>4-16 players</li>
          <li>Teams take turns rolling die.</li>
          <li>The first team to reach the star wins.</li>
          <li>Teams win minigames to earn coins.</li>
          <li>5 coins are needed to purchase a skeleton key, which unlocks final area on board.</li>
          <li>In the final arena, teams need to win 4 duels or 1 v. 3's to obtain the star and every team member must win at least one minigame to advance.</li>
        </ul>
        <ul>
          <h4>Types of spaces:</h4>
          <li>
            <strong>Blue spaces: </strong>
            Team gets to choose it team rep(s) in next minigame.
          </li>
          <li>
            <strong>Red spaces: </strong>
            Team is randomly assigned it team rep(s) in next minigame.
          </li>
          <li>
            <strong>Happening spaces: </strong>
            Pick a happening card.
          </li>
          <li>
            <strong>King Boo’s corner: </strong>
            Take one team’s minigame card; sit out next turn.
          </li>
          <li>
            <strong>Store: </strong>
            Buy a Skeleton Key with 5 coins (can always stop here when passing regardless of roll).
          </li>
          <li>
            <strong>Chance spaces: </strong>
            Pick a card to determine team; pick a card to determine outcome.
          </li>
          <li>
            <strong>Battle spaces: </strong>
            4 player minigame in which winner steals card from loser.
          </li>
          <li>
            <strong>Duel spaces: </strong>
            1 v. 1 minigame in which challenger faces random team to move forward.
          </li>
        </ul>
        <ul>
          <h4>Types of Minigames:</h4>
          <li>Roundly minigames:
            <em> Each team chooses 1-2 players to compete, depending on minigame.</em>
            <ul>
              <li>4-player</li>
              <li>1 v. 3</li>
              <li>2 v. 2 <em>( with teams of 2+ players, these can be played as 4-player games )</em></li>
            </ul>
          </li>
          <li>Battle: same as 4-player</li>
          <li>Duel: 1 v. 1</li>
        </ul>
      </div>
    )
  }
}

export default Rules;