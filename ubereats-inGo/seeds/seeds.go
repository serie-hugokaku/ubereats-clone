package seeds

import (
	"ubereats-inGo/models"

	"gorm.io/gorm"
)

func Seed(db *gorm.DB) error {
	restaurants := []models.Restaurant{
		{
			Name:         "testレストラン_1",
			Fee:          100,
			TimeRequired: 10,
			Foods: []models.Food{
				{RestaurantID: 1, Name: "フード_1", Price: 500, Description: "フード_1の説明"},
				{RestaurantID: 1, Name: "フード_2", Price: 500, Description: "フード_2の説明"},
				{RestaurantID: 1, Name: "フード_3", Price: 500, Description: "フード_3の説明"},
				{RestaurantID: 1, Name: "フード_4", Price: 500, Description: "フード_4の説明"},
				{RestaurantID: 1, Name: "フード_5", Price: 500, Description: "フード_5の説明"},
				{RestaurantID: 1, Name: "フード_6", Price: 500, Description: "フード_6の説明"},
			},
		},
		{
			Name:         "testレストラン_2",
			Fee:          100,
			TimeRequired: 10,
			Foods: []models.Food{
				{RestaurantID: 2, Name: "フード_1", Price: 500, Description: "フード_1の説明"},
				{RestaurantID: 2, Name: "フード_2", Price: 500, Description: "フード_2の説明"},
				{RestaurantID: 2, Name: "フード_3", Price: 500, Description: "フード_3の説明"},
				{RestaurantID: 2, Name: "フード_4", Price: 500, Description: "フード_4の説明"},
				{RestaurantID: 2, Name: "フード_5", Price: 500, Description: "フード_5の説明"},
				{RestaurantID: 2, Name: "フード_6", Price: 500, Description: "フード_6の説明"},
			},
		},
		{
			Name:         "testレストラン_3",
			Fee:          100,
			TimeRequired: 10,
			Foods: []models.Food{
				{RestaurantID: 3, Name: "フード_1", Price: 500, Description: "フード_1の説明"},
				{RestaurantID: 3, Name: "フード_2", Price: 500, Description: "フード_2の説明"},
				{RestaurantID: 3, Name: "フード_3", Price: 500, Description: "フード_3の説明"},
				{RestaurantID: 3, Name: "フード_4", Price: 500, Description: "フード_4の説明"},
				{RestaurantID: 3, Name: "フード_5", Price: 500, Description: "フード_5の説明"},
				{RestaurantID: 3, Name: "フード_6", Price: 500, Description: "フード_6の説明"},
			},
		},
	}

	if err := db.Create(&restaurants).Error; err != nil {
		return err
	}

	return nil
}
