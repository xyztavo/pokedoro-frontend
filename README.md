## KNOWN BUGS

- [ ] First request to api taking way too much time, render is causing that.

im doing a full rewrite using cloudfare workers, hono and turso. you can check it out at [pokemons-hono](https://github.com/gustafer/pokemons-hono)

- [x] total pages on pokedex when querying for a pokemon remains the same, should be solved on backend
- [x] on mobile, names may take to much space on button, so set a and add the maximum width on the button with the whitespace wrap and textoverflow ellipsis
      todo ID: 1 add validation to error and return specific error messages.
  - [x] maximum on backend
- [x] on mobile, new pokemon dialog taking a lot of space
