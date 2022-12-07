import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store'

export const useUiStore = () => {

  const dispatch = useDispatch();

  const {
    isDateModalOpen
  } = useSelector(state => state.ui);

  const openDateModal = () => {
    dispatch( onOpenDateModal() );
  };

  const closeDateModal = () => {
    dispatch( onCloseDateModal() );
  }

  const togleDateModal = () => {
    (isDateModalOpen)
    ? openDateModal()
    : closeDateModal();
  }

  return {
    //* propiedades
    isDateModalOpen,
    //* Metodos
    openDateModal,
    closeDateModal,
    togleDateModal,

  }
}
