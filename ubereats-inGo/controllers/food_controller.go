package controllers

import (
	"encoding/json"
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"

	"github.com/go-chi/chi/v5"
)

func GetFoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := chi.URLParam(r, "restaurantID")

	var restaurant *models.Restaurant
	if err := database.DB.Preload("Foods").First(&restaurant).Where("restaurant_id = ?", id).Error; err != nil {
		http.Error(w, err.Error(), 500)
	}

	w.WriteHeader(200)
	if err := json.NewEncoder(w).Encode(&restaurant.Foods); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
