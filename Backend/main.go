package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/AndreanDjabbar/web-portfolio-react/Backend/feedbackService"
	"github.com/joho/godotenv"
)

func main() {
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		err := godotenv.Load()
		if err != nil {
			fmt.Println("Error loading .env file")
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"  
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/feedback", feedbackService.FeedbackHandler)

	fmt.Println("Listening on port:", port)
	err := http.ListenAndServe("0.0.0.0:" + port, mux)
	if err != nil {
		panic(err)
	}
}
