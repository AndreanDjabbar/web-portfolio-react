package feedbackService

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
)

type FeedbackForm struct {
    Name    string `json:"name"`
    Email   string `json:"email"`
    Message string `json:"message"`
}


func enableCORS(w http.ResponseWriter) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func sendEmail(feedback FeedbackForm) {
	from := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	to := os.Getenv("EMAIL_TARGET")
	
	if from == "" || password == "" || to == "" {
		fmt.Println("Environment variables not set properly")
		return
	}

	subject := "New feedback from your website"
	body := fmt.Sprintf(`
    <html>
    <body>
        <h2>You have received a new feedback!</h2>
        <table style="border: 1px solid #ddd; width: 100%%; border-collapse: collapse;">
            <tr>
                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Name</th>
                <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
            </tr>
            <tr>
                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Email</th>
                <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
            </tr>
            <tr>
                <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Message</th>
                <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
            </tr>
        </table>
        <p style="font-size: 12px; color: #888;">This message was sent from your website's feedback form.</p>
    </body>
    </html>
    `, feedback.Name, feedback.Email, feedback.Message)

    message := []byte(
        "From: " + from + "\r\n" +
        "To: " + to + "\r\n" +
        "Subject: " + subject + "\r\n" +
        "MIME-Version: 1.0\r\n" +
        "Content-Type: text/html; charset=\"UTF-8\"\r\n\r\n" +
        body,
    )

	smtpServer := "smtp.gmail.com"
	auth := smtp.PlainAuth("", from, password, smtpServer)

	err := smtp.SendMail(smtpServer+":587", auth, from, []string{to}, message)
	if err != nil {
		fmt.Println("Failed to send email:", err)
		return
	}
}

func FeedbackHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodOptions {
        enableCORS(w)
        return
    }

    enableCORS(w)

    if r.Method == http.MethodPost {
        var feedback FeedbackForm
        err := json.NewDecoder(r.Body).Decode(&feedback)
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        go sendEmail(feedback)
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Message sent"))
        return
    }

    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}

