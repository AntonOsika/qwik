import { assertDefined } from '../assert/assert';
import type { RenderContext } from '../render/cursor';
import { visitJsxNode } from '../render/render';
import { ComponentScopedStyles, OnRenderProp } from '../util/markers';
import { then } from '../util/promises';
import { styleContent, styleHost } from './qrl-styles';
import { newInvokeContext, useInvoke } from '../use/use-core';
import { getContext, getEvent, QContext } from '../props/props';
import type { JSXNode, ValueOrPromise } from '..';

// TODO(misko): Can we get rid of this whole file, and instead teach getProps to know how to render
// the advantage will be that the render capability would then be exposed to the outside world as well.

export class QComponentCtx {
  __brand__!: 'QComponentCtx';
  ctx: QContext;
  hostElement: HTMLElement;

  styleId: string | undefined | null = undefined;
  styleClass: string | null = null;
  styleHostClass: string | null = null;

  constructor(hostElement: HTMLElement) {
    this.hostElement = hostElement;
    this.ctx = getContext(hostElement);
  }

  render(ctx: RenderContext): ValueOrPromise<HTMLElement> {
    console.log('RENDERING');
    const hostElement = this.hostElement;
    const onRender = getEvent(this.ctx, OnRenderProp) as any as () => JSXNode;
    assertDefined(onRender);
    const event = 'qRender';
    const promise = useInvoke(newInvokeContext(hostElement, hostElement, event), onRender);
    return then(promise, (jsxNode) => {
      jsxNode = (jsxNode as any)[0];

      if (this.styleId === undefined) {
        const scopedStyleId = (this.styleId = hostElement.getAttribute(ComponentScopedStyles));
        if (scopedStyleId) {
          this.styleHostClass = styleHost(scopedStyleId);
          this.styleClass = styleContent(scopedStyleId);
        }
      }
      return visitJsxNode(ctx, hostElement, jsxNode, false);
    });
  }
}

const COMPONENT_PROP = '__qComponent__';

export function getQComponent(hostElement: Element): QComponentCtx | undefined {
  const element = hostElement as { [COMPONENT_PROP]?: QComponentCtx };
  let component = element[COMPONENT_PROP];
  if (!component)
    component = element[COMPONENT_PROP] = new QComponentCtx(hostElement as HTMLElement) as any;
  return component;
}
