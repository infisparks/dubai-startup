-- 1. Enable key extensions
create extension if not exists supabase_vault with schema vault;
create extension if not exists http with schema extensions; -- For synchronous HTTP calls

-- 2. Store your Stripe Secret Key (Run this ONCE if you haven't yet)
-- Replace 'sk_test_...' with your actual Stripe Secret Key
-- select vault.create_secret('sk_test_YOUR_ACTUAL_KEY_HERE', 'stripe_secret_key');

-- 3. Create the payment function (Synchronous version using 'http' extension)
create or replace function create_event_payment(reg_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, vault -- Clean search path
as $$
declare
  stripe_key text;
  response_result extensions.http_response;
  response_body jsonb;
begin
  -- Retrieve secret from the vault view (vault.get_secret is not a standard function)
  select decrypted_secret into stripe_key
  from vault.decrypted_secrets
  where name = 'stripe_secret_key';

  -- Safety check
  if stripe_key is null then
    raise exception 'Stripe key missing in Vault. Run: select vault.create_secret(''sk_test_...'', ''stripe_secret_key'');';
  end if;

  -- Allow ONLY approved & unpaid users
  if not exists (
    select 1
    from founder_profiles
    where user_id = auth.uid()
      and is_approved = true
      and payment_status = 'unpaid'
  ) then
    raise exception 'Not allowed: User must be approved and unpaid.';
  end if;

  -- Perform SYNCHRONOUS HTTP Request to Stripe
  -- Note: We use 'extensions.http_post' from pgsql-http extension, NOT 'net.http_post' (which is async)
  select * into response_result from extensions.http((
    'POST', 
    'https://api.stripe.com/v1/checkout/sessions', 
    ARRAY[
      extensions.http_header('Authorization', 'Bearer ' || stripe_key),
      extensions.http_header('Content-Type', 'application/x-www-form-urlencoded')
    ], 
    'application/x-www-form-urlencoded', 
    'mode=payment' ||
    '&success_url=https://www.investariseglobal.com/payment-success' ||
    '&cancel_url=https://www.investariseglobal.com/payment-cancel' ||
    '&line_items[0][price_data][currency]=inr' ||
    '&line_items[0][price_data][product_data][name]=Event Fee' ||
    '&line_items[0][price_data][unit_amount]=100000' ||
    '&line_items[0][quantity]=1' ||
    '&metadata[user_id]=' || auth.uid()
  )::extensions.http_request);

  -- Check for errors
  if response_result.status != 200 then
     raise exception 'Stripe API Error: %', response_result.content;
  end if;

  -- Return the JSON body (which contains the 'url' for redirection)
  return response_result.content::jsonb;
end;
$$;
