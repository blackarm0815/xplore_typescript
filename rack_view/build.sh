echo
echo "eslint code.ts"
if npx eslint code.ts
then
  echo "done"
else
  exit
fi
echo
#
echo "transpiling code.ts"
if npx tsc
then
  echo "done"
else
  exit
fi
echo
#
# remove ts ignores
grep -v @ts-ignore < code.js > temp.js
# change spacing
sed -i 's/    /  /g' temp.js
# remove eslint-disable-line
sed -i 's/ \/\/ eslint-disable-line//g' temp.js
mv temp.js code.js
echo
echo