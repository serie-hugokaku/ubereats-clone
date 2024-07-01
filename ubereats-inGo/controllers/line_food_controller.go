package controllers

import (
	"encoding/json"
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"

	"github.com/go-chi/render"
)

var orderedFood *models.Food

type LineFoodRequest struct {
	FoodID uint `json:"foodID"`
}

type LineFoodResponse struct {
	ExistingRestaurant string
	NewRestaurant      string
}

// 仮注文を作成する
func CreateLineFoods(w http.ResponseWriter, r *http.Request) {
	var req LineFoodRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		// いいエラーハンドリング募集
		http.Error(w, err.Error(), 400)
		return
	}

	if err := setFood(req.FoodID); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	// 仮注文がactiveで他の店舗のIDを持つとき
	var lineFood *models.LineFood
	database.DB.Find(&lineFood).
		Where("active = true").
		Not("restaurant_id = ?", req.FoodID)

	if lineFood.ID != 0 {
		var res LineFoodResponse
		res.ExistingRestaurant = lineFood.Restaurant.Name
		res.NewRestaurant = orderedFood.Restaurant.Name

		w.WriteHeader(http.StatusNotAcceptable)
		render.JSON(w, r, res)
		return
	}

	// database.DB.Create()
	render.JSON(w, r, "")
}

// 仮注文一覧
func GetLineFoods(w http.ResponseWriter, r *http.Request) {
}

// 別の仮注文を作成する
func ReplaceRestaurant(w http.ResponseWriter, r *http.Request) {
}

func setFood(foodID uint) error {
	var food *models.Food
	err := database.DB.Joins("LineFood").First(&food, "foods.id = ?", foodID).Error
	if err != nil {
		return err
	}

	orderedFood = food
	return nil
}

func setLineFood(food *models.Food) {
	if food.LineFood.ID != 0 {

	}
}
