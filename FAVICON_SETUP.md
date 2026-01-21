# Favicon Setup Instructions

## Current Setup
- **Primary favicon**: `/public/logo.webp` (your logo file)
- **Fallback favicon**: `/public/favicon.ico` (standard ICO format)
- **Apple touch icon**: `/public/logo.webp`

## How to Replace the Favicon

### Option 1: Use Online Converter (Recommended)
1. Go to https://favicon.io/favicon-converter/
2. Upload your `logo.webp` file
3. Download the generated favicon package
4. Replace `/public/favicon.ico` with the new favicon.ico
5. Optionally replace `/public/logo.webp` with your updated logo

### Option 2: Use ImageMagick (Command Line)
```bash
# Convert logo.webp to favicon.ico (16x16 and 32x32 sizes)
magick logo.webp -resize 32x32 favicon-32x32.png
magick logo.webp -resize 16x16 favicon-16x16.png
magick favicon-16x16.png favicon-32x32.png favicon.ico
```

### Option 3: Manual Creation
1. Open your logo in an image editor
2. Resize to 32x32 pixels
3. Save as ICO format
4. Replace `/public/favicon.ico`

## Browser Support
- **Modern browsers**: Will use `/public/logo.webp`
- **Older browsers**: Will fall back to `/public/favicon.ico`
- **iOS Safari**: Will use the Apple touch icon

## Testing
After updating, test your favicon by:
1. Opening your site in different browsers
2. Checking the browser tab for the icon
3. Adding to home screen on mobile devices

