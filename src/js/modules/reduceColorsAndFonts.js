import $ from 'jquery';

export default (elements) => {
  const reduced = elements.reduce((prev, curr) => {
    // Derives all the colors
    Object.keys(prev.colors).forEach((prop) => {
      const colorValue = $(curr).css(prop);

      // Store colors in respective buckets
      if (colorValue && $.inArray(colorValue, prev.colors[prop]) === -1) {
        prev.colors[prop].push(colorValue);
      }

      // Create "allColors" array to store all colors not broken out by type
      if (colorValue && $.inArray(colorValue, prev.results.allColors) === -1) {
        prev.results.allColors.push(colorValue);
      }
    });

    // Derives all the fonts
    Object.keys(prev.fonts).forEach((prop) => {
      // Separates out font declarations by commas
      const fontValue = $(curr).css(prop).split(',');

      // Trims lead/trailing spaces/quotes
      fontValue.forEach((font) => {
        font = font.trim().replace(/\'/g, '');
        // Store fonts in respective buckets
        if (font && $.inArray(font, prev.fonts[prop]) === -1) {
          prev.fonts[prop].push(font);
        }

        // Create "allFonts" array to store all fonts not broken out by type
        if (font && $.inArray(font, prev.results.allFonts) === -1) {
          prev.results.allFonts.push(font);
        }
      });
    });

    return prev;
  }, {
    "colors": {
      "color": [],
      "background-color": [],
      "border-bottom-color": [],
      "border-left-color": [],
      "border-right-color": [],
      "border-top-color": [],
      "text-decoration-color": [],
      "outline-color": [],
      "column-rule-color": []
    },
    "fonts": {
      "font-family": []
    },
    "results": {
      "allColors": [],
      "allFonts": [],
      "allImages": []
    }
  });

  // Sort fonts in alphabetical order
  reduced.results.allFonts.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  return reduced;
};
