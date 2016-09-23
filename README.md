# meteor-trivia

An event-driven web application and client, whose events pass through a Redux store, emitting a stream of states, which change a persistent store (DOM, or DB) regularly.

That stream of states is subscribed to by a difference engine, which calculates when, and how to update the persistent store.

Both the web application and its client publish a stream of events for the other side to observe.


# Getting started
* `npm run` - to view a list of tasks
* `.githooks/pre-commit/quality.sh` - see the githooks that police commits
