# 🚀 TechFlow AI - Dynamic Landing Page

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 About the Project

This project is a **modern and responsive landing page** for the fictional company **TechFlow AI**, which specializes in Artificial Intelligence solutions. The site was developed as an academic exercise, combining an **initial static development, assisted by Artificial Intelligence**, with **dynamic DOM manipulation via JavaScript**.

### 🎯 Educational Purpose

The project was developed based on a class assignment from **Professor Guilherme** ([GitHub](https://github.com/guiigos)), with the following objectives:

1.  **Create a complete static structure** in HTML/CSS.
2.  **Implement specific dynamic functionalities** using JavaScript for DOM manipulation.
3.  **Apply modern web development concepts** with a focus on user experience.

## 🤖 AI-Assisted Development

The project's foundation (HTML structure, CSS styling, and basic JavaScript functionalities) was **developed with AI assistance**, demonstrating how AI tools can accelerate the web development process while maintaining code best practices and responsive design.

## 📁 Project Structure

```
siteDinamico/
├── index_static.html     # Main page with the complete structure
├── style.css             # CSS styles with a modern design system
├── script.js             # JavaScript for animations and interactions
└── README.md             # Project documentation
```

## 🛠️ Technologies Used

### Frontend
-   **HTML5**: Modern semantic structure
-   **CSS3**:
    -   CSS Custom Properties (CSS variables)
    -   CSS Grid and Flexbox
    -   Animations and transitions
    -   Responsive design (mobile-first)
-   **JavaScript ES6+**:
    -   DOM Manipulation
    -   Event Listeners
    -   Template Literals

## 🎯 Dynamic Implementation - Core of the Assignment

### Dynamic Testimonial Cards

The **main dynamic functionality** implemented as per the class assignment was the **creation of testimonial cards via JavaScript**:

```javascript
// Array with testimonial data
const reviews = [{
    clientName: "Ana Silva",
    role: "CEO - Tech Corp Brazil",
    rating: 5,
    review: "TechFlow AI completely transformed our processes..."
}, 
// ... more testimonials
];

// Dynamic creation of DOM elements
const wrapper = document.querySelector('#grid');

for (let index = 0; index < 6; index++) {
    const review = reviews[index];
    
    // Creation of rating stars
    const divRating = document.createElement("div");
    divRating.classList.add("rating");
    
    for (let indexRating = 0; indexRating < review.rating; indexRating++) {
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star");
        divRating.appendChild(star);
    }
    
    // Creation of card elements
    // ... full code in the file
}
```

### 🎓 Key Concepts Applied

1.  **DOM Manipulation**: `createElement()`, `appendChild()`, `classList.add()`
2.  **Looping Structures**: Loops to create multiple elements.
3.  **Template Generation**: Dynamic HTML generation via JavaScript.
4.  **Data Binding**: Binding array data to visual elements.
5.  **Progressive Enhancement**: Static structure + dynamic functionalities.

## 🚀 How to Run

1.  **Clone or download the project**
    ```bash
    git clone https://github.com/Bayer-07/criacaoElementosJs.git
    cd siteDinamico
    ```

2.  **Open the HTML file**
    ```bash
    # Open directly in the browser
    open index_static.html
    ```

3.  **Preview the features**
    -   Navigate through the sections.
    -   Test the mobile menu (resize the window).
    -   Observe the **testimonial cards being created dynamically**.
    -   Scroll to see the animations.

## 🎯 Implementation Highlights

### ✅ Best Practices

-   **Semantic and accessible code**
-   **Separation of concerns** (HTML/CSS/JS)
-   **Consistent naming** (BEM methodology)
-   **Optimized performance** (efficient CSS, non-blocking JS)
-   **Cross-browser compatibility**

### 🔍 Relevant Technical Aspects

-   **CSS Custom Properties** for the theme system
-   **Modular JavaScript** with specific functions
-   **Efficient DOM manipulation**
-   **Event delegation** for performance
-   **Intersection Observer** for optimized animations

## 🎨 Design System

### Color Palette

```css
:root {
    --primary-color: #6366f1;     /* Indigo */
    --secondary-color: #10b981;   /* Emerald */
    --accent-color: #f59e0b;      /* Amber */
    --dark-bg: #0f172a;           /* Slate 900 */
    --dark-card: #1e293b;         /* Slate 800 */
    --text-primary: #f8fafc;      /* Slate 50 */
}
```

## 🏆 Learning Outcomes

### Skills Developed

1.  **Structuring complete web projects**
2.  **Advanced DOM manipulation** with JavaScript
3.  **Modern responsive design**
4.  **Custom animation systems**
5.  **Efficient HTML/CSS/JS integration**

### Challenges Overcome

-   **Synchronization** between static and dynamic structures
-   **Performance** in creating multiple elements
-   **Cross-browser compatibility** for modern features

## 👨‍🏫 Educational Credits

This project was developed as part of a course taught by **Professor Guilherme** ([GitHub](https://github.com/guiigos)), focusing on learning dynamic DOM manipulation and integrating JavaScript with static structures.

## 📄 License

This project was developed for educational purposes.

---

**Developed with 🤖 AI + 👨‍💻 Hands-on Learning**

*Demonstrating the integration between AI tools and traditional web development*
