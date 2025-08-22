export enum Sender {
  User = 'user',
  AI = 'ai',
  System = 'system',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}

export interface ContactHistoryItem {
  date: string;
  reason: string;
  outcome: string;
  details: string;
}

export interface Order {
    orderId: string;
    date: string;
    items: string;
    status: string;
    details: string;
}

export interface CustomerData {
  accountId: string;
  joinDate: string;
  plan: string;
  email: string;
  phone: string;
  orderHistory?: Order[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  customerName: string;
  mood: string;
  initialMessage: string;
  userStarts?: boolean;
  contactHistory: ContactHistoryItem[];
  customerData: CustomerData;
}