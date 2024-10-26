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
grep -v @ts-ignore < code.js > temp.js
sed -i 's/    /  /g' temp.js
mv temp.js code.js
echo
echo