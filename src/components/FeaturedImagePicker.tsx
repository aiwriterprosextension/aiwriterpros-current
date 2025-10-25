import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FeaturedImagePickerProps {
  imageUrl?: string;
  altText?: string;
  onImageSelect: (url: string, alt: string) => void;
}

export const FeaturedImagePicker = ({ imageUrl, altText, onImageSelect }: FeaturedImagePickerProps) => {
  const [uploading, setUploading] = useState(false);
  const [currentAltText, setCurrentAltText] = useState(altText || '');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Featured image must be under 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to featured-images bucket
      const { error: uploadError } = await supabase.storage
        .from('featured-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('featured-images')
        .getPublicUrl(fileName);

      onImageSelect(publicUrl, currentAltText);

      toast({
        title: 'Image Uploaded',
        description: 'Featured image uploaded successfully',
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  }, [currentAltText, onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const handleRemove = () => {
    onImageSelect('', '');
    setCurrentAltText('');
  };

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAltText = e.target.value;
    setCurrentAltText(newAltText);
    if (imageUrl) {
      onImageSelect(imageUrl, newAltText);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Featured Image (1200x630 recommended)</Label>
      
      {imageUrl ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img 
                src={imageUrl} 
                alt={currentAltText || 'Featured image'} 
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="alt-text">Alt Text (for accessibility and SEO)</Label>
              <Input
                id="alt-text"
                value={currentAltText}
                onChange={handleAltTextChange}
                placeholder="Descriptive text for the image"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary/50'
            } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mb-4" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">
                  {isDragActive ? 'Drop image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse (max 5MB)
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" disabled>
              <ImageIcon className="mr-2 h-4 w-4" />
              Content Library
              <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
            </Button>
            <Button type="button" variant="outline" disabled>
              <ImageIcon className="mr-2 h-4 w-4" />
              AI Generate
              <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
