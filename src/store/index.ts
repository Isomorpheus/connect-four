import Vue from 'vue'
import Vuex from 'vuex'
import types from '@/store/typings'
import { transpose, replaceAt } from '../services/utils'

Vue.use(Vuex)

const gRows = (n: number): Array<number> => [...Array(n)]
const matrix = (r: number, c: number) =>
  gRows(r).map((r, i) => gRows(c).fill(0))
console.log(gRows, matrix)

export default new Vuex.Store({
  state: {
    isLoading: false,
    board: matrix(6, 7),
    activePlayer: 1,
    gameState: 'play'
  },
  mutations: {
    [types.SET_BOARD](state, payload) {
      Vue.set(state, 'board', payload)
    },
    [types.TOGGLE_ACTIVE_PLAYER](state, payload) {
      Vue.set(state, 'activePlayer', payload)
    },
    [types.SET_GAMESTATE](state, payload) {
      Vue.set(state, 'gameState', payload)
    },
    [types.SET_IS_LOADING](state, payload) {
      Vue.set(state, 'isLoading', payload)
    }
  },
  actions: {
    [types.GET_SERVER_MOVE]({ state, commit }) {
      commit(types.SET_IS_LOADING, true)

      if (state.gameState === 'play') {
        fetch('/api/moves')
          .then(res => res.json())
          .then(json => {
            console.log('tester', json.column)
            this.dispatch(types.PICK_TILE, json.column)

            commit(types.SET_IS_LOADING, false)
          })
          .catch(error => console.log(error))
      }
    },
    [types.PICK_TILE]({ state, commit }, payload: number): void {
      // get column
      let currentBoard = [...transpose(state.board)]
      // find first 0
      let getIndex = currentBoard[payload].indexOf(0)

      // put player in matrix
      let updatedColumn = replaceAt(
        currentBoard[payload],
        getIndex,
        state.activePlayer
      )

      // update board in store
      let updatedBoard = replaceAt([...currentBoard], payload, updatedColumn)
      commit(types.SET_BOARD, transpose(updatedBoard))
      commit(types.TOGGLE_ACTIVE_PLAYER, state.activePlayer === 1 ? 2 : 1)
      // get move from server
      if (state.activePlayer === 2) {
        this.dispatch(types.GET_SERVER_MOVE)
      }
    },
    [types.SET_GAMESTATE_TO_WIN]({ state, commit }, { player }) {
      commit(types.SET_GAMESTATE, 'game over')
      console.log(player)
    }
  },
  modules: {}
})
