import {type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';

export default function render(element: ReactNode) {
    const dom = document.querySelector('#react-root');
    if (dom !== null) {
        try {
            createRoot(dom).render(element);
            return;
        } catch (error) {
            console.error('Failed to render element', error);
        }
    }

    const errorHeader = document.createElement('h1');
    errorHeader.textContent = 'Failed to load application.';

    const errorText = document.createElement('p');
    errorText.textContent = 'An error occurred while loading the application.\n' +
        'Please make sure you are using a current browser version.';

    const errorDiv = document.createElement('div');
    errorDiv.append(errorHeader, errorText);

    document.body.append(errorDiv);
}