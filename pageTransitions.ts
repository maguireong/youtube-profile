/**
 * Default Next.js behavior with getServerSideProps is whenever we navigate to a page,
 * the app has no UI changes until the props are received. This makes it look like the
 * application is frozen. This module provides tooling to handle page transition scenarios.
 * https://github.com/vercel/next.js/discussions/32243
 *
 * Also see a good discussion in our PR 831:
 * https://github.com/HeadsUpData/Kimono/pull/831#discussion_r884986903
 */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// The more we give, the more often we will not show the spinner, which is good.
// But 100ms is considered quite noticable in response to a user’s action
const justStartedDelay = 75;

type TransitionState =
  | { type: "loaded" }
  | { type: "loading"; destination: string; justStarted: boolean };

function useTransitionState(): TransitionState {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    type: "loaded",
  });

  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const start = (url: string) => {
      setTransitionState({
        type: "loading",
        destination: url,
        justStarted: true,
      });

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        setTransitionState((prev) =>
          prev.type === "loading" && prev.destination === url
            ? { ...prev, justStarted: false }
            : prev
        );
      }, justStartedDelay);
    };

    const end = () => setTransitionState({ type: "loaded" });

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      clearTimeout(timeout);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return transitionState;
}

/**
 * Returns current path, taking into account page transitions.
 * If the user clicks on a link, this will immediately be returning the new path.
 */
export function useCurrentPathWithTransitions(): string {
  const router = useRouter();
  const state = useTransitionState();
  if (state.type === "loading" && !state.justStarted) return state.destination;

  // Note that router.pathname gives a path with slugs not the actual pathname (e.g. `/campaigns/[id]`)
  return new URL(router.asPath, "https://example.com").pathname;
}

/**
 * Tells whether or not to show a loader for page navigation
 */
export function useShowPageTransitionLoader(): boolean {
  const state = useTransitionState();
  return state.type === "loading" && !state.justStarted;
}
