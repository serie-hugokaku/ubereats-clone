package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	TotalPrice   int
	RestaurantID uint
	LineFoods    LineFood
}
