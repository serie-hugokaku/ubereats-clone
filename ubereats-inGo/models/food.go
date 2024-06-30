package models

import "gorm.io/gorm"

type Food struct {
	gorm.Model
	Name         string
	Price        int
	Description  string
	RestaurantID uint
	LineFood     LineFood
}
