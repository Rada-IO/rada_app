-- Row Level Security Policies
-- Created: 2025-10-21

-- ============================================================================
-- ENABLE RLS
-- ============================================================================
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TOOLS POLICIES
-- ============================================================================

-- Public read access for published tools
CREATE POLICY "Published tools are publicly viewable"
  ON tools
  FOR SELECT
  USING (published = true);

-- For now, allow all inserts/updates (you'll add auth later)
-- TODO: Restrict to admin users when auth is implemented
CREATE POLICY "Allow all tool inserts"
  ON tools
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all tool updates"
  ON tools
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow all tool deletes"
  ON tools
  FOR DELETE
  USING (true);

-- ============================================================================
-- LEADS POLICIES
-- ============================================================================

-- Anyone can submit a lead (quiz form)
CREATE POLICY "Anyone can create leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading your own leads (when auth is added)
-- For now, no one can read leads via client (only server-side)
CREATE POLICY "No public lead access"
  ON leads
  FOR SELECT
  USING (false);

-- ============================================================================
-- RECOMMENDATIONS POLICIES
-- ============================================================================

-- No public access to recommendations (only server-side)
CREATE POLICY "No public recommendation access"
  ON recommendations
  FOR SELECT
  USING (false);

-- Server can create recommendations
CREATE POLICY "Allow recommendation creation"
  ON recommendations
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- SCRAPE_LOGS POLICIES
-- ============================================================================

-- No public access to scrape logs (admin/debugging only)
CREATE POLICY "No public scrape log access"
  ON scrape_logs
  FOR SELECT
  USING (false);

-- Allow scraper to write logs
CREATE POLICY "Allow scrape log creation"
  ON scrape_logs
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- NOTES
-- ============================================================================
-- When you add authentication later, update policies to:
-- 1. tools: Only allow authenticated admins to INSERT/UPDATE/DELETE
-- 2. leads: Allow users to read their own leads (auth.uid() = user_id)
-- 3. recommendations: Allow users to read their own recommendations
-- 4. scrape_logs: Only allow admins to read
--
-- Example admin check:
-- CREATE POLICY "Admins can manage tools"
--   ON tools
--   FOR ALL
--   USING (
--     auth.jwt() ->> 'role' = 'admin'
--   );
