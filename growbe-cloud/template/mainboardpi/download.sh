
TOKEN="{{=it.token}}"
REPO="growbe2/growbe-mainboard"
FILE="growbe-mainboard-arm-linux"
VERSION=$1
GITHUB="https://api.github.com"

OUTPUT="$FILE-$1"

echo $FILE $1

alias errcho='>&2 echo'

function gh_curl() {
  curl -H "Authorization: token $TOKEN" \
       -H "Accept: application/vnd.github.v3.raw" \
       $@
}

if [ "$VERSION" = "latest" ]; then
  # Github should return the latest release first.
  parser=".[0].assets | map(select(.name == \"$FILE\"))[0].id"
else
  parser=". | map(select(.tag_name == \"$VERSION\"))[0].assets | map(select(.name == \"$FILE\"))[0].id"
fi;

asset_id=`gh_curl -s $GITHUB/repos/$REPO/releases | jq "$parser"`
if [ "$asset_id" = "null" ]; then
  errcho "ERROR: version not found $VERSION"
  exit 1
fi;

wget -q --auth-no-challenge --header='Accept:application/octet-stream' \
  https://$TOKEN:@api.github.com/repos/$REPO/releases/assets/$asset_id \
  -O $OUTPUT && chmod +x $OUTPUT
