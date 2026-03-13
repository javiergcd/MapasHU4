#!/bin/bash

BRANCH=$1
COMMITS=$2

git checkout $BRANCH || git checkout -b $BRANCH

for i in $(seq 1 $COMMITS)
do
  echo "$BRANCH change $i $(date)" >> dev_${BRANCH}.txt

  git add dev_${BRANCH}.txt
  git commit -m "$BRANCH commit $i"

  git push origin $BRANCH

  sleep $((RANDOM % 5 + 1))
done
