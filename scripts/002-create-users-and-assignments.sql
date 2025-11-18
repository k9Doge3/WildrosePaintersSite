-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table for contractors
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'contractor' CHECK (role IN ('admin', 'contractor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add assigned_to column to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- Insert admin user (you)
INSERT INTO public.users (email, full_name, role)
VALUES ('ky.group.solutions@gmail.com', 'KY Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can see all users
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT
  USING (id = auth.uid());

-- Policy: Admins can insert/update/delete users
CREATE POLICY "Admins can manage users" ON public.users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Policy: Admins can see all leads
CREATE POLICY "Admins can view all leads" ON public.leads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Policy: Contractors can only see their assigned leads
CREATE POLICY "Contractors can view assigned leads" ON public.leads
  FOR SELECT
  USING (
    assigned_to = auth.uid()
  );

-- Policy: Admins can manage all leads
CREATE POLICY "Admins can manage leads" ON public.leads
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Policy: Allow public to insert leads (from contact form)
CREATE POLICY "Public can create leads" ON public.leads
  FOR INSERT
  WITH CHECK (true);
