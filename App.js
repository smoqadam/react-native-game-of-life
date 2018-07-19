import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,TouchableHighlight
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.rows = 20;                                                                                                                                                                     ;
    this.cols = 20;                                                                                                                                                                     ;
    board = new Array(this.width);
    for(x = 0; x < this.rows; x++){
      board[x] = [];
      for(y = 0; y < this.cols; y++){
        board[x][y] = this.getRand() % 2 === 0 ? 0 : 1;
      }
    }

    this.state = {
      cells: board
    }
  }
  startGame(cells){
    setInterval(() => {
      for (x = 0; x < this.rows;x++){
        for(y = 0; y < this.cols;y++){
            cells[x][y] = this.isAlive(cells, x, y);
        }
      }

      this.setState({
        cells: cells
      });

    }, 100);
  }



  isAlive(cells, x, y){
    const dirs = [
      [-1, -1], 
      [ 0, -1], 
      [1, -1], 
      [-1, 0],
      // [0, 0], 
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ];
    let neighbors = 0;
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let x1 = x + dir[0];
      let y1 = y + dir[1];

      if (x1 >= 0 && x1 < this.rows && y1 >= 0 && y1 < this.cols && cells[x1][y1]) {
          neighbors++;
      }
    }
    if (cells[x][y] === 1) {
      if (neighbors === 2 || neighbors === 3){
        return  1;
      } else {
        return 0;
      }
    } else {
      if (cells[x][y] === 0 && neighbors === 3){
        return 1;
      }
    }

    return 0;
  }


  getRand(){
    return Math.floor(Math.random() * (this.rows));
  }

  renderRows(key) {
    let cols = Array(this.cols).fill(null).map((u, i) => i);
    return (
      <View key={key} style={styles.rows}>
        {
            cols.map((_, data) => {
              return (
                <View key={data} style={{
                   backgroundColor: this.state.cells[key][data] === 1 ? '#30bfbf':'#eeeeee', 
                   flex: 1,
                   borderRadius: 50,
                   alignSelf: 'stretch',
                   }} >
                </View>
              )
            })
        }
      </View>
    )
  }


  render() {
    let rows = Array(this.rows).fill(null).map((u, i) => i);

    return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {
                rows.map((_, data) => {
                      return this.renderRows(data);
                  })
              }
            <View style={{flexDirection:"row",flexWrap:'wrap'}}>
              <TouchableHighlight style={styles.btn} onPress={() => this.fill(this.state.cells)}>
                <Text>Initialize</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.btn} onPress={() => this.startGame(this.state.cells)}>
                <Text>Start</Text>
              </TouchableHighlight>
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  rows:{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' },
  btn:{
    flex: 1,
    backgroundColor:"#eeeeee",
    padding: 10,
    borderRightWidth:1,
    borderRightColor: '#cccccc',
    alignContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  }
});
