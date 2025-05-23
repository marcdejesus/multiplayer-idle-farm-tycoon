-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create custom types
create type user_role as enum ('player', 'moderator', 'admin');
create type transaction_type as enum ('purchase', 'sale', 'reward', 'gift');

-- Create users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  username text not null unique,
  role user_role not null default 'player',
  coins integer not null default 100,
  xp integer not null default 0,
  level integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create farms table
create table public.farms (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  name text not null,
  layout jsonb not null default '{}',
  last_harvested timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create inventory table
create table public.inventory (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  item_type text not null,
  item_id text not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  type transaction_type not null,
  amount integer not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create achievements table
create table public.achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  achievement_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.users enable row level security;
alter table public.farms enable row level security;
alter table public.inventory enable row level security;
alter table public.transactions enable row level security;
alter table public.achievements enable row level security;

-- Users policies
create policy "Users can read their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

-- Farms policies
create policy "Users can read their own farms"
  on public.farms for select
  using (auth.uid() = user_id);

create policy "Users can create their own farms"
  on public.farms for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own farms"
  on public.farms for update
  using (auth.uid() = user_id);

-- Inventory policies
create policy "Users can read their own inventory"
  on public.inventory for select
  using (auth.uid() = user_id);

create policy "Users can update their own inventory"
  on public.inventory for all
  using (auth.uid() = user_id);

-- Transactions policies
create policy "Users can read their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

-- Achievements policies
create policy "Users can read their own achievements"
  on public.achievements for select
  using (auth.uid() = user_id);

create policy "Users can unlock achievements"
  on public.achievements for insert
  with check (auth.uid() = user_id);

-- Create functions
create or replace function public.get_user_profile(user_id uuid)
returns json
language plpgsql
security definer
as $$
begin
  return (
    select json_build_object(
      'id', u.id,
      'username', u.username,
      'level', u.level,
      'xp', u.xp,
      'coins', u.coins,
      'farm_count', (select count(*) from public.farms where user_id = u.id),
      'achievement_count', (select count(*) from public.achievements where user_id = u.id)
    )
    from public.users u
    where u.id = user_id
  );
end;
$$; 