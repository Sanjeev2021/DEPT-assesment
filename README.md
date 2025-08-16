# FOODZ - Food Recipe Homepage

A modern, responsive food delivery website built with vanilla technologies, focusing on performance, SEO, and accessibility.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Performance Optimized**: Vanilla JavaScript with passive event listeners and Intersection Observer
- **SEO Friendly**: Semantic HTML, meta tags, and Open Graph support
- **Accessible**: ARIA labels, keyboard navigation, and high contrast support
- **Modern UI**: Clean design with smooth animations and hover effects
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Custom properties, Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks or libraries
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized for Core Web Vitals

## 📱 Design Features

### Header Section
- Fixed navigation with smooth scroll effects
- Logo with vibrant green branding
- Navigation menu with active states
- Call-to-action button

### Hero Section
- Compelling headline: "You've Got Questions. We've Got Taste."
- Descriptive subtext
- Dual action buttons (ORDER NOW + Explore menu)
- Statistics cards (9+ years, 120+ stores)
- Custom food illustration with bowl, egg, and ingredients
- Decorative background shapes

### Visual Elements
- Custom CSS food bowl illustration
- Animated statistics counters
- Smooth hover effects
- Ripple button animations
- Mobile-responsive navigation

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local development server (optional)

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your browser
3. **Or serve locally** using a development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

4. **Open** `http://localhost:8000` in your browser

## 📁 Project Structure

```
interview_website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # Vanilla JavaScript functionality
├── README.md           # Project documentation
└── favicon.ico         # Website favicon
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:

```css
:root {
    --primary-green: #4CAF50;      /* Main brand color */
    --primary-green-hover: #45a049; /* Hover state */
    --dark-gray: #333333;          /* Main text */
    --light-gray: #666666;         /* Secondary text */
    --white: #ffffff;              /* Background */
    --light-green-bg: #e8f5e8;    /* Accent background */
}
```

### Typography
- **Serif fonts**: Used for headlines (Georgia, Times New Roman)
- **Sans-serif fonts**: Used for body text and navigation (Arial, Helvetica)

### Layout
- **Container width**: 1200px maximum
- **Grid system**: CSS Grid for main layout
- **Flexbox**: Used for component layouts
- **Responsive breakpoints**: 768px and 480px

## 📱 Responsive Design

The website is fully responsive with three main breakpoints:

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Stacked layout)
- **Mobile**: 480px - 767px (Single column)
- **Small Mobile**: <480px (Optimized spacing)

## ♿ Accessibility Features

- **ARIA labels**: Proper labeling for screen readers
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy
- **High contrast support**: Respects user preferences
- **Reduced motion**: Respects accessibility preferences

## 🚀 Performance Features

- **Passive event listeners**: Optimized scroll performance
- **Intersection Observer**: Efficient element detection
- **CSS animations**: Hardware-accelerated transitions
- **Minimal JavaScript**: Lightweight and fast
- **Optimized CSS**: Efficient selectors and properties

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Internet Explorer**: Not supported

## 📈 SEO Features

- **Meta tags**: Description, keywords, and author
- **Open Graph**: Social media sharing support
- **Semantic HTML**: Proper heading structure
- **Alt text**: Image descriptions
- **Structured data**: Ready for schema markup

## 🎯 Future Enhancements

- [ ] Add more sections (Menu, Blog, Contact)
- [ ] Implement contact form functionality
- [ ] Add image lazy loading
- [ ] Implement search functionality
- [ ] Add dark mode toggle
- [ ] Implement PWA features

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ following modern web development best practices.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the browser console for errors
2. Ensure all files are in the same directory
3. Verify your browser supports modern CSS and JavaScript features
4. Try clearing browser cache and cookies

---

**Note**: This website is built without any external dependencies, CSS frameworks, or jQuery libraries, ensuring maximum performance and compatibility.
