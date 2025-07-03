#!/usr/bin/env node

/**
 * Migration script to update CSS class names in JavaScript files
 * Run this script to automatically update all class references
 */

const fs = require('fs');
const path = require('path');

// Class name mappings
const classMapping = {
    // Card classes
    'featured-card': 'card card--featured',
    'recent-card': 'card card--recent',
    'small-card': 'card card--small',
    'staff-card': 'card card--staff',
    'issue-card': 'card card--issue',
    
    // Button classes
    'button-primary': 'btn btn--primary',
    'button-secondary': 'btn btn--secondary',
    'button-subscribe': 'btn btn--primary',
    
    // Form classes
    'subscribe-input': 'form-input',
    'contact-input': 'form-input',
    'form-error-message': 'form-error',
    'form-success-message': 'form-success',
    
    // Other common classes
    'article-grid': 'grid article-grid',
    'staff-grid': 'grid staff-grid',
    'issue-list': 'grid issue-list',
};

// Files to process
const filesToProcess = [
    'js/components/cards/ArticleCard.js',
    'js/components/cards/FeaturedCard.js',
    'js/components/cards/RecentCard.js',
    'js/components/cards/SmallCard.js',
    'js/components/forms/ContactForm.js',
    'js/components/common/ContactDetails.js',
    'js/pages/about.js',
    'js/pages/articleList.js',
    'js/pages/contact.js',
    'js/pages/home.js',
    'js/pages/issues.js',
    'js/pages/searchResults.js',
    'js/pages/singleArticle.js',
    'js/pages/subscribe.js',
    'js/lib/headerSearch.js',
    'js/lib/modal.js',
];

// Function to update class names in a file
function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Replace each class mapping
        for (const [oldClass, newClass] of Object.entries(classMapping)) {
            // Match class in various contexts
            const patterns = [
                // In class attribute strings
                new RegExp(`class="([^"]*\\b)${oldClass}(\\b[^"]*)"`, 'g'),
                new RegExp(`className="([^"]*\\b)${oldClass}(\\b[^"]*)"`, 'g'),
                new RegExp(`class='([^']*\\b)${oldClass}(\\b[^']*)'`, 'g'),
                new RegExp(`className='([^']*\\b)${oldClass}(\\b[^']*)'`, 'g'),
                // In template literals
                new RegExp(`class=\`([^\`]*\\b)${oldClass}(\\b[^\`]*)\``, 'g'),
                new RegExp(`className=\`([^\`]*\\b)${oldClass}(\\b[^\`]*)\``, 'g'),
                // In classList operations
                new RegExp(`classList\\.(add|remove|toggle|contains)\\(['"\`]${oldClass}['"\`]\\)`, 'g'),
                // In querySelector
                new RegExp(`querySelector\\(['"\`]\\.${oldClass}['"\`]\\)`, 'g'),
                new RegExp(`querySelectorAll\\(['"\`]\\.${oldClass}['"\`]\\)`, 'g'),
            ];
            
            patterns.forEach(pattern => {
                if (content.match(pattern)) {
                    modified = true;
                    if (pattern.source.includes('querySelector')) {
                        // For querySelector, we need to handle multiple classes differently
                        const newClasses = newClass.split(' ').map(c => `.${c}`).join('');
                        content = content.replace(pattern, (match, p1) => {
                            return match.replace(`.${oldClass}`, newClasses);
                        });
                    } else if (pattern.source.includes('classList')) {
                        // For classList operations, we can only use the modifier class
                        const modifierClass = newClass.split(' ').pop();
                        content = content.replace(pattern, (match, method) => {
                            return `classList.${method}('${modifierClass}')`;
                        });
                    } else {
                        // For class attributes, replace the old class with new classes
                        content = content.replace(pattern, (match, p1, p2) => {
                            return match.replace(`${p1}${oldClass}${p2}`, `${p1}${newClass}${p2}`);
                        });
                    }
                }
            });
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Updated: ${filePath}`);
            return true;
        } else {
            console.log(`  No changes: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Main execution
console.log('CSS Class Migration Script');
console.log('=========================\n');

let updatedCount = 0;
let errorCount = 0;

filesToProcess.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        if (updateFile(filePath)) {
            updatedCount++;
        }
    } else {
        console.log(`✗ File not found: ${file}`);
        errorCount++;
    }
});

console.log('\n=========================');
console.log(`Migration complete!`);
console.log(`Files updated: ${updatedCount}`);
console.log(`Errors: ${errorCount}`);
console.log('\nNext steps:');
console.log('1. Review the changes in your version control');
console.log('2. Test the application thoroughly');
console.log('3. Update any custom JavaScript not covered by this script');