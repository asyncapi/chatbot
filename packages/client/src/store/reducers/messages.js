export default function messageReducer(state, action) {
  switch (action.type) {
    case 'SENDING':
      return {
        ...state,
        sending: true,
      };
    case 'NEW_MESSAGE':
      return {
        ...state,
        sending: false,
        messages: [...state.messages, action.message],
      };
    case 'ERROR':
      return {
        ...state,
        sending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
