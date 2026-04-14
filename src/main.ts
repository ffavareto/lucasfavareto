import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const easterEggArt = [
  '   ,~.',
  '  (o o)',
  ' /  V  \\',
  '/(  _  )\\',
  '  ^^ ^^',
].join('\n');

console.log(
  `%c${easterEggArt}`,
  'color:#da3b32;font-family:monospace;font-weight:700;line-height:1.1;'
);
console.log(
  '%cVocê encontrou a galinha secreta do site.',
  'color:#6e6360;font-style:italic;'
);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
