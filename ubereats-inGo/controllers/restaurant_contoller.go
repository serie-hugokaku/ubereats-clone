package controllers

import (
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"

	"github.com/go-chi/render"
)

func GetRestaurants(w http.ResponseWriter, r *http.Request) {
	var restaurants []models.Restaurant
	if err := database.DB.Preload("Foods").Find(&restaurants).Error; err != nil {
		// いいエラーハンドリング募集
		http.Error(w, err.Error(), 500)
	}

	render.JSON(w, r, restaurants)
}
