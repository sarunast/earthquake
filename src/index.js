import { render as renderApp } from './app/main-view'
import './styles.css'

// Accept hot module reloading during development
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}

// lets load our earthquake application
render(
  renderApp(),
  document.getElementById('page-content')
)

/**
 * Renders the element (React style)
 * @param dom
 * @param container
 */
function render(dom, container) {
  container.appendChild(dom)
}
