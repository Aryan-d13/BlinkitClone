export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  options: CustomizationOption[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName: string;
  image: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  calories: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  customizationGroups?: CustomizationGroup[];
}

export interface SelectedCustomization {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  unitPrice: number;
  totalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  description?: string;
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'HQ' | 'Other';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  avatar: string;
  role: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tip: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  totalPaid: number;
  status: string;
  address: Address;
  paymentMethod: string;
  deliverySlot: string;
  driverName?: string;
  driverPhone?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
