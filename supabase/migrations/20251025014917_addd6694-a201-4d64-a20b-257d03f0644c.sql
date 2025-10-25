-- 1. EXTEND articles table with new columns
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT,
ADD COLUMN IF NOT EXISTS amazon_product_data JSONB,
ADD COLUMN IF NOT EXISTS affiliate_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS affiliate_id TEXT,
ADD COLUMN IF NOT EXISTS html_content TEXT,
ADD COLUMN IF NOT EXISTS markdown_content TEXT,
ADD COLUMN IF NOT EXISTS last_edited TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS image_metadata JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS exit_intent_config JSONB;

-- Add indexes on articles table
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON public.articles(user_id);
CREATE INDEX IF NOT EXISTS idx_articles_article_type ON public.articles(article_type);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

-- 2. CREATE content_library table
CREATE TABLE IF NOT EXISTS public.content_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video')),
  file_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  seo_filename TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.content_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own content library"
ON public.content_library FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content library"
ON public.content_library FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content library"
ON public.content_library FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content library"
ON public.content_library FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_content_library_user_id ON public.content_library(user_id);
CREATE INDEX IF NOT EXISTS idx_content_library_file_type ON public.content_library(file_type);

-- Add trigger for updated_at
CREATE TRIGGER update_content_library_updated_at
BEFORE UPDATE ON public.content_library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 3. CREATE seo_suggestions table
CREATE TABLE IF NOT EXISTS public.seo_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  suggested_titles JSONB DEFAULT '[]'::jsonb,
  primary_keyword TEXT,
  secondary_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  meta_description TEXT,
  article_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.seo_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own SEO suggestions"
ON public.seo_suggestions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own SEO suggestions"
ON public.seo_suggestions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own SEO suggestions"
ON public.seo_suggestions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own SEO suggestions"
ON public.seo_suggestions FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_seo_suggestions_user_id ON public.seo_suggestions(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_suggestions_topic ON public.seo_suggestions(topic);

-- 4. CREATE generated_images table
CREATE TABLE IF NOT EXISTS public.generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  position INTEGER,
  format TEXT DEFAULT 'WebP',
  width INTEGER,
  height INTEGER,
  optimized BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generated images"
ON public.generated_images FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated images"
ON public.generated_images FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generated images"
ON public.generated_images FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own generated images"
ON public.generated_images FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_generated_images_article_id ON public.generated_images(article_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_user_id ON public.generated_images(user_id);

-- 5. CREATE popup_config table
CREATE TABLE IF NOT EXISTS public.popup_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  title TEXT,
  description TEXT,
  cta_text TEXT,
  cta_url TEXT,
  trigger_delay INTEGER DEFAULT 3000,
  display_once BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.popup_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own popup config"
ON public.popup_config FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own popup config"
ON public.popup_config FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own popup config"
ON public.popup_config FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own popup config"
ON public.popup_config FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_popup_config_updated_at
BEFORE UPDATE ON public.popup_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6. CREATE social_notifications table
CREATE TABLE IF NOT EXISTS public.social_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enabled BOOLEAN DEFAULT true,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  action TEXT NOT NULL,
  icon TEXT DEFAULT '⭐',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.social_notifications ENABLE ROW LEVEL SECURITY;

-- Public can view social notifications
CREATE POLICY "Anyone can view social notifications"
ON public.social_notifications FOR SELECT
USING (enabled = true);

-- Insert seed notifications
INSERT INTO public.social_notifications (name, location, action, icon) VALUES
  ('Sarah M.', 'New York, USA', 'just created a buying guide', '📝'),
  ('James K.', 'London, UK', 'published a product review', '⭐'),
  ('Emily R.', 'Toronto, Canada', 'generated a how-to article', '✨'),
  ('Michael L.', 'Sydney, Australia', 'completed a product comparison', '🎯'),
  ('Lisa W.', 'Berlin, Germany', 'created a product roundup', '🚀')
ON CONFLICT DO NOTHING;

-- 7. CREATE storage buckets and policies
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('content-library', 'content-library', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']),
  ('article-images', 'article-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('featured-images', 'featured-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for content-library bucket
CREATE POLICY "Users can upload to own content library folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'content-library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own content library files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'content-library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update own content library files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'content-library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own content library files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'content-library' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage RLS policies for article-images bucket (publicly readable)
CREATE POLICY "Anyone can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Users can upload to own article images folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update own article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage RLS policies for featured-images bucket (publicly readable)
CREATE POLICY "Anyone can view featured images"
ON storage.objects FOR SELECT
USING (bucket_id = 'featured-images');

CREATE POLICY "Users can upload to own featured images folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'featured-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update own featured images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'featured-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own featured images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'featured-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);