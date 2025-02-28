import { Devvit, useWebView } from '@devvit/public-api';
import { DEVVIT_SETTINGS_KEYS } from './constants.js';
import { BlocksToWebviewMessage, WebviewToBlockMessage } from '../game/shared.js';
import { Preview } from './components/Preview.js';

Devvit.addSettings([
  // Just here as an example
  {
    name: DEVVIT_SETTINGS_KEYS.SECRET_API_KEY,
    label: 'API Key for secret things',
    type: 'string',
    isSecret: true,
    scope: 'app',
  },
]);

Devvit.configure({
  redditAPI: true,
  http: true,
  redis: true,
  realtime: true,
});

Devvit.addMenuItem({
  // Please update as you work on your idea!
  label: 'Make my experience post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      // Title of the post. You'll want to update!
      title: 'My first experience post',
      subredditName: subreddit.name,
      preview: <Preview />,
    });
    ui.showToast({ text: 'Created post!' });
    ui.navigateTo(post.url);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'tall',
  render: (context) => {
    const { mount } = useWebView<WebviewToBlockMessage, BlocksToWebviewMessage>({
      onMessage: async (event, { postMessage }) => {
        switch (event.type) {
          case 'INIT':
            postMessage({
              type: 'INIT_RESPONSE',
              payload: {
                postId: context.postId!,
              },
            });
            break;
          default:
            console.error('Unknown message type', event.type satisfies never);
            break;
        }
      },
    });

    return (
      <vstack height="100%" width="100%" alignment="center middle">
        <button
          onPress={() => {
            mount();
          }}
        >
          Launch
        </button>
      </vstack>
    );
  },
});

export default Devvit;
