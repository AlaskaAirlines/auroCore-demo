# auro-demo

auro-demo provides users a way to ...

## Properties

| Property          | Attribute         | Type      | Default | Description                               |
|-------------------|-------------------|-----------|---------|-------------------------------------------|
| `allowIconChange` | `allowIconChange` | `boolean` |         |                                           |
| `allowTextChange` | `allowTextChange` | `boolean` |         |                                           |
| `behaviors`       | `behaviors`       | `array`   |         |                                           |
| `darkMode`        | `darkMode`        | `boolean` |         |                                           |
| `demoElement`     | `demoElement`     | `object`  |         |                                           |
| `header`          | `header`          | `String`  |         | Sets the header text for the demo widget. |
| `icon`            | `icon`            | `string`  |         |                                           |
| `markdown`        |                   |           |         |                                           |
| `onDark`          | `onDark`          | `boolean` |         |                                           |
| `showCode`        | `showCode`        | `boolean` | false   |                                           |
| `svg`             | `svg`             | `string`  |         |                                           |
| `text`            | `text`            | `string`  |         |                                           |
| `variations`      | `variations`      | `array`   |         |                                           |

## Methods

| Method                     | Type                          |
|----------------------------|-------------------------------|
| `behaviorChangeHandler`    | `(event: any): void`          |
| `iconInputChangeHandler`   | `(event: any): Promise<void>` |
| `textContentChangeHandler` | `(event: any): void`          |
| `toggleDarkMode`           | `(event: any): void`          |
| `toggleShowCode`           | `(event: any): void`          |
| `updateCode`               | `(): void`                    |
| `updateIcon`               | `(): Promise<void>`           |
| `variationChangeHandler`   | `(event: any): void`          |
