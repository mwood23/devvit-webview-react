import { BlocksToWebviewMessage } from './shared';
import { sendToDevvit } from './utils';

sendToDevvit({type: 'INIT'})

window.addEventListener('message', (event) => {
  const data = event.data.data.message as BlocksToWebviewMessage
  
  const postId = document.getElementById('postId')

  if (postId) {
    postId.textContent = data.payload.postId
  }
})

