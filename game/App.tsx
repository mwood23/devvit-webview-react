import { useEffect, useState } from 'react';
import { cn, sendToDevvit } from './utils';
import { useDevvitListener } from './hooks/useDevvitListener';

export const App = () => {
  const [postId, setPostId] = useState('');
  const initData = useDevvitListener('INIT_RESPONSE');
  useEffect(() => {
    sendToDevvit({ type: 'INIT' });
  }, []);

  useEffect(() => {
    if (initData) {
      setPostId(initData.postId);
    }
  }, [initData, setPostId]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />

      <h1 className={cn('relative z-20 text-xl text-white md:text-4xl')}>Welcome to Devvit</h1>
      <p className="relative z-20 mt-2 mb-4 text-center text-neutral-300">
        Let's build something awesome!
      </p>
      <img src="/assets/default-snoovatar.png" alt="default snoovatar picture" />
      <p className="relative z-20 mt-2 mb-4 text-center text-neutral-300">PostId: {postId}</p>
    </div>
  );
};
