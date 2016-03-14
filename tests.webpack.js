window.ObjectAssign.polyfill() // Object.assign polyfill

// Grab all javascript files
const srcContext = require.context('./src/app', true, /\.js$/)
srcContext.keys().forEach(srcContext)

// const testsContext = require.context('./src/app', true, /spec\.js$/)
// testsContext.keys().forEach(testsContext)
//
// const srcContext = require.context('./src/app', true, /!(spec\.js)$/)
// srcContext.keys().forEach(srcContext)
