# **MERN Todo App — Backend**

## This backend provides **user authentication** and **todo management** functionality using **Node.js, Express, MongoDB, JWT, and Zod validation**.

## **Tech Stack**

- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Zod
- **Hashing:** Bcrypt

---

## **Folder Structure**

```
Backend/
├── controller/
│   ├── user.controller.js
│   └── todo.controller.js
├── jwt/
│   └── token.js
├── middleware/
│   └── authorize.js
├── model/
│   ├── user.model.js
│   └── todo.model.js
├── routes/
│   ├── user.route.js
│   └── todo.route.js
├── .env
└── index.js
```

---

## **Authentication APIs**

### **1. Register User**

**Endpoint:**
`POST /api/user/signup`

**Description:**
Register a new user and generate a JWT token.

**Request Body:**

```json
{
  "username": "Shradha",
  "email": "shradha@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "newUser": {
    "_id": "6704c31f1c85a6e3d09c2c12",
    "username": "Shradha",
    "email": "shradha@example.com"
  },
  "token": "<jwt_token>"
}
```

**Validation Rules:**

- `email`: Must be a valid email
- `username`: Min 3, Max 20 characters
- `password`: Min 6, Max 20 characters

**Status Codes:**

- `201` → User registered successfully
- `400` → Validation error or user already exists
- `500` → Server error

---

### **2. Login User**

**Endpoint:**
`POST /api/user/login`

**Description:**
Login an existing user using email and password.

**Request Body:**

```json
{
  "email": "shradha@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "6704c31f1c85a6e3d09c2c12",
    "username": "Shradha",
    "email": "shradha@example.com"
  },
  "token": "<jwt_token>"
}
```

**Status Codes:**

- `200` → Login successful
- `400` → Invalid credentials
- `500` → Server error

---

### 🚪 **3. Logout User**

**Endpoint:**
`GET /api/user/logout`

**Description:**
Logs the user out by clearing the JWT cookie.

**Response:**

```json
{
  "message": "User logged out successfully"
}
```

**Status Codes:**

- `200` → Logout successful
- `500` → Error logging out

---

## 🧾 **Todo APIs**

> All Todo routes are protected by the `authenticate` middleware.

### **1. Create Todo**

**Endpoint:**
`POST /api/todo/create`

**Headers:**

```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Request Body:**

```json
{
  "text": "Learn React",
  "completed": false
}
```

**Response:**

```json
{
  "message": "Todo Created Successfully",
  "newTodo": {
    "_id": "6704c33f1c85a6e3d09c2c44",
    "text": "Learn React",
    "completed": false,
    "user": "6704c31f1c85a6e3d09c2c12"
  }
}
```

---

### **2. Get All Todos**

**Endpoint:**
`GET /api/todo/fetch`

**Headers:**

```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Response:**

```json
{
  "message": "Todo fetched Successfully",
  "todos": [
    {
      "_id": "6704c33f1c85a6e3d09c2c44",
      "text": "Learn React",
      "completed": false
    }
  ]
}
```

---

### **3. Update Todo**

**Endpoint:**
`PUT /api/todo/update/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Request Body:**

```json
{
  "text": "Learn React and Redux",
  "completed": true
}
```

**Response:**

```json
{
  "message": "Todo updated successfully",
  "todo": {
    "_id": "6704c33f1c85a6e3d09c2c44",
    "text": "Learn React and Redux",
    "completed": true
  }
}
```

---

### **4. Delete Todo**

**Endpoint:**
`DELETE /api/todo/delete/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Response:**

```json
{
  "message": "Todo deleted successfully"
}
```

---

## ⚙️ **Middleware**

### `authenticate`

- Extracts token from `Authorization` header (`Bearer <token>`).
- Verifies token using `JWT_SECRET_KEY`.
- Adds `req.user` with user data.
- If invalid → returns `401 Unauthorized`.

---

## **JWT Token Utility**

### `generateTokenAndSaveInCookies(userId, res)`

- Creates a JWT signed with the user’s ID.
- Saves it in an HTTP-only cookie named `jwt`.
- Token expires in **10 days**.

---

## **Models**

### **User Model**

```js
{
  username: String,  // required
  email: String,     // required, unique
  password: String,  // hashed, select: false
  token: String
}
```

### **Todo Model**

```js
{
  text: String,        // required
  completed: Boolean,  // required
  user: ObjectId,      // reference to User
}
```

---

## **Example Authorization Header**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

### Clone the Repository

### **GitHub: https://github.com/ShradhaSuman7-eng/Backend.git**

---
