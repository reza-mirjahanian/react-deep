TL;DR: Generate a unique id for every item and use it as key when rendering the list.

## Exception 

To help you decide, I put together three conditions which these examples have in common:

1.  the list and items are static--they are not computed and do not change;
2.  the items in the list have no ids;
3.  the list is *never* reordered or filtered.

When *all* of them are met, you **may safely use the index as a key**.

------------


All in all, it should be a deliberate strategy rather than a default. Keying is essentially a way of memoizing a list's elements, and like most memoization techniques, you only get value out of it if dependencies don't frequently change.

If you have a list of entities, let's say they're people.

1.  Bob

2.  Joe

3.  Fred

React creates a DOM element for each person and ties the DOM element to its key. If the key is the index, then you haven't actually uniquely identified each entity. If you remove Bob, now Joe is the first item and Fred is the second item. So it'd have to remove the third DOM element, and then change the first DOM element to show Joe's information and then the second DOM element to show Fred's information. This isn't the end of the world for small lists, but it's not ideal. It dramatically adds up for, say, data tables.

If you instead keyed each entity by something that uniquely identifies that entity, then it clues React into when it can reuse DOM elements instead of generating new ones. That way when you remove Bob, React notices that Bob is no longer in the list, so it removes that DOM element, and then it notices that the components for Joe and Fred didn't actually change, so the DOM doesn't need to be updated either. It's far more efficient this way.

So, if your lists never change, then yes, essentially the index is a suitable enough identifier for an entity because that entity will always have that index. It's similar to using an automatically incrementing counter for the key column in a database in that sense. It's not always a bad idea, it's just not a good default and requires deliberate consideration for when it is suitable enough.