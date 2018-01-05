const ADD_ITEM_TO_ORDER = 'add_item_to_order'
export default (state, action) => {
  switch(action.type) {
  case 'INIT':
    return {
      events: []
    }
  case ADD_ITEM_TO_ORDER:
    return {...state, }
  }
}
