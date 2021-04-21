# Roadmap

## Components

## Injection System

## Providers

- [ ] A rich set of providers for the injection system.

## Event System

- [ ] Events should bubble (currently, they are terminated at the first listener)
- [ ] Services should be able to emit events
- [ ] Services should be able to broadcast events.

## Rendering

- [ ] Content Projection

## QRL

## Server

- [ ] Developer should `import 'qoot'`, and the server should translate it to relative URL.

## STATE MANAGEMENT

- [ ] Could we make $state immutable? Changes would require setting `new` state, which would auto call `markDirty`. Explore: https://github.com/immerjs/immer; https://github.com/mobxjs/mobx; https://github.com/mobxjs/mobx-state-tree