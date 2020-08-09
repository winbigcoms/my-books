// @flow
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
export function useAuth(props) {
  const token = useSelector(state=> state.auth.token);
  const dispatch = useDispatch();

  if(token === null) {
    dispatch(push('/'));
  }
  return token;
};