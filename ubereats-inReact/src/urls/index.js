const DEFAULT_API_LOCALHOST = "http://localhost:8080/api/v1";

export const restaurants = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foods = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/&{restaurantId}/foods`;
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
