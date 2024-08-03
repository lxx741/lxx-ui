#!/bin/zsh
mkdirs components core docs hooks theme utils
for i in components core docs hooks theme utils; do
  mkdir $i
  cd $i
  pnpm init
  cd ..
done