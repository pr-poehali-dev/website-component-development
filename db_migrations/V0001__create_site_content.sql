CREATE TABLE IF NOT EXISTS t_p17931339_website_component_de.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);