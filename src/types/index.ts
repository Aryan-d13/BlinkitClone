export type DietType = 'veg' | 'non-veg' | 'vegan';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  defaultSelected?: boolean;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  options: CustomizationOption[];
}

export interface NutritionInfo {
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  material?: string;
  capacity?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
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
  dietType: DietType;
  isPopular?: boolean;
  isFeatured?: boolean;
  nutrition?: NutritionInfo;
  customizationGroups?: CustomizationGroup[];
  reviews?: Review[];
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
  specialInstructions?: string;
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
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  deliveryNotes?: string;
}

export type PaymentType = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';

export interface PaymentOption {
  id: string;
  type: PaymentType;
  name: string;
  details: string;
  icon: string;
  badge?: string;
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

export type OrderStatus = 'placed' | 'preparing' | 'on_the_way' | 'delivered';

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
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
  status: OrderStatus;
  address: Address;
  paymentMethod: string;
  deliverySlot: string;
  estimatedDeliveryTime: string;
  trackingSteps: TrackingStep[];
  driverName?: string;
  driverPhone?: string;
  driverAvatar?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
