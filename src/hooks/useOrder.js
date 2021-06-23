import { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'idle': {
      return {
        ...state,
        status: 'idle',
        error: null,
      };
    }
    case 'started': {
      return {
        ...state,
        status: 'pending',
      };
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        orders: [...state.orders, action.payload],
      };
    }
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action.type}`);
    }
  }
};

export const useOrder = (url) => {
  const [state, dispatch] = useReducer(orderReducer, {
    status: 'idle',
    orders: [],
    error: null,
  });
  const isSubmittedOrder =
    state.status !== 'idle' && state.status !== 'pending';

  const sendOrder = useCallback(
    async (orderData) => {
      dispatch({ type: 'started' });
      try {
        const { data } = await axios.post(url, orderData);
        dispatch({ type: 'success', payload: data });
      } catch (err) {
        const errorMsg = 'Something, went wrong, please make order again';
        dispatch({ type: 'error', payload: errorMsg });
      }
    },
    [url],
  );

  const setIdleOrder = useCallback(() => dispatch({ type: 'idle' }), []);

  useEffect(() => {
    if (isSubmittedOrder) {
      setTimeout(setIdleOrder, 3500);
    }
  }, [isSubmittedOrder, setIdleOrder]);

  return {
    sendOrder,
    setIdleOrder,
    orderError: state.error,
    isOrdering: state.status === 'pending',
    isSubmittedOrder,
  };
};
