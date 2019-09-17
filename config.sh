# This script copies each line in .env file to src/config.js
# It ignores comments lines, replaces '=' with ': ', and prepends each line with two spaces
# It also wraps the values copied from .env file in a module.exports template

printf 'module.exports = {\n' > src/config.js
sed 's/^#.*//' .env | sed 's/=/: /' | sed 's/^/  /' >> src/config.js
printf '\n}\n' >> src/config.js

