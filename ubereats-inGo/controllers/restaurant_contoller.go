package controllers

import (
	"encoding/json"
	"net/http"
	"ubereats-inGo/database"
	"ubereats-inGo/models"
)

func GetRestaurants(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var restaurants []models.Restaurant
	if err := database.DB.Preload("Foods").Find(&restaurants).Error; err != nil {
		http.Error(w, err.Error(), 500)
	}

	w.WriteHeader(200)
	if err := json.NewEncoder(w).Encode(&restaurants); err != nil {
		http.Error(w, err.Error(), 500)
	}
}
