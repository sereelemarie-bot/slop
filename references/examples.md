# Before/After Examples

Full-paragraph transformations. Each one shows several rules fixing the same
passage at once — that's how the edit actually happens in practice.

## Example 1: Product announcement

**Before:**
> It's important to note that our new caching layer is a game-changer. It's
> not just faster — it's fundamentally more reliable. The old system would
> occasionally fail. Silently. Without warning. This underscores why we
> rebuilt it from the ground up, and the results speak for themselves.

**After:**
> The new caching layer fails less. The old one dropped requests without
> logging an error, so a page would just serve stale data and nobody would
> know until a customer complained. We rebuilt the cache to log every miss
> and alert on failure rate, not just failure count.

What changed: cut "it's important to note," "game-changer," "underscores,"
and "results speak for themselves." Replaced the binary contrast ("not just
X, it's Y") with a specific claim. Replaced the three-fragment drumroll
("Silently. Without warning.") with one sentence naming what actually broke.
Gave the rebuild a reason instead of a declaration.

## Example 2: Technical explanation

**Before:**
> When it comes to database indexing, there are several factors to consider.
> Indexes can significantly improve query performance, but they also come
> with tradeoffs. Not only do they take up disk space, they also slow down
> writes. At the end of the day, it's a balancing act.

**After:**
> An index speeds up the queries that use it and slows down every write to
> that table, because the database has to update the index too. A table with
> ten indexes and a high write rate will feel that cost on every insert.

What changed: cut "when it comes to," "significantly," "at the end of the
day," "balancing act." Replaced the negative listing ("not only... they
also...") with a causal explanation of why the tradeoff exists. Added a
concrete case (ten indexes, high write rate) instead of leaving the claim
abstract.

## Example 3: Essay-style reflection

**Before:**
> Nobody sets out to build a bad process. Yet somehow, over time, the
> exceptions pile up, the workarounds multiply, and the original process
> becomes unrecognizable. The reasons are structural. This is worth sitting
> with.

**After:**
> You don't set out to build a bad process. You approve one exception
> because the deadline is real. Someone else copies that exception six
> months later because it's precedent now. A team lead adds a workaround on
> top of that because nobody remembers why the exception existed in the
> first place. Three years in, the process nobody designed is the one
> everybody follows.

What changed: replaced the narrator-from-a-distance "nobody" with "you," so
the reader is in the scene. Replaced false agency ("the exceptions pile
up," "the process becomes unrecognizable") with people doing specific
things in order. Cut the vague declarative ("the reasons are structural")
and the meta-joiner pull-quote ("this is worth sitting with") — the scene
already makes the point.

## Example 4: Email/status update

**Before:**
> Just a quick note to say that we've made great progress this week! The
> team has been working incredibly hard, and I'm happy to report that
> things are moving in the right direction. We'll definitely keep you
> posted as things develop.

**After:**
> We shipped the login redesign and fixed the timeout bug that was dropping
> about 2% of checkouts. Next week: the payment retry logic.

What changed: cut every throat-clearing opener and adverb ("just a quick
note," "incredibly," "definitely"). Removed the vague declarative ("things
are moving in the right direction") and replaced it with what actually
happened, with a number attached. Cut the soft close ("we'll keep you
posted") since the next line already tells the reader what's coming.
