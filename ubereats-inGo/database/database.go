package database

import (
	"log"
	"ubereats-inGo/models"
	"ubereats-inGo/seeds"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDatabase() error {
	db, err := gorm.Open(sqlite.Open("ubereats.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database %v", err)
	}

	if err := db.AutoMigrate(&models.Restaurant{}, models.Food{}, &models.LineFood{}, &models.Order{}); err != nil {
		log.Fatalf("migrate error %v", err)
	}

	if err := seeds.Seed(db); err != nil {
		log.Fatalf("seed error %v", err)
	}

	DB = db

	return nil
}
