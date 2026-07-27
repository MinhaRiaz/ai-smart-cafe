-- Create Menu Items Table
CREATE TABLE menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Orders Table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, preparing, ready, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Order Items Table (Junction Table)
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Initial Mock Data
INSERT INTO menu_items (name, price, category, image) VALUES 
('Midnight Espresso', 'Rs. 450', 'Coffee', '/images/midnight_espresso.png'),
('Caramel Cloud Latte', 'Rs. 600', 'Coffee', '/images/caramel_latte.png'),
('Matcha Zen', 'Rs. 750', 'Tea', '/images/matcha_zen.png'),
('Chocolate Lava Cake', 'Rs. 850', 'Desserts', '/images/lava_cake.png'),
('Avocado Toast', 'Rs. 650', 'Snacks', '/images/avocado_toast.png');

-- Allow public read access to menu items
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." 
ON menu_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert menu items (for testing)."
ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete menu items (for testing)."
ON menu_items FOR DELETE USING (true);
CREATE POLICY "Anyone can update menu items (for testing)."
ON menu_items FOR UPDATE USING (true);
