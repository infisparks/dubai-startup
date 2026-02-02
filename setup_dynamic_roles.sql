-- 1. Remove the restrictive check constraint on manual_id_cards so new roles can be added dynamically
ALTER TABLE manual_id_cards DROP CONSTRAINT IF EXISTS manual_id_cards_role_check;

-- 2. Create a new table to store dynamic roles and their styles
CREATE TABLE IF NOT EXISTS access_roles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    role_name text NOT NULL UNIQUE,
    bg_gradient text NOT NULL,
    accent_color text NOT NULL,
    label text NOT NULL, -- The text shown on the card (e.g., "CREW")
    created_at timestamptz DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE access_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access for authenticated users" ON access_roles FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 4. Seed with initial data (The ones we defined previously)
INSERT INTO access_roles (role_name, bg_gradient, accent_color, label) VALUES
('Organizer', 'radial-gradient(circle at top right, #ea580c 0%, #9a3412 100%)', '#fdba74', 'ORGANIZER'),
('Investor', 'radial-gradient(circle at top right, #15803d 0%, #14532d 100%)', '#86efac', 'INVESTOR'),
('Founder', 'radial-gradient(circle at top right, #1d4ed8 0%, #1e3a8a 100%)', '#93c5fd', 'STARTUP'),
('Speaker', 'radial-gradient(circle at top right, #7e22ce 0%, #581c87 100%)', '#d8b4fe', 'SPEAKER'),
('EMCEE', 'radial-gradient(circle at top right, #ca8a04 0%, #854d0e 100%)', '#fde047', 'EMCEE'),
('Crew', 'radial-gradient(circle at top right, #b91c1c 0%, #7f1d1d 100%)', '#fca5a5', 'CREW'),
('Media', 'radial-gradient(circle at top right, #475569 0%, #1e293b 100%)', '#cbd5e1', 'MEDIA'),
('Guest of Honour', 'radial-gradient(circle at top right, #000000 0%, #1a1a1a 100%)', '#C5A059', 'GUEST OF HONOUR'),
('Investarise Team', 'radial-gradient(circle at top right, #0f172a 0%, #020617 100%)', '#38bdf8', 'INVESTARISE TEAM'),
('Exhibitor', 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)', '#C5A059', 'EXHIBITOR'),
('Visitor', 'radial-gradient(circle at top right, #334155 0%, #0f172a 100%)', '#94a3b8', 'VISITOR')
ON CONFLICT (role_name) DO NOTHING;
