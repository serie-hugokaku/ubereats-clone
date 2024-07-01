import { Fragment, useEffect, useReducer } from "react";
import { fetchLineFoods } from "../apis/line_food";
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from "../reducers/lineFoods";
import { postOrder } from "../apis/orders";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { OrderDetailItems } from "../components/OrderDetailItems";
import {OrderButton} from "../components/buttons/OrderButton"
import { CircularProgress } from "@mui/material";
import MainLogo from "../images/logo.png"
import { REQUEST_STATE } from "../constants";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`

const MainLogoImage = styled.img`
  height: 90px;
`

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`

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

  const orderButtonLabel = () => {
    switch(state.postState) {
      case REQUEST_STATE.LOADING:
        return "注文中..."
      case REQUEST_STATE.OK:
        return "注文が完了しました!"
      default:
        return "注文を確定する"
    }
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

  return <Fragment>
    <HeaderWrapper>
      <Link to="restaurants">
        <MainLogoImage src={MainLogo} alt="main logo" />
      </Link>
    </HeaderWrapper>
    <OrderListWrapper>
      <div>
        <OrderItemWrapper>
          {
            state.fetchState === REQUEST_STATE.LOADING ?
            <CircularProgress />
            :
            state.lineFoodsSummary &&
            <OrderDetailItems 
              restaurantFee={state.lineFoodsSummary.restaurant.fee}
              restaurantName={state.lineFoodsSummary.restaurant.name}
              restaurantId={state.lineFoodsSummary.restaurant.id}
              timeRequired={state.lineFoodsSummary.restaurant.timeRequired}
              foodCount={state.lineFoodsSummary.count}
              price={state.lineFoodsSummay.amount}
            />
          }
        </OrderItemWrapper>
      </div>
      {
        state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
        <OrderButton onClick={() => postLineFoods()} disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}>
          {orderButtonLabel()}

        </OrderButton>
      }
      {
        state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
        <p>注文予定の商品はありません。</p>
      }
    </OrderListWrapper>
  </Fragment>;
};

export default Orders;