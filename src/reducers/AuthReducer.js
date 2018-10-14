import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, error: action.payload.data.username }; // After logged in with the help of second argument clears INITIAL_STATE 
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false }; 
    default:
      return state; 
  }
};


// const obj = {
//   foo: {
//     a: 1,
//     b: 2,
//     c: 3
//   }
// };
// console.log("original", obj.foo);
// // Creates a NEW object and assigns it to `obj.foo`
// obj.foo = {...obj.foo, a: "updated"};
// console.log("updated", obj.foo);

{/* <Modal {...this.props} title='Modal heading' animation={false}></Modal>
Can be writtel like this as well
<Modal a={this.props.a} b={this.props.b} title='Modal heading' animation={false}></Modal> */}
