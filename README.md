# Headline Editor

A powerful canvas-based headline editor for news websites, built with React, TypeScript, and Fabric.js.

## Installation

You can install the package using npm:

```bash
npm install @bugrakaann/headline-editor
```

Or using yarn:

```bash
yarn add @bugrakaann/headline-editor
```

Or using pnpm:

```bash
pnpm add @bugrakaann/headline-editor
```

## Usage

```tsx
import { HeadlineEditor } from "@bugrakaann/headline-editor";

function MyNewsEditor() {
  const handleSave = (dataUrl: string) => {
    // Handle the saved image data URL
    console.log("Saved image:", dataUrl);
  };

  return (
    <HeadlineEditor
      initialWidth={1200}
      initialHeight={630}
      onSave={handleSave}
      defaultBackgroundColor="#ffffff"
      defaultFontFamily="Arial"
      defaultFontSize={48}
      defaultTextColor="#000000"
    />
  );
}

export default MyNewsEditor;
```

## Props

| Prop                   | Type                      | Default   | Description                      |
| ---------------------- | ------------------------- | --------- | -------------------------------- |
| initialWidth           | number                    | 1200      | Initial canvas width             |
| initialHeight          | number                    | 630       | Initial canvas height            |
| onSave                 | (dataUrl: string) => void | -         | Callback when saving the image   |
| onClose                | () => void                | -         | Callback when closing the editor |
| defaultBackgroundColor | string                    | '#ffffff' | Default background color         |
| defaultFontFamily      | string                    | 'Arial'   | Default font family              |
| defaultFontSize        | number                    | 48        | Default font size                |
| defaultTextColor       | string                    | '#000000' | Default text color               |

## Features

- Canvas-based image editor
- Text manipulation with various fonts and sizes
- Background color customization
- Image export functionality
- Responsive design
- TypeScript support

## Development

To start development:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## License

MIT

---
