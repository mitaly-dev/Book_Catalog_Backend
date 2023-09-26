
## Book Catalog Backend 
## Live Link - https://book-catalog-ochre-three.vercel.app/

### Application Routes:
### User
- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/545b5d1c-250c-4987-8ac9-959f2816f047 (Single GET) 
- api/v1/users/545b5d1c-250c-4987-8ac9-959f2816f047 (PATCH)
- api/v1/users/545b5d1c-250c-4987-8ac9-959f2816f047 (DELETE) 
- api/v1/profile (GET)

### Category
- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/1bf36383-23a3-45c5-a636-3005285270cf (Single GET) 
- api/v1/categories/1bf36383-23a3-45c5-a636-3005285270cf (PATCH)
- api/v1/categories/1bf36383-23a3-45c5-a636-3005285270cf (DELETE) 

### Books
- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders
- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
