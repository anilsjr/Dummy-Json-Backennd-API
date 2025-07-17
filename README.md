# Dummy JSON API System

A comprehensive RESTful API system built with Node.js, Express, and MySQL that provides dummy data for various entities including users, products, recipes, posts, comments, todos, quotes, and carts. Perfect for testing, prototyping, and development purposes.

## 🚀 Features

- **RESTful API Design** - Complete CRUD operations for all entities
- **Database Integration** - MySQL with Sequelize ORM
- **Pagination & Filtering** - Advanced query capabilities
- **Search Functionality** - Search across multiple entities
- **Rate Limiting** - Built-in protection against abuse
- **Error Handling** - Comprehensive error management
- **Modular Architecture** - Clean, maintainable code structure

## 📋 Table of Contents

- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Available Endpoints](#available-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/anilsjr/Dummy-Json-Backennd-API.git
   cd dummy-json-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password

   # Server Configuration
   PORT=3000
   API_BASE_URL=api

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```

4. **Set up the database**

   ```bash
   # Import the provided SQL schema
   mysql -u username -p database_name < Dummy_API_Schema.mysql.sql
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The server will start running on `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

| Variable         | Description         | Default   |
| ---------------- | ------------------- | --------- |
| `DB_HOST`        | MySQL host          | localhost |
| `DB_PORT`        | MySQL port          | 3306      |
| `DB_NAME`        | Database name       | -         |
| `DB_USER`        | Database username   | -         |
| `DB_PASSWORD`    | Database password   | -         |
| `PORT`           | Server port         | 3000      |
| `API_BASE_URL`   | API base URL        | api       |

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Common Query Parameters

| Parameter | Type    | Description                      | Default |
| --------- | ------- | -------------------------------- | ------- |
| `limit`   | integer | Number of items to return        | 20      |
| `skip`    | integer | Number of items to skip          | 0       |
| `sortBy`  | string  | Field to sort by                 | id      |
| `order`   | string  | Sort order (ASC/DESC)            | ASC     |
| `search`  | string  | Comma-separated fields to return | all     |

## 🎯 Available Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Users

- `GET /api/users` - Get all users
- `GET /api/users/search` - Search users by name
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id` - Add new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/carts` - Get user's carts
- `GET /api/users/:id/posts` - Get user's posts
- `GET /api/users/:id/todos` - Get user's todos

### Products

- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products by title
- `GET /api/products/tags` - Get all product tags
- `GET /api/products/tag/:tagName` - Get products by tag
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/search` - Search recipes by name
- `GET /api/recipes/meal-type/:mealType` - Get recipes by meal type
- `GET /api/recipes/tags` - Get all recipe tags
- `GET /api/recipes/tag/:tagName` - Get recipes by tag
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Add new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/search` - Search posts
- `GET /api/posts/tags` - Get all post tags
- `GET /api/posts/tag/:tagName` - Get posts by tag
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Add new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/comments` - Get all comments
- `GET /api/comments/post/:id` - Get comments by post ID
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Add new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Carts

- `GET /api/carts` - Get all carts
- `GET /api/carts/:id` - Get cart by ID
- `GET /api/carts/user/:id` - Get carts by user ID
- `POST /api/carts/add` - Add new cart
- `PUT /api/carts/update/:id` - Update cart
- `DELETE /api/carts/delete/:id` - Delete cart

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Add new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Quotes

- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get quote by ID
- `POST /api/quotes` - Add new quote
- `PUT /api/quotes/:id` - Update quote
- `DELETE /api/quotes/:id` - Delete quote

### HTTP Status Codes

- `GET /api/http` - Get HTTP status codes and messages

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. **Login to get a token:**

   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "your_username", "password": "your_password"}'
   ```

2. **Use the token in subsequent requests:**
   ```bash
   curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/auth/me
   ```

## 💾 Database Schema

The system uses the following main entities:

- **Users** - User accounts and profiles
- **Products** - Product catalog with categories and tags
- **Recipes** - Cooking recipes with ingredients and instructions
- **Posts** - Blog posts and articles
- **Comments** - Comments on posts
- **Carts** - Shopping carts and items
- **Todos** - Task management
- **Quotes** - Inspirational quotes
- **Reviews** - Product/recipe reviews

## 📖 Usage Examples

### Get all products with pagination

```bash
curl "http://localhost:3000/api/products?limit=10&skip=0&sortBy=title&order=ASC"
```

### Search products by title

```bash
curl "http://localhost:3000/api/products/search?q=laptop"
```

### Get recipes by meal type

```bash
curl "http://localhost:3000/api/recipes/meal-type/breakfast"
```

### Add a new product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics"
  }'
```

## 🏗️ Project Structure

```
dummy-json-api/
├── app.js                 # Main application file
├── package.json          # Dependencies and scripts
├── config/
│   └── dbConfig.js       # Database configuration
├── controller/           # Route controllers
├── middleware/          # Custom middleware
├── models/              # Sequelize models
├── routes/              # Route definitions
├── utility/             # Utility functions
├── validators/          # Input validation
└── import-data/         # Data import scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔧 Development

### Running in Development Mode

```bash
# Install nodemon for development
npm install -g nodemon

# Run with auto-reload
nodemon app.js
```

### Database Migration

```bash
# Import sample data
mysql -u username -p database_name < dummyjsondata_clean.sql
```

---

**Made with ❤️ by [Anil Vishwakarma](https://github.com/anilsjr)**
