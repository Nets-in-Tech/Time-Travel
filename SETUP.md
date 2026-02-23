# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your telescope image:**
   - Copy your telescope image to `src/assets/telescope.png`
   
   The image should be:
   - `telescope.png` - The telescope image you provided (PNG with transparent background)
   
   Note: The floor is now a CSS div element (no image needed)

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Image Requirements

- **Format**: PNG (preferred) or JPG
- **Telescope**: Should have transparent background for best results

## Troubleshooting

If the telescope image doesn't load:
1. Make sure the image is in `src/assets/` folder
2. Check file name matches exactly: `telescope.png`
3. Check browser console for any error messages
