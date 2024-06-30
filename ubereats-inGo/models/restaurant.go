package models

import "gorm.io/gorm"

type Restaurant struct {
	gorm.Model
	Name         string
	Fee          int
	TimeRequired int
	Foods        []Food
}
