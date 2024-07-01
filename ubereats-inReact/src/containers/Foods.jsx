import { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchFoods } from "../apis/foods";
import {
  foodsActionTypes,
  initialState as foodsInitialState,
  foodsReducer,
} from "../reducers/foods";
import { REQUEST_STATE } from "../constants";
import styled from "styled-components";
import { LocalMallIcon } from "../components/icons";
import { COLORS } from "../style_constants";
import { Skeleton } from "@mui/material";
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";
import { FoodWrapper } from "../components/FoodWrapper";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";
import { postLineFoods, replaceLineFoods } from "../apis/line_food";
import { HTTP_STATUS_CODE } from "../constants";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-arount;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const Foods = () => {
  const params = useParams();
  const navigete = useNavigate();

  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: "",
    newRestaurantName: "",
  };
  const [state, setState] = useState(initialState);

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood.ID,
      count: state.selectedFoodCount,
    }).then(() => {
      if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
        setState({
          ...state,
          isOpenOrderDialog: false,
          isOpenNewOrderDialog: true,
          existingRestaurantName: e.response.data.ExistingRestaurant,
          newRestaurantName: e.response.data.NewRestaurant,
        });
      } else {
        throw e;
      }
    });
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.ID,
      count: state.selectedFoodCount,
    }).then(() => navigete("/orders"));
  };

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(params.restaurantId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data,
        },
      });
    });
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>

      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.ID}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          onClickOrder={() => submitOrder()}
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      )}
    </Fragment>
  );
};

export default Foods;
