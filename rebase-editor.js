const fs = require('fs');
const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8');

if (file.includes('git-rebase-todo')) {
  content = content.replace(/^pick /gm, 'reword ');
} 
else if (file.includes('COMMIT_EDITMSG')) {
  // Use exact matching to avoid partial replacement bugs
  content = content.replace(/^chore: initial project generation: Cabanatuan City Ordinance Portal Ionic Prototype$/m, 'feat: implement Cabanatuan City Ordinance Portal prototype');
}

fs.writeFileSync(file, content);
