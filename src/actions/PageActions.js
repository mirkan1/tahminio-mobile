import { 
  PAGE_CHANGED,
} from './types';

export const pageChanged = (value) => {
  return {
    type: PAGE_CHANGED,
    payload: value.page
  };
};
