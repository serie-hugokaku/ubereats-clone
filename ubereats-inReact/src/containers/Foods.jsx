import { Fragment, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
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

  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

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
                onClickFoodWrapper={(food) => console.log(food)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
    </Fragment>
  );
};

export default Foods;
