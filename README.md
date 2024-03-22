# Full Stack MERN Learning management system : React, MongoDB, Node, Express, Tailwind CSS and MaterialUI.

![learnly](https://github.com/raahulvinod/ecommerce-project/assets/120365941/64657be4-9638-4d28-be7c-c5a5c9c10e14)

This is a repository for a Full Stack Mern Learning management system with admin dashboard.
Learnly Education Web Application Developed using TypeScript, harnessing the power of Node.js Express and MongoDB for robust backend operations, with Redis for efficient caching. The frontend, crafted with Next.js, combines the flexibility of Tailwind CSS and the elegance of Material UI for seamless user experiences.

Admin capabilities extend to comprehensive course management functionalities including addition, editing, and deletion, along with streamlined order tracking, user administration, FAQ customization, and dynamic hero customization.

On the frontend, users can delve into detailed course insights, seamlessly purchase courses with Razorpay integration, contribute to the platform's community by leaving reviews and posing questions.

Stay connected in real-time with Socket.IO's notification system, providing admins with immediate updates.

Enhanced functionality includes course filtering and search capabilities, alongside email notifications leveraging Nodemailer for course details and question replies.

Security is paramount, integrating NextAuth for streamlined Google and GitHub authentication, bolstered by TypeScript for type-safe development practices.
Incorporating cutting-edge features, Learnly enables secure video uploads utilizing Videocipher for Video DRM Encryption, ensuring content protection.Video thumbnail uploads are facilitated through seamless integration with Cloudinary, guaranteeing visually engaging course previews.

Empower your educational platform with Learnly's comprehensive feature set, combining security, usability, and innovation.

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
