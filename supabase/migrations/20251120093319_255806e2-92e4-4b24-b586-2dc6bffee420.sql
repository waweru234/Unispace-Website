-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
TO public
USING (true);

-- Create cart table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can view their own cart
CREATE POLICY "Users can view their own cart"
ON public.cart_items FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert into their own cart
CREATE POLICY "Users can add to their own cart"
ON public.cart_items FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart
CREATE POLICY "Users can update their own cart"
ON public.cart_items FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete from their own cart
CREATE POLICY "Users can delete from their own cart"
ON public.cart_items FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  phone_number TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  mpesa_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create their own orders"
ON public.orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can view items in their own orders
CREATE POLICY "Users can view their own order items"
ON public.order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Insert sample products
INSERT INTO public.products (name, description, price, category, stock) VALUES
('Interior Design Consultation', 'Professional interior design consultation service for homes and offices', 150.00, 'Services', 100),
('Custom Furniture Set', 'Bespoke furniture design and manufacturing', 800.00, 'Furniture', 20),
('Garden Gazebo', 'Premium outdoor gazebo with modern design', 1200.00, 'Outdoor', 15),
('LED Signage Design', 'Custom LED signage for businesses', 500.00, 'Signage', 30),
('Ceiling Design Package', 'Complete ceiling design and installation', 650.00, 'Interior', 25),
('Decorative Fencing', 'Artistic palette fencing for gardens', 400.00, 'Outdoor', 40),
('Tree Bench Installation', 'Custom tree bench for outdoor spaces', 350.00, 'Outdoor', 35),
('Reception Area Makeover', 'Complete reception area transformation', 1500.00, 'Commercial', 10);