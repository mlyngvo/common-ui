import React, {type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';

export function render(element: ReactNode) {
    const dom = document.querySelector('#react-root');
    if (dom !== null) {
        try {
            createRoot(dom).render(element);
            return;
        } catch (error) {
            console.error('Failed to render element', error);
        }
    }
    createRoot(document.body).render((
        <div>
            <h1>Failed to load application.</h1>
            <p>
                An error occurred while loading the application.
                Please make sure you are using a current browser version.
            </p>
        </div>
    ));
}