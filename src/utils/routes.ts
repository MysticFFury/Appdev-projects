interface Routes {
  CUSTOMER_LANDING: string;
  CUSTOMER_PRODUCTS: string;
  CUSTOMER_PC_BUILDER: string;
  CUSTOMER_SERVICES: string;
  CUSTOMER_ABOUT: string;
  CUSTOMER_CONTACT: string;
  CUSTOMER_CART: string;
  LOGIN: string;
  REGISTER: string;
  HOME: string;
  PROFILE: string;
  ADMIN_DASHBOARD: string;
  ADMIN_PRODUCTS: string;
  ADMIN_PRODUCT_FORM: string;
  ADMIN_CATEGORIES: string;
  ADMIN_CATEGORY_FORM: string;
  ADMIN_ORDERS: string;
  ADMIN_ORDER_DETAIL: string;
  ADMIN_STOCK: string;
  ADMIN_STOCK_NEW: string;
  ADMIN_USERS: string;
  ADMIN_USER_FORM: string;
  ADMIN_LOGS: string;
}

const routes: Routes = {
  CUSTOMER_LANDING: 'CustomerLanding',
  CUSTOMER_PRODUCTS: 'CustomerProducts',
  CUSTOMER_PC_BUILDER: 'CustomerPcBuilder',
  CUSTOMER_SERVICES: 'CustomerServices',
  CUSTOMER_ABOUT: 'CustomerAbout',
  CUSTOMER_CONTACT: 'CustomerContact',
  CUSTOMER_CART: 'CustomerCart',

  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'AdminDashboard',
  PROFILE: 'Profile',
  ADMIN_DASHBOARD: 'AdminDashboard',
  ADMIN_PRODUCTS: 'AdminProducts',
  ADMIN_PRODUCT_FORM: 'AdminProductForm',
  ADMIN_CATEGORIES: 'AdminCategories',
  ADMIN_CATEGORY_FORM: 'AdminCategoryForm',
  ADMIN_ORDERS: 'AdminOrders',
  ADMIN_ORDER_DETAIL: 'AdminOrderDetail',
  ADMIN_STOCK: 'AdminStock',
  ADMIN_STOCK_NEW: 'AdminStockNew',
  ADMIN_USERS: 'AdminUsers',
  ADMIN_USER_FORM: 'AdminUserForm',
  ADMIN_LOGS: 'AdminLogs',
};

export default routes;
