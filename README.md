# Hotel Reception System

A web-based hotel reception system for managing customer check-ins and check-outs.

## Features

- Customer check-in with personal details
- View all checked-in customers
- Search functionality for customers
- Customer check-out
- View detailed customer information

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Containerization: Docker, Docker Compose

## Running with Docker

### Option 1: Using the provided Docker Compose file (Recommended)

1. Create a file named docker-compose.yml with the following content:

version: '3'
services:
  app:
    image: swapnil0651/hotel-reception:v2
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGODB_URI=mongodb://mongo:27017/hotel

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:

2. Run the application:
   docker-compose up

3. Access the application at http://localhost:3000

### Option 2: Running the Docker image directly

If you already have MongoDB running:

1. Pull the image:
   docker pull swapnil0651/hotel-reception:v2

2. Run the container:
   docker run -p 3000:3000 -e MONGODB_URI=mongodb://your-mongodb-host:27017/hotel swapnil0651/hotel-reception:v2

   Replace your-mongodb-host with your MongoDB address.

## Manual Installation

### Prerequisites

- Node.js (v14+)
- MongoDB

### Setup

1. Clone the repository:
   git clone https://github.com/swapnil0651/hotel-reception.git
   cd hotel-reception

2. Install dependencies:
   npm install

3. Make sure MongoDB is running locally

4. Start the application:
   npm start

   For development with auto-restart:
   npm run dev

5. Access the application at http://localhost:3000

## Project Structure

hotel-reception/
├── public/                 # Static files
│   ├── index.html          # Check-in page
│   ├── customers.html      # Customers list page
│   ├── scripts.js          # Frontend JavaScript
│   └── styles.css          # CSS styles
├── src/
│   ├── models/             # Database models
│   │   └── Customer.js     # Customer schema
│   └── routes/             # API routes
│       └── customerRoutes.js # Customer API endpoints
├── server.js               # Express server setup
├── package.json            # Project dependencies
├── Dockerfile              # Docker configuration
└── docker-compose.yml      # Docker Compose configuration

## API Endpoints

- GET /api/customers - Get all customers
- GET /api/customers/:id - Get a specific customer
- POST /api/customers - Create a new customer (check-in)
- PATCH /api/customers/:id - Update customer information
- DELETE /api/customers/:id - Delete a customer (check-out)

## Troubleshooting

- If you encounter connection issues with MongoDB when running locally, make sure MongoDB is running and accessible.
- If you're using Docker and encounter port conflicts, you can modify the port mappings in the docker-compose.yml file.
- For Docker-related issues, check container logs using: docker logs container_id

