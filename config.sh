# This script copies each line in .env file to src/config.js
# It ignores comments lines, replaces '=' with ': ', and prepends each line with two spaces
# It also wraps the values copied from .env file in a module.exports template

FILE=.env
if [ -f "$FILE" ]; then
  echo "Creating src/config.js using contents of existing $FILE file"
  printf 'module.exports = {\n' > src/config.js
  sed 's/^#.*//' .env | sed 's/=/: /' | sed 's/^/  /' >> src/config.js
  printf '}\n' >> src/config.js
  return 0
else
  echo ""
  echo "ERROR: File $FILE does not exist." >> /dev/stderr
  echo "Create a file called '.env'. Add the line below to set SERVER_URL."
  echo "Update value as appropriate. Include server path-mapping (final '/' in example below)."
  echo ""
  echo "SERVER_URL='ws://my-server.my-domain.com/'"
  echo ""
  return 1
fi