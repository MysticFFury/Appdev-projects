export type AdminCategory = {
  id: number;
  name: string;
  description?: string | null;
};

export type AdminProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string | null;
  image?: string | null;
  createdAt?: string;
  category?: { id: number; name: string } | null;
};

export type AdminOrder = {
  id: number;
  customerName: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
  itemCount?: number;
  items?: {
    id: number;
    productId?: number;
    productName?: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  placedBy?: { id: number; name: string; email: string } | null;
};

export type AdminStockMovement = {
  id: number;
  amount: number;
  createdAt?: string;
  product?: { id: number; name: string; quantity: number } | null;
  createdBy?: { id: number; name: string; email: string } | null;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt?: string;
};

export type AdminLog = {
  id: number;
  action: string;
  message: string;
  status?: string;
  userName?: string;
  userRole?: string;
  entity?: string;
  createdAt?: string;
};

export type AdminDashboard = {
  isAdmin: boolean;
  isStaff: boolean;
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number | null;
  recentSales: number;
  recentOrders: AdminOrder[];
  recentProducts: AdminProduct[];
  recentLogs: AdminLog[];
};
