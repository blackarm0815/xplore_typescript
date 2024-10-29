echo
echo "eslint check_rack_position_stage.ts"
if npx eslint check_rack_position_stage.ts
then
  echo "done"
else
  exit
fi
echo
#
echo "transpiling check_rack_position_stage.ts"
if npx tsc
then
  echo "done"
else
  exit
fi
echo
# remove ts ignores
grep -v @ts-ignore < check_rack_position_stage.js > temp.js
# change spacing
sed -i 's/    /  /g' temp.js
# remove eslint-disable-line
sed -i 's/ \/\/ eslint-disable-line//g' temp.js
mv temp.js check_rack_position_stage.js
echo
echo