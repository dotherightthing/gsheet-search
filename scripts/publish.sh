#!/bin/bash
#
# File: ./scripts/publish.sh
#
# Note:
# chmod a+x = Change access permissions of this file, to 'e[x]ecutable' for '[a]ll users'
#
# Example:
# ---
# chmod a+x scripts/*sh
# ---

# e: exit the script if any statement returns a non-true return value
# v: print shell input lines as they are read (including all comments!)
set -e

# arguments passed to this script
DEPLOYMENT_ID=$1
KRM_MESSAGE=$2

# get current project version from clasp
CLASP_VERSIONS=`npx clasp versions` # ~ 6 Versions ~ ...
CLASP_VERSION="$(echo $CLASP_VERSIONS | cut -d '~' -f2 | xargs | cut -d ' ' -f1 )" # 6
CLASP_VERSION_BUMP=$(($CLASP_VERSION + 1)) # 7

# get publish date
PUBLISH_DATE=`date +%d.%m.%Y`
PUBLISH_DATE_FOR_HISTORY=`date +%Y-%m-%d`

# get current version number from package json
NPM_VERSION=`node -p "require('./package.json').version"` # 0.6.0
NPM_VERSION_BUMP=${NPM_VERSION/$CLASP_VERSION/$CLASP_VERSION_BUMP} # 0.7.0

# Version.part.html exposes version to UI
VERSION_FILE='./src/Partials/Version.part.html'

# VersionHistory.part.html exposes version via Spreadsheet modal
TAGS_FILE='./src/Partials/VersionHistory.part.html'

# create new version and deploy to Apps Script platform
cd $INIT_CWD \
&& echo "v$CLASP_VERSION_BUMP - $PUBLISH_DATE" > $VERSION_FILE \
&& echo > $TAGS_FILE \
&& echo '<table><thead><tr><th>Version</th><th>When</th><th>Summary</th></tr></thead><tbody>' >> $TAGS_FILE \
&& echo "<tr><td>0.$CLASP_VERSION_BUMP.0</td><td>$PUBLISH_DATE_FOR_HISTORY</td><td>$KRM_MESSAGE.</td></tr>" >> $TAGS_FILE \
&& git log --no-walk --tags --pretty="<tr><td>%D</td><td>%cd</td><td>%s</td></tr>" --date=short | sed 's/tag: v//' | sed 's/HEAD -> main, //' | sed 's/, origin\/main//' >> $TAGS_FILE \
&& echo '</tbody></table>' >> $TAGS_FILE \
&& git add $TAGS_FILE \
&& git add $VERSION_FILE \
&& git commit -m "Bump version" \
&& npm version $NPM_VERSION_BUMP --message "$KRM_MESSAGE" \
&& npm run clasp:push \
&& npx clasp version "$KRM_MESSAGE" \
&& npx clasp deploy --description "$KRM_MESSAGE" --deploymentId $DEPLOYMENT_ID --versionNumber $CLASP_VERSION_BUMP \
&& npx clasp open --webapp --deploymentId $DEPLOYMENT_ID