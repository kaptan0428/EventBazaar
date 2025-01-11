import { RootState } from '../../app/store'


export const selectEmail = (state: RootState) => state.user.email;

