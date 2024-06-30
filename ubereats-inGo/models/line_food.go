package models

import "gorm.io/gorm"

type LineFood struct {
	gorm.Model
	Count        int
	Active       bool
	FoodID       uint
	RestaurantID uint
	OrderID      uint
}
