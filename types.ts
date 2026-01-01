
export interface Reward {
  id: string;
  name: string;
  category: 'Electronics' | 'Vouchers' | 'Lifestyle' | 'Travel';
  points: number;
  image: string;
  description: string;
}

export interface User {
  name: string;
  totalPoints: number;
  availablePoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'earned' | 'redeemed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
