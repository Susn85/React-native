import {useDispatch, useSelector} from 'react-redux';
import {RootState,AppDispatch} from './Store';

export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppDispatch>();