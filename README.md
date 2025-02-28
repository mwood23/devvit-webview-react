## Devvit Webview React

A template repository for writing webview apps with Devvit.

https://github.com/user-attachments/assets/5bf4d6ec-5ff1-49ce-8c50-f46e7fbac781

### Tech

- [Devvit](https://developers.reddit.com/docs/): Reddit’s Developer Platform that lets you build powerful apps and experiences to enhance the communities you love.
- [Vite](https://vite.dev/): Advanced build tool for the web
- [React](https://react.dev/): UI Library for the web
- [TailwindCSS](https://tailwindcss.com/): Utility first CSS framework
- [Typescript](https://www.typescriptlang.org/): Strongly typed Javascript superset
- [Motion](https://motion.dev/): Animation Library

## Getting started

> Make sure you have Node 22 downloaded on your machine before running!

```sh
git clone ....

cd ...

npm install
```

Before continuing, make a subreddit on Reddit.com. This will be where you do your own development. Go to Reddit.com, scroll the left side bar down to communities, and click "Create a community."

Next, go to the `package.json` and update see the `dev:devvit` command. Update the command to have you subreddit name.

Finally go to `devvit.yaml` and name your app. It has to be 0-16 characters. Once you have, click save, and run `npm run upload` from the root of the repository.

Now all you have to do is run `npm run dev` and navigate to the subreddit.

There is one last gotcha! You need to make a new post before you can see it. You can do so by going to your subreddit, clicking the three dots, and tapping "Make my experience post". After you start developing your all please update the menu item copy (found in `src/main.tsx`).

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run upload`: Uploads a new version of your app
- `npm run vite`: Useful to run just the React app on your machine if you need to style things quickly.

## Flow of the app

`main.tsx` is the main entry point of the application, it will have a launch button that actually launches the webview (stuff in `game/`).

In our case we are using webviews so we basically have a totally different application which then outputs to an `index.html` file which is rendered in the webview.

- `Preview.tsx`: It is the loading state till game launches
- `core/` : Contains api functions
- `utils/`: Has functions to call APIs and other utilities
- `constants.ts`: It is the env file for devvit
- `assets/`: Public folder for static assets

### Inside Actual Game

Entry point is `main.tsx`, which renders App like Vite does, INIT_RESPONSE is called from within an useEffect to send a ready message to the Devvit app.

- `HomePage.tsx` shows an example of routing and navigation with the `useSetPage` hook.
- `PokemonPage.tsx` shows an example of how to send network requests over postMessage.
- `/components` for reusable components

## What is webroot?

In dev platform apps, we have this folder called `/webroot` which includes the code actually ran in the webview on Reddit.com. You should commit this folder, but note that the act up playtesting, building, and uploading is what actually sends `/webroot` to our servers.

For the most part, you should never be in here unless you are debugging compilation issues. Since we are writing Typescript, everything you need is in `/game`. On build, we automatically place the output in `/webroot` so it should be mostly seamless for you!

## Cursor Integration

- Download cursor https://www.cursor.com/downloads
- Open the app (optionally import extensions if you'd like)
- Sign up for premium
- Click the settings cog at the top right hand size of the window
- Go to features:
  - enable `yolo mode`
    - TODO: Add a list of commands that you should disable
  - Make sure the codebase has been indexed. You can also delete and reindex. Interesting to see it working.
- Enable large context
- Go to models and enable the following (no need for API keys because you are paying):
  - claude-3.5-sonnet: Will require more coaching but can do what you need long as you encourage it. A workhorse model.
  - claude-3.7-sonnet: Will give you the entire world and do some crazy stuff. It's high agency, but sometimes you need to tell it to slow down and come up with simpler answers. Another workhorse.
  - claude-3.7-sonnet-thinking: Great for laying out a project and for thinking through game mechanics. Start here normally for big stuff.
  - gpt-4o: I'd compare this model to Mario in MarioKart. Mid all around, not spectacular at anything. When you need solid, go for it.
  - o3-mini: Another model great for laying out stuff and thinking. Sometimes better than 3.7-sonnet-thinking.
- Go to rules:
  - User rules:
  ```
    - Keep answers concise and direct
    - Prioritize technical details over generic advice
    - If you do not know the answer, say so instead of guessing
  ```
  -

## Cursor Tips for Maximum Vibes

Cursor can be overwhelming, so here are the three main things I do and when I do them.

Before doing anything, you have to learn managing context. Context is essentially the information you're preloading into the LLM before chatting (remember Neo learning kung-fu in the Matrix? Pretty similar). HOWEVER, you can't load it with LITERALLY EVERYTHING otherwise it'll get super confused. Modern models also have limited context windows (if you've ever noticed an LLM forgetting things after talk to it for a while, this is why). So to maximize the Cursor vibes you have to manage context. But don't worry, it's much simpler than managing memory.

Here's how I approach it:

- Always add the file current file when you are adding a feature. Then, if you are having trouble on a particular line, highlight it and press `cmd + l` (or `cmd + i` if chat mode). You're saying to Cursor, "I have a problem in this file, specifically this line." Helps a bunch.
- Next, I'll add relevant files to the context (but I typically make sure all of the files I add are under 1-2k lines of code). This is anecdotal.

Once my context is right, I'll write out the prompt, and it has to be thoughtful!

Bad vibes:
Can you fix this bug?

Good vibes:
I'm seeing a problem where my application is crashing. I've narrowed it down to the lines I've attached to this message. I've also added relevant files that I think are related.

- file 1: does xyz
- file 2: does xyz

Can you try to fix this issue for me? Please think through your response and take your time.

Either prompt _might_ solve your problem. But, I can tell you that being _thoughful_ in your prompting can make a huge difference. I spent 2-3 hours debugging an issue where I was integrating code from an example codebase into my other codebase. Could not figure it out. I lazy prompted and got nothing. But after spinning my wheels I copy/pasted the example code into the message, explained my error in detail, and asked it to integrate this example code into my other codebase. One shotted it in 30 seconds. Prompting and context matters.

> Gotcha: If you code with 20 open tabs like me this can mess up your contest! Check that the context is what you want before prompting too hard.

Along the same lines of managing context is managing chats. I create new chats for new issues or features. I rarely go back to old chats. The main reason is because of managing context. I don't want to give the LLM anything that could confuse it. Make new chats often!

Here are some general workflows I follow:

- Making a new feature: Use composer (`cmd + i`) and use `3.5-sonnet` or `3.7-thinking`. Make sure the context is aligned. For example, if you are adding a new button to a component, make sure that component (and other other files that are helpful) are in the context.
- How does something in Devvit work: Use composer (`cmd + i`) and use `3.7-thinking` and `o3-mini`. Make sure the `/reference` folder is in the context by dragging and dropping the folder. Then ask it a questions like: ` Can you walk me through how realtime works step by step?`. Note: It could be very in the weeds so ask it to go higher level or ELI5 if you need!
- General Typescript patterns or helper functions: Use chat (`cmd + l`) and `3.5-sonnet` or `gpt-4o`. This is great for things like `Can you tell me more about how promises work?` or `Can you make a me a deep copy function in typescript?`.

I use the `tab` autocomplete a bunch, but I rarely use the `cmd + k` inline code editing. I always find I want the agent to either do literally everything or I want to copy paste from chat. If you have a killer workflow for inline editing please let me know!

### General workflow

- Start a playtest session with `npm run dev`
- Make your post on the subreddit you are testing on
- Make sure it's all working and go to cursor
-
