# Profile Image Setup

## Instructions

To set your profile picture on the website, follow these steps:

### Step 1: Prepare Your Image
- Select an image you want to use as your profile picture
- Name it exactly: `profile.jpg`
- Image should be in JPG format for best compatibility

### Step 2: Place the Image
- Copy your `profile.jpg` file
- Paste it in this folder (`assets/`)
- The folder path should look like: `website/assets/profile.jpg`

### Step 3: Done!
The image will automatically appear on your website as your profile picture. The website is configured to:
- Look for `profile.jpg` in this folder
- Display it in the hero/header section
- If the image is not found, a placeholder will be shown

## Image Requirements

- **Format**: JPG (JPEG)
- **Recommended Size**: 300x300 pixels or larger
- **Aspect Ratio**: Square (1:1) works best for the circular display
- **File Size**: Keep under 500KB for optimal performance

## Alternative Formats

If you want to use other formats (PNG, WebP, etc.), you can modify the `index.html` file:

Change this line:
```html
<img src="./assets/profile.jpg" alt="Syed Toukir Ahmed Noor" class="profile-photo" id="profileImage">
```

To your desired filename:
```html
<img src="./assets/profile.png" alt="Syed Toukir Ahmed Noor" class="profile-photo" id="profileImage">
```

And update the JavaScript check in `js/main.js`:
```javascript
testImg.src = './assets/profile.png';  // Change to your filename
```

## Troubleshooting

- **Image not showing?** 
  - Check the filename is exactly `profile.jpg`
  - Make sure it's in the `website/assets/` folder
  - Try refreshing your browser (Ctrl+F5)

- **Image looks distorted?**
  - Use a square image (1:1 aspect ratio)
  - Recommended size: 300x300px or 400x400px

- **Image file too large?**
  - Compress it using an online tool or image editor
  - Target file size: 100-200KB for best performance
