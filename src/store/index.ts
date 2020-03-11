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
    [types.SET_GAMESTATE] (state, payload) {
      Vue.set(state, 'gameState', payload)
    }
  },
  actions: {
    [types.PICK_TILE]({ state, commit }, payload: number): void {
      console.log('action: ', payload, transpose(state.board))
      // get column
      let currentBoard = [...transpose(state.board)]
      // find first 0
      let getIndex = currentBoard[payload].indexOf(0)

      console.log(currentBoard[payload], getIndex)

      // put player id
      let updatedColumn = replaceAt(currentBoard[payload], getIndex, state.activePlayer)

      // update board in store
      let updatedBoard = replaceAt([...currentBoard], payload, updatedColumn)
      commit(types.SET_BOARD, transpose(updatedBoard))
      commit(types.TOGGLE_ACTIVE_PLAYER, state.activePlayer === 1 ? 2 : 1 )
    },
    [types.SET_GAMESTATE_TO_WIN]({state, commit}, {player}) {
      commit(types.SET_GAMESTATE, 'game over')
      console.log(player)
    }
  },
  modules: {}
})
