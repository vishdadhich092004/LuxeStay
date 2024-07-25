````markdown
# LuxeStay

LuxeStay is a modern hotel booking web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript.
The project aims to provide users with a seamless experience to book hotels, view detailed information, and manage their bookings.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/vishdadhich092004/LuxeStay.git
cd LuxeStay
```
````

### Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up environment variables:

        Create a `.env` file in the `backend` directory with the following content:

        ```env
        MONGO_URL

    JWT_SECRET_KEY  
    FRONTEND_URL
    ```

4.  Start the backend server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   VITE_API_BASE_URL=http://localhost:7000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

After completing the installation steps, you can access the application in your browser at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Technologies Used

- **Frontend:**

  - React
  - TypeScript
  - Vite
  - Auth0

- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - MongoDB

## Folder Structure

```plaintext
LuxeStay/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── README.md
└── package.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```

You can copy and paste this Markdown content into your `README.md` file.
```
