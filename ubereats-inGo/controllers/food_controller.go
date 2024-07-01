package controllers

import (
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func GetFoods(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "restaurantID")

	var restaurant *models.Restaurant
	if err := database.DB.Preload("Foods").First(&restaurant, "restaurant_id = ?", id).Error; err != nil {
		// いいエラーハンドリング募集
		http.Error(w, err.Error(), 500)
	}

	render.JSON(w, r, restaurant.Foods)
}
