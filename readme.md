
---

# **Airline Ticket Booking Service**  

## **Overview**  
The **Airline Ticket Booking Service** is responsible for handling flight bookings, updating seat availability, and managing booking records. It integrates with the **Flight Service** for flight details and seat management and uses **RabbitMQ** for **message queuing**, enabling seamless **email notifications** and event-driven processing.  

---

## **Key Features**  
✔ **Flight Booking** – Handles user bookings based on seat availability.  
✔ **Seat Management** – Ensures that bookings do not exceed available seats.  
✔ **Price Calculation** – Computes total cost based on ticket prices.  
✔ **Booking Updates** – Allows updating and modifying booking details.  
✔ **Message Queue Integration** – Uses **RabbitMQ** to publish messages for email notifications.  

---

## **Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL (via Sequelize ORM)  
- **HTTP Requests:** Axios  
- **Message Queue:** RabbitMQ (via **amqplib**)  
- **Validation & Error Handling:** Custom **ServiceError** class  

---

## **Database Schema**  

### **Bookings Table**  
Stores details of user bookings.  

| Field      | Type          | Null | Key  | Default | Extra          |
|-----------|--------------|------|------|---------|----------------|
| id        | int          | NO   | PRI  | NULL    | auto_increment |
| userId    | int          | NO   |      | NULL    |                |
| flightId  | int          | NO   |      | NULL    |                |
| noOfSeats | int          | NO   |      | NULL    |                |
| totalCost | float        | NO   |      | NULL    |                |
| status    | varchar(255) | NO   |      | Pending |                |
| createdAt | datetime     | NO   |      | NULL    |                |
| updatedAt | datetime     | NO   |      | NULL    |                |

---

## **Service Implementation**  

### **1. Booking Logic**  
- Fetch flight details from the **Flight Service**.  
- Validate seat availability before booking.  
- Calculate **total cost** based on flight price and seats booked.  
- Create a **new booking record** in the database.  
- Update **remaining seat count** in the Flight Service.  
- Publish **notification message** to RabbitMQ for email alerts.  
- Mark the booking as **"Completed"** after successful confirmation.  

---

## **API Endpoints**  

| Method | Endpoint           | Description                                      |
|--------|--------------------|--------------------------------------------------|
| POST   | `/bookings`        | Creates a new booking.                          |
| PATCH  | `/bookings/:id`    | Updates an existing booking.                    |
| POST   | `/publish`         | Sends a message to RabbitMQ for notification.   |

---

## **Message Queue (RabbitMQ) Integration**  
✔ Uses **RabbitMQ** to publish booking confirmations.  
✔ Messages are structured for email notifications.  
✔ Can be subscribed to by email services for automated alerts.  

---

## **Error Handling**  
✔ **ServiceError Class** – Handles errors with proper HTTP status codes.  
✔ **Try-Catch Blocks** – Ensures errors are properly logged and handled.  

---

## **Conclusion**  
The **Airline Ticket Booking Service** ensures **efficient ticket booking**, **seat management**, and **notification handling** using **RabbitMQ**. The service is designed to be **scalable**, **reliable**, and **event-driven**, making it suitable for real-world airline booking systems.  

🚀 **Ready to deploy with RabbitMQ integration!** 🚀  

---