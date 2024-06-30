import { Fragment, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import { foodsActionTypes, initialState as foodsInitialState, foodsReducer } from "../reducers/foods";
import { REQUEST_STATE } from "../constants";

const Foods = () => {
  const params = useParams();

  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState)

  useEffect(() => {
    dispatch({type: foodsActionTypes.FETCHING})
    fetchFoods(params.restaurantId)
    .then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data
        }
      })
    })
  }, [])

  return (
    <Fragment>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
        <Fragment>
          <p>
            ロード中...
          </p>
        </Fragment>
        :
        foodsState.foodsList.map(food => 
          <div key={food.ID}>
            {food.Name}
          </div>
        )
      }
    </Fragment>
  );
};

export default Foods;
