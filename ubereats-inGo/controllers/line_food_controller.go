package controllers

import (
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"
)

func Create(w http.ResponseWriter, r *http.Request) {
	// 他店舗のlinefoodがactiveかどうか
}

func setFood(foodID uint) (*models.Food, error) {
	var food *models.Food
	if err := database.DB.First(&food).Where("id = ?").Error; err != nil {
		return nil, err
	}

	return food, nil
}
