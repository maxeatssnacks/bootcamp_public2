### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
    - React is a front-end framework that let's you create reusable components. You typically use it for single page web apps. You would use it when you want to create a scalable application with reusable components or when you want access to extensive libraries/tools.

- What is Babel?
    - Babel is a javascript compiler that converts JSX into regular javascript

- What is JSX?
    - JSX is a file extension that allows you to write HTML-like code in Javascript

- How is a Component created in React?
    - You can either create a component as a function or as a class
    - const ExampleComponent = () => {
        return (something)
    }

- What are some difference between state and props?
    - Props are read only and are passed down from the parent to the child. Changes in props will re render components. State is used for data that may change over time and can be managed with useState/setState/hooks

- What does "downward data flow" refer to in React?
    - Downard data flow refers to the child components being fed data from their parent

- What is a controlled component?
    - This is a form element whose value is controlled by React state. You would use an onChange function to constantly update the state as changes are made to the form elements. 
- What is an uncontrolled component?
    - An uncontrolled component is a form element that maintains it's own state. The data is handled in the DOM.
- What is the purpose of the `key` prop when rendering a list of components?
    - The key prop makes sure each element has a unique identifier 

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
    - If the array is sorted, or elements are deleted, weird things can start happening as React loses track of what is where.

- Describe useEffect.  What use cases is it used for in React components?
    - useEffect is a hook that lets you do side effects in components
    - You can use it for dataFetching

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
    - useRef returns a mutuable object. This allows you to pinpoint a DOM element by using the .current property. It does not cause a rerender.

- When would you use a ref? When wouldn't you use one?
    - Would use: Managing focus or media playback
    - Wouldn't use: Managing state that needs a re render, anywhere that you could just declare, with non-visual components

- What is a custom hook in React? When would you want to write one?
    - A custom hook can call other hooks which allows you to move reusable code into reusable functions
    - If you have messy, complex, or often repeated logic