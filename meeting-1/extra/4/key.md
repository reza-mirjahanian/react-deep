## All the keys are in the right places!

That is all for today! Hope you liked the read and have a better understanding now of how React “key” attribute works,
how to use it correctly, and even how to bend its rules to your will and cheat your way through the performance game.

A few key takeaways to leave with:

- never use random value in the “key” attribute: it will cause the item to re-mount on every render. Unless of course,
  this is your intention
- there is no harm in using the array’s index as “key” in “static” lists - those whose items number and order stay the
  same
- use item unique identifier (“id”) as “key” when the list can be re-sorted or items can be added in random places
- you can use the array’s index as “key” for dynamic lists with stateless items, where items are replaced with the new
  ones - paginated lists, search and autocomplete results and the like. This will improve the list’s performance.
