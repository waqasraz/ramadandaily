# Setting Up the Ramadan Background Image

To complete the setup of your Ramadan Daily Giving application, you need to add the background image:

1. Copy your `rbg.jpeg` file to the following location:
   ```
   public/images/rbg.jpeg
   ```

2. If you're using a different image or filename, update the path in `app/globals.css`:
   ```css
   body {
     /* ... other styles ... */
     background-image: url('/images/rbg.jpeg');
     /* ... other styles ... */
   }
   ```

3. Restart your development server if it's already running:
   ```bash
   npm run dev
   ```

## Alternative Background Images

If you don't have the `rbg.jpeg` file, you can use any Ramadan-themed image. Here are some suggestions:

1. Search for "Ramadan background" on stock photo websites
2. Use images with lanterns, mosques, crescent moons, or Islamic patterns
3. Choose darker images that will work well with white text overlay

## Optimizing Background Images

For better performance:

1. Compress your image to reduce file size
2. Consider using WebP format instead of JPEG for better compression
3. If your image is very large, resize it to a maximum width of 1920px

The background image will be fixed and cover the entire viewport, with a dark overlay to ensure text remains readable. 