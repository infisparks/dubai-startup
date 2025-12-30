
-- Ensure the webhook function is robust and handles the input correctly
create or replace function stripe_event_webhook(payload jsonb)
returns void
language plpgsql
security definer
-- Grant execution to service_role is handled by default but good to be explicit if needed
as $$
declare
  uid uuid;
  event_type text;
  session_id text;
  metadata jsonb;
begin
  -- Extract type safely
  event_type := payload->>'type';

  if event_type = 'checkout.session.completed' then
    -- Extract data with checks
    session_id := payload->'data'->'object'->>'id';
    metadata := payload->'data'->'object'->'metadata';
    
    if metadata is not null and metadata ? 'user_id' then
       uid := (metadata->>'user_id')::uuid;

       update founder_profiles
       set
         payment_status = 'paid',
         stripe_session_id = session_id,
         paid_at = now()
       where user_id = uid;
    end if;
  end if;
end;
$$;
