AUTH
POST /api/auth/register ✅
GET /api/auth/verify-email ✅
POST /api/auth/resend-verification ✅
POST /api/auth/login ✅
GET /api/auth/me ✅
POST /api/auth/logout 
POST /api/auth/forgot-password ✅
POST /api/auth/reset-password ✅

USER / CATALOG
GET /api/pizzas ✅
GET /api/ingredients ✅

ORDERS
POST /api/orders ✅
GET /api/orders ✅
GET /api/orders/:id ✅

PAYMENTS
POST /api/payments/create
POST /api/payments/verify

ADMIN
POST /api/admin/login
GET /api/admin/inventory
PATCH /api/admin/inventory/:id
GET /api/admin/orders
PATCH /api/admin/orders/:id/status

INTERNAL
node-cron → low-stock email

REALTIME
Socket.IO → order status updates
