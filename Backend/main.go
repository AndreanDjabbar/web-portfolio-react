package main

import (
	"fmt"
	"net/http"
	"os"
	"github.com/AndreanDjabbar/Andrean-Portofolio/server/feedbackService"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file hanya jika tidak dijalankan di Railway
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		err := godotenv.Load()
		if err != nil {
			fmt.Println("Error loading .env file")
		}
	}

	// Ambil port dari environment variable (disediakan oleh Railway)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"  // Default fallback port jika tidak ada variabel PORT
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/feedback", feedbackService.FeedbackHandler)

	// Menampilkan pesan log dengan port yang tepat
	fmt.Println("Listening on port:", port)
	err := http.ListenAndServe("0.0.0.0:" + port, mux)
	if err != nil {
		panic(err)
	}
}
