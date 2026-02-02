-- Update the check constraint to include new roles
ALTER TABLE manual_id_cards DROP CONSTRAINT IF EXISTS manual_id_cards_role_check;

ALTER TABLE manual_id_cards 
ADD CONSTRAINT manual_id_cards_role_check 
CHECK (role IN (
  'Founder', 
  'Investor', 
  'Exhibitor', 
  'Visitor', 
  'Organizer', 
  'Speaker', 
  'EMCEE', 
  'Crew', 
  'Media', 
  'Guest of Honour', 
  'Investarise Team'
));
