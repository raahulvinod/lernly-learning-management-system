# Full Stack MERN Learning management system : React, MongoDB, Node, Express, Tailwind CSS and MaterialUI.

![learnly](https://github.com/raahulvinod/ecommerce-project/assets/120365941/64657be4-9638-4d28-be7c-c5a5c9c10e14)

This is a repository for a Full Stack Mern Learning management system with admin dashboard.
Learnly Education Web Application using Node.js Express and MongoDB for backend, with Redis for caching. Frontend built with Next.js, incorporating Tailwind CSS and Material UI for styling. Admin features include course management (add, edit, delete), order tracking, user management, FAQ customization, and hero customization. Frontend allows users to view course details, make purchases with Razorpay integration, leave reviews, and ask questions. Real-time notifications enabled with Socket.IO. Users can filter and search courses, receive email notifications for course details and question replies via Nodemailer. Integration with NextAuth for Google and GitHub authentication. Enhance your educational platform with Learnly

### Cloning the repository

```shell
git clone https://github.com/raahulvinod/learning-management-system.git
```

### Install packages

```shell
npm i
```

### Setup .env file

## client
```js
NEXT_PUBLIC_SERVER_URI=
NEXT_PUBLIC_SOCKET_SERVER_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

## server
```js
PORT=
ORIGIN=

NODE_ENV=development
DB_URL=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_SECRET_KEY=

REDIS_URL=

ACTIVATION_SECRET=

ACCESS_TOKEN=
REFRESH_TOKEN=

ACCESS_TOKEN_EXPIRE=
REFRESH_TOKEN_EXPIRE=

process.env.SMTP_HOST=smtp.gmail.com
SMTP_PORT=
SMTP_SERVICE=gmail
SMTP_MAIL=
SMTP_PASSWORD=

VDOCIPHER_API_SECRET=

STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```
