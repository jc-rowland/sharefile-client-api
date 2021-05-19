import "core-js/stable";
import "regenerator-runtime/runtime";
import sharefileNodeApi from './sharefile-node-api.js'

// Do dev-testing to your module here
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Dev mode enabled')
  window.sharefileNodeApi = sharefileNodeApi
}

// Library export
export default sharefileNodeApi
