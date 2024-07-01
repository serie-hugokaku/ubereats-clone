package main

import (
	"log"
	"net/http"
	"os"
	"ubereats-inGo/controllers"
	"ubereats-inGo/database"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	err := database.NewDatabase()
	if err != nil {
		log.Fatalf("failed to connect database %v", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
	}))

	r.Get("/api/v1/restaurants", controllers.GetRestaurants)
	r.Get("/api/v1/restaurants/{restaurantID}/foods", controllers.GetFoods)
	r.Post("/api/v1/line_foods", controllers.CreateLineFoods)

	addr := os.Getenv("ADDR")
	if addr == "" {
		addr = ":8080"
	}

	log.Printf("listen: %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("!! %+v", err)
	}
}
