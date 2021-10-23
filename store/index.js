import * as Colyseus from 'colyseus.js'

export const strict = false

export const state = () => ({
	client: new Colyseus.Client('ws://petitelaine.herokuapp.com'),
	username: '',
	avatar: '',
	code: null,
	room: null,
	roomState: null
})

export const getters = {
	getUsername: state => {
		return state.username
	},
	getAvatar: state => {
		return state.avatar
	},
	getRoom: state => {
		return state.room
	},
	getCode: state => {
		return state.code
	},
	getClient: state => {
		return state.client
	},
	getRoomState: state => {
		return state.roomState
	},
	isUsernameValid: state => {
		let valid = state.username.match(/^[a-zA-Z0-9]+([_ .-]?[a-zA-Z0-9])*$/)
		return valid !== null && state.username.length > 2
	},
}

export const mutations = {
	updateUsername: (state, username) => {
		state.username = username
	},
	updateAvatar: (state, avatar) => {
		state.avatar = avatar
	},
	updateRoom: (state, room) => {
		state.room = room
	},
	updateCode: (state, code) => {
		state.code = code
	},
	updateRoomState: (state, roomState) => {
		state.roomState = roomState
	}
}

