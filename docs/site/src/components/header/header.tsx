import { onRender$, component, Host, withStyles$, $ } from '@builder.io/qwik';
import { GithubLogo } from '../svgs/github-logo';
import styles from './header.css';

export const Header = component(
  'header',
  $(() => {
    withStyles$(styles);

    return onRender$(() => (
      <Host className="sticky top-0 z-40 w-full flex-none p-4 bg-gray-900">
        <div className="flex justify-between flex-wrap max-w-7xl mx-auto">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <a href="/" class="hover:opacity-70">
              <span className="sr-only">Qwik Homepage</span>
              <img src="/logos/qwik.svg" alt="Qwik Logo" class="logo" />
            </a>
          </div>
          <nav className="grow flex justify-end">
            <a
              className="font-semibold text-slate-400 hover:text-slate-500 px-2 mx-2"
              href="/docs/"
            >
              Docs
            </a>
            <a
              className="font-semibold text-slate-400 hover:text-slate-500 px-2 ml-2"
              href="https://qwik-playground.builder.io/"
            >
              Playground
            </a>
          </nav>
          <div className="flex justify-items-end flex-shrink-0 text-white ml-6 pt-1">
            <a
              href="https://github.com/BuilderIO/qwik"
              className="ml-2 block text-slate-400 hover:text-slate-500"
              target="_blank"
            >
              <span className="sr-only">Qwik on GitHub</span>
              <GithubLogo />
            </a>
          </div>
        </div>
      </Host>
    ));
  })
);