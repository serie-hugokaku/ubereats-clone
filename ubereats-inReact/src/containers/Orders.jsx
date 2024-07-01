import { Fragment, useEffect, useReducer } from "react";
import { fetchLineFoods } from "../apis/line_food";
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from "../reducers/lineFoods";
import { postOrder } from "../apis/orders";

const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState)

  const postLineFoods = () => {
    dispatch({type: lineFoodsActionTypes.POSTING})
    postOrder({
      LineFoodIDs: state.lineFoodsSummary.lineFoodIDs
    }).then(()=>{
      dispatch({type: lineFoodsActionTypes.POST_SUCCESS})
      window.location.reload()
    })
  }

  useEffect(() => {
    dispatch({type: lineFoodsActionTypes.FETCHING})
    fetchLineFoods()
      .then((data) => 
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummay: data
          }
        })
      )
      .catch((e) => console.error(e));
  }, []);

  return <Fragment>注文画面</Fragment>;
};

export default Orders;