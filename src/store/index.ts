import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import types from '@/store/typings'
import { transpose, replaceAt } from '../services/utils'

Vue.use(Vuex)

// initial values for store
interface seedValues {
  isLoading: boolean
  board: number[][]
  activePlayer: number
  gameState: string
  winner: number
  [key: string]: seedValues[keyof seedValues]
}
const seed = (): seedValues => ({
  isLoading: false,
  board: matrix(6, 7),
  activePlayer: 1,
  gameState: 'play',
  winner: 0
})

// helper functions
const gRows = (n: number): Array<number> => [...Array(n)]
const matrix = (r: number, c: number) =>
  gRows(r).map((r, i) => gRows(c).fill(0))

export default new Vuex.Store({
  state: { ...seed() },
  mutations: {
    [types.INIT_BOARD](state) {
      const s = seed()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
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
    },
    [types.SET_WINNER](state, player) {
      Vue.set(state, 'winner', player)
    }
  },
  actions: {
    [types.GET_SERVER_MOVE]({ state, commit }) {
      commit(types.SET_IS_LOADING, true)
      if (state.gameState === 'play') {
        console.log(state.board)
        axios
          .post('/api/moves', {
            data: { board: state.board }
          })
          .then(res => {
            if (state.gameState === 'play') {
              this.dispatch(types.PICK_TILE, res.data.column)
            }

            commit(types.SET_IS_LOADING, false)
          })
          .catch(error => console.log(error))
      }
    },
    [types.PICK_TILE]({ state, commit }, payload: number): void {
      // get column
      let currentBoard = [...transpose(state.board)]
      // for available cells
      if (!currentBoard.flat().includes(0)) {
        commit(types.SET_GAMESTATE, 'game over')
        return
      }
      // find first 0
      let getIndex = currentBoard[payload].indexOf(0)
      if (getIndex < 0 && state.activePlayer === 2) {
        this.dispatch(types.GET_SERVER_MOVE)
        return
      }

      if (getIndex < 0) {
        return
      }

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
      commit(types.SET_WINNER, player)
    },
    [types.INIT_BOARD]({ commit }) {
      commit(types.INIT_BOARD)
    }
  },
  modules: {}
})
