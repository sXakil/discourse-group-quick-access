## <Plugin Title>

A simple plugin that adds a quick access bar for specified groups with color coded dots

## Installation

Follow the [plugin installation guide](https://meta.discourse.org/t/install-a-plugin/19157).

## How to use

Go to `/admin/plugins` > Group quick access > `Settings`

---

In quick access groups, enter the group names followed by color codes, use pipe `|` as a separator.

Example: `moderators#ff0000|staff#00ff00`

---

In quick access link template, you can customize the quick access link, use `{group_name}` as a placeholder for group name.

Example: `/g/{group_name}`

## License

MIT