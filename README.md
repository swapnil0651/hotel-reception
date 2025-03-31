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

### Pre-requisites for Running the App

Before running this app, ensure the following requirements are met:

### 1. **Docker and Docker Compose Installed**

This app requires **Docker** and **Docker Compose** to be installed on your system. Follow the steps below to install both:

---

### Docker Compose Installation

1. **Install Docker (if not already installed):**

   ```bash
   sudo apt update
   sudo apt install docker.io
   ```

2. **Download Docker Compose:**

   Download the latest version of Docker Compose:

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

3. **Apply executable permissions:**

   Make Docker Compose executable:

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Verify the installation:**

   Confirm that Docker Compose has been successfully installed by checking the version:

   ```bash
   docker-compose --version
   ```

---

### 2. **Docker Service Running**

Ensure that the Docker service is up and running. Start it if necessary:

```bash
sudo systemctl start docker
```

---

Once Docker and Docker Compose are installed and running, you're ready to proceed with running the app!

### Option 1: Using the provided Docker Compose file (Recommended)

1. Use the file named docker-compose.alt.yml with the following content:

```yaml
version: '3'
services:
  app:
    image: swapnil0651/hotel-reception:v3
    ports:
      - "3001:3000"
    depends_on:
      - mongo
    environment:
      - MONGODB_URI=mongodb://mongo:27017/hotel

  mongo:
    image: mongo:latest
    ports:
      - "27018:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

2. Run the application:
```bash
docker-compose -f docker-compose.alt.yml up
```

3. Access the application at [http://localhost:3001](http://localhost:3001)

### Option 2: Running the Docker image directly

If you already have MongoDB running:

1. Pull the image:
```bash
docker pull swapnil0651/hotel-reception:v3
```

2. Run the container:
 ```bash
docker run -p 3000:3000 -e MONGODB_URI=mongodb://your-mongodb-host:27017/hotel swapnil0651/hotel-reception:v3
```

   Replace `your-mongodb-host` with your MongoDB address.

## Manual Installation

### Prerequisites

- Node.js (v14+)
- MongoDB

### Setup

1. Clone the repository:
 ```bash
git clone https://github.com/swapnil0651/hotel-reception.git

cd hotel-reception
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running locally

4. Start the application:
```bash
npm start
```

   For development with auto-restart:
```bash
npm run dev
```

5. Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```plaintext
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
```

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `POST /api/customers` - Create a new customer (check-in)
- `PATCH /api/customers/:id` - Update customer information
- `DELETE /api/customers/:id` - Delete a customer (check-out)

## Troubleshooting

- If you encounter connection issues with MongoDB when running locally, make sure MongoDB is running and accessible.
- If you're using Docker and encounter port conflicts, you can modify the port mappings in the `docker-compose.yml` file.
- For Docker-related issues, check container logs using: `docker logs container_id`.

