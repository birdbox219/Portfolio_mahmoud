/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-error-container": "#93000a",
        "tertiary-container": "#dbd8ca",
        "secondary-fixed-dim": "#ccc7b2",
        "secondary": "#625f4e",
        "on-surface-variant": "#48473e",
        "on-secondary-fixed": "#1e1c0f",
        "error": "#ba1a1a",
        "on-secondary-container": "#686554",
        "surface-container-lowest": "#ffffff",
        "secondary-container": "#e8e3cd",
        "primary-fixed-dim": "#cbc7b0",
        "primary": "#615f4c",
        "error-container": "#ffdad6",
        "primary-fixed": "#e7e3cb",
        "inverse-on-surface": "#f2f1e8",
        "surface-container-low": "#f5f4eb",
        "on-secondary": "#ffffff",
        "surface-dim": "#dbdad2",
        "tertiary-fixed-dim": "#cac7ba",
        "on-surface": "#1b1c17",
        "on-primary-fixed-variant": "#494736",
        "on-primary-container": "#605e4b",
        "surface-container-highest": "#e4e3da",
        "background": "#fbfaf1",
        "on-primary": "#ffffff",
        "surface": "#fbfaf1",
        "on-primary-fixed": "#1d1c0d",
        "on-tertiary-fixed-variant": "#48473d",
        "surface-bright": "#fbfaf1",
        "on-tertiary-container": "#5f5e53",
        "surface-tint": "#615f4c",
        "tertiary-fixed": "#e6e3d5",
        "on-error": "#ffffff",
        "on-secondary-fixed-variant": "#4a4737",
        "on-background": "#1b1c17",
        "primary-container": "#dcd8c0",
        "secondary-fixed": "#e8e3cd",
        "outline-variant": "#cac6bb",
        "inverse-surface": "#30312b",
        "on-tertiary-fixed": "#1c1c14",
        "surface-variant": "#e4e3da",
        "surface-container": "#efeee5",
        "outline": "#79776d",
        "tertiary": "#605f54",
        "inverse-primary": "#cbc7b0",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#e9e8e0"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "stack-md": "16px",
        "stack-sm": "8px",
        "stack-lg": "32px",
        "margin": "32px",
        "gutter": "16px",
        "unit": "4px",
        "container-max": "1280px"
      },
      "fontFamily": {
        "body-lg": ["Inter"],
        "label-md": ["Space Grotesk"],
        "headline-md": ["Space Grotesk"],
        "headline-lg": ["Space Grotesk"],
        "body-md": ["Inter"],
        "label-sm": ["Space Grotesk"]
      },
      "fontSize": {
        "body-lg": ["16px", { "lineHeight": "1.6", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "1", "letterSpacing": "0.15em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "1.2", "letterSpacing": "0.08em", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "0.1em", "fontWeight": "500" }],
        "body-md": ["14px", { "lineHeight": "1.5", "letterSpacing": "0.02em", "fontWeight": "400" }],
        "label-sm": ["10px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "500" }]
      }
    }
  },
  plugins: [],
}
