export type Property = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  estimated_value: number;
  images: string[];
  status: 'available' | 'pending' | 'traded';
  created_at: string;
  updated_at: string;
};

export type TradeOffer = {
  id: string;
  proposer_id: string;
  receiver_id: string;
  proposer_property_id: string;
  receiver_property_id: string;
  additional_cash: number;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
};