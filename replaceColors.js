const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];

const colorMappings = {
    'purple-900': 'emerald-900',
    'purple-800': 'emerald-800',
    'purple-700': 'emerald-700',
    'purple-600': 'emerald-600',
    'purple-500': 'emerald-500',
    'purple-400': 'emerald-400',
    'purple-300': 'emerald-300',
    'purple-200': 'emerald-200',
    'purple-100': 'emerald-100',
    'pink-900': 'teal-900',
    'pink-800': 'teal-800',
    'pink-700': 'teal-700',
    'pink-600': 'teal-600',
    'pink-500': 'teal-500',
    'pink-400': 'teal-400',
    'pink-300': 'teal-300',
    'pink-200': 'teal-200',
    'pink-100': 'teal-100',
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

let filesModified = 0;

directories.forEach(dir => {
    let fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
        walkDir(fullPath, (filePath) => {
            if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let newContent = content;
                
                for (let [oldColor, newColor] of Object.entries(colorMappings)) {
                    // Match the color names with word boundaries 
                    // e.g. text-purple-500
                    const regex = new RegExp(`(?<=[-\\s"'\`]|bg-|text-|border-|from-|via-|to-|ring-|shadow-|hover:|^)${oldColor}(?=[-\\s"'\`/]|$)`, 'g');
                    newContent = newContent.replace(regex, newColor);
                }

                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    filesModified++;
                    console.log(`Updated colors in ${filePath}`);
                }
            }
        });
    }
});

console.log(`Finished processing. Modified ${filesModified} files.`);
