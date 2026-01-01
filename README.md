# Reportgenix Tools Plugin

A simple WordPress plugin that adds a custom post type for tools with Gutenberg block editor support and custom templates.

## Features

- **Custom Post Type**: `tool` with clean URL structure (`tools/{slug}`)
- **Gutenberg Support**: Full block editor integration
- **Custom Templates**: Separate template files for single and archive pages
- **Archive Page**: Grid layout displaying all tools at `/tools/`
- **Single Page**: Detailed tool page with full content at `/tools/{tool-name}/`
- **Translation Ready**: All strings are internationalized
- **Theme Compatible**: Works with any WordPress theme

## Installation

1. Upload the `reportgenix-tools` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to 'Tools' in the WordPress admin to add new tools

## Usage

### Creating a Tool

1. Navigate to **Tools > Add New** in WordPress admin
2. Enter the tool title
3. Use the Gutenberg block editor to add content
4. Add a featured image (optional)
5. Publish

### Viewing Tools

- **Archive**: Visit `yoursite.com/tools/` to see all tools
- **Single Tool**: Visit `yoursite.com/tools/your-tool-name/` for individual tools

## File Structure

```
reportgenix-tools/
├── reportgenix-tools.php      # Main plugin file
├── templates/
│   ├── single-tool.php        # Single tool template
│   └── archive-tool.php       # Archive page template
└── README.md                  # Documentation
```

## Template Customization

The plugin includes two custom templates:

### Single Tool Template (`templates/single-tool.php`)
Displays individual tool posts with:
- Title, date, and author
- Featured image
- Full Gutenberg content
- Comments section

### Archive Template (`templates/archive-tool.php`)
Displays all tools in a grid layout with:
- Tool thumbnails
- Titles and excerpts
- "View Tool" links
- Pagination

You can customize these templates by editing the files in the `templates/` directory.

## Requirements

- WordPress 5.8 or higher
- PHP 7.4 or higher

## Support

For support, please visit [Reportgenix](https://reportgenix.com)

## License

GPL v2 or later
