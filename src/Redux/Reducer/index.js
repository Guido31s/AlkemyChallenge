import { ADD_HERO, CLEAR_HERO, FIND_HERO, GET_HERO, REMOVE_HERO } from "../../components/Actions/heroNames"


const initialState = { team: [], search: []}

export default(state = initialState, action) => {
    switch(action.type) {
        case ADD_HERO: {
            return {
                ...state,
                team: state.team.concat(action.payload)
            }
        }
        case REMOVE_HERO: {
            return {
                ...state,
                team: state.team.filter((hero) => hero.id !== action.payload)
            }
        }
        case GET_HERO: {
            return {
                ...state,
                search: action.payload
            }
        }
        case FIND_HERO: {
            return {
                ...state,
                search: action.payload
            }
        }
        case CLEAR_HERO: {
            return {
                ...state,
                search: []
            }
        }
        default:
            return state
    }
}