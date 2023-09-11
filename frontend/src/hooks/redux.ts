import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const allActions = {};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(allActions, dispatch);
};
