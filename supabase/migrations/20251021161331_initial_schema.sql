-- Initial schema for Rada AI Tools Directory
-- Created: 2025-10-21

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TOOLS TABLE
-- Core directory of AI tools
-- ============================================================================
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,

  -- Pricing
  pricing_model TEXT CHECK (pricing_model IN ('free', 'freemium', 'paid')),
  starting_price DECIMAL(10, 2),

  -- Classification (arrays for flexible matching)
  use_cases TEXT[] DEFAULT '{}',
  experience_levels TEXT[] DEFAULT '{}',
  integrations TEXT[] DEFAULT '{}',

  -- Scraping metadata
  source TEXT, -- 'producthunt', 'gptstore', 'manual', etc.
  source_id TEXT,
  source_url TEXT,
  last_scraped_at TIMESTAMPTZ,
  scrape_status TEXT DEFAULT 'active' CHECK (scrape_status IN ('active', 'failed', 'deprecated')),

  -- Quality control
  verified BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint for external sources
CREATE UNIQUE INDEX idx_tools_source_id ON tools(source, source_id) WHERE source IS NOT NULL AND source_id IS NOT NULL;

-- Performance indexes
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_published ON tools(published, created_at DESC) WHERE published = true;
CREATE INDEX idx_tools_use_cases ON tools USING GIN(use_cases);
CREATE INDEX idx_tools_integrations ON tools USING GIN(integrations);

-- Full-text search index
CREATE INDEX idx_tools_search ON tools USING GIN (
  to_tsvector('english', name || ' ' || COALESCE(tagline, '') || ' ' || COALESCE(description, ''))
);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- LEADS TABLE
-- Quiz submissions and email captures
-- ============================================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,

  -- Quiz answers
  use_case TEXT NOT NULL,
  budget TEXT NOT NULL,
  experience TEXT NOT NULL,
  integrations TEXT[] DEFAULT '{}',
  problem TEXT,

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Processing status
  recommendations_sent_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lead lookup and analytics
CREATE INDEX idx_leads_email ON leads(email, created_at DESC);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_use_case ON leads(use_case);

-- ============================================================================
-- RECOMMENDATIONS TABLE
-- Matched tools for each lead
-- ============================================================================
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,

  -- Match metadata
  rank INTEGER NOT NULL CHECK (rank > 0),
  reason TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique ranks per lead
  UNIQUE(lead_id, rank)
);

-- Indexes for lookups
CREATE INDEX idx_recommendations_lead_id ON recommendations(lead_id, rank);
CREATE INDEX idx_recommendations_tool_id ON recommendations(tool_id);

-- ============================================================================
-- SCRAPE_LOGS TABLE
-- Debugging and audit trail for scrapers
-- ============================================================================
CREATE TABLE scrape_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,

  -- Scrape metadata
  source TEXT NOT NULL,
  source_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'skipped')),
  error_message TEXT,

  -- Raw scraped data (for debugging and future field extraction)
  raw_data JSONB,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for debugging queries
CREATE INDEX idx_scrape_logs_source ON scrape_logs(source, created_at DESC);
CREATE INDEX idx_scrape_logs_status ON scrape_logs(status, created_at DESC);
CREATE INDEX idx_scrape_logs_tool_id ON scrape_logs(tool_id) WHERE tool_id IS NOT NULL;
