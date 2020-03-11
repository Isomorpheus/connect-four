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
    board: matrix(6, 7)
  },
  mutations: {
    [types.SET_BOARD](state, payload) {
      console.log('mutation', payload)

      Vue.set(state, 'board', payload)
      // object with playerid and update column
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
      let updatedColumn = replaceAt(currentBoard[payload], getIndex, 1)

      // update board in store
      let updatedBoard = replaceAt([...currentBoard], payload, updatedColumn)
      commit(types.SET_BOARD, transpose(updatedBoard))
    }
  },
  modules: {}
})
