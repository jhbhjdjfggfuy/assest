/*
  # Create properties and trades tables

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `estimated_value` (numeric)
      - `images` (text array)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `trade_offers`
      - `id` (uuid, primary key)
      - `proposer_id` (uuid, references auth.users)
      - `receiver_id` (uuid, references auth.users)
      - `proposer_property_id` (uuid, references properties)
      - `receiver_property_id` (uuid, references properties)
      - `additional_cash` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for property owners
    - Add policies for trade participants
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  estimated_value numeric NOT NULL,
  images text[] DEFAULT ARRAY[]::text[],
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trade_offers table
CREATE TABLE IF NOT EXISTS trade_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposer_id uuid REFERENCES auth.users NOT NULL,
  receiver_id uuid REFERENCES auth.users NOT NULL,
  proposer_property_id uuid REFERENCES properties NOT NULL,
  receiver_property_id uuid REFERENCES properties NOT NULL,
  additional_cash numeric DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_offers ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Users can view all available properties"
  ON properties
  FOR SELECT
  USING (status = 'available' OR user_id = auth.uid());

CREATE POLICY "Users can insert their own properties"
  ON properties
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own properties"
  ON properties
  FOR UPDATE
  USING (user_id = auth.uid());

-- Trade offers policies
CREATE POLICY "Users can view their trade offers"
  ON trade_offers
  FOR SELECT
  USING (proposer_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can create trade offers"
  ON trade_offers
  FOR INSERT
  WITH CHECK (proposer_id = auth.uid());

CREATE POLICY "Trade participants can update offers"
  ON trade_offers
  FOR UPDATE
  USING (proposer_id = auth.uid() OR receiver_id = auth.uid());