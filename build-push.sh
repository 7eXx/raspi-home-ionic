#!/usr/bin/env bash

[ -f .env ] && . ./.env
[ -f .env.local ] && . ./.env.local

set -e

showHelp()
{
  echo "Build docker image for backend raspi home and push it to custom registry"
  echo "Syntax: ./build-push.sh [--no-push]"
  echo
  echo "options:"
  echo
  echo "--no-push     Avoid pushing build image"
  echo "-h            Print this help guide"
}

setArgs()
{
  while [ "${1:-}" != "" ]; do
    case "$1" in
      "-h" | "--help")
        showHelp
        exit 0
        ;;
      "--arm")
        platform="linux/arm/v7"
        ;;
      "--no-push")
        no_push="no-push"
        ;;
      *)
        showHelp
        exit 0
        ;;
    esac
    shift
  done
}

platform="linux/amd64"
setArgs "$@"

# If private docker registry is not defined, login to Docker.io
if [ -z ${PRIVATE_DOCKER_REGISTRY} ]; then
    cat ./.docker_pass | docker login -u $USERNAME --password-stdin
    image_name=${USERNAME}/${DOCKER_IMAGE}
else
    image_name=${PRIVATE_DOCKER_REGISTRY}/${DOCKER_IMAGE}
fi

full_image_name=${image_name}:${DOCKER_IMAGE_TAG}
echo "docker image - ${full_image_name}"

current_branch=$(git branch --show-current)
branch_image_name=${image_name}:${current_branch}
echo "docker image branch - ${branch_image_name}"

commit_hash=$(git log -1 --format=%h)
commit_image_name=${image_name}:${commit_hash}
echo "docker image commit hash - ${commit_image_name}"

docker build . \
    --platform ${platform} \
    -f docker/Dockerfile \
    -t ${full_image_name} \
    -t ${branch_image_name} \
    -t ${commit_image_name}

if [ -z "${no_push}" ]; then
  docker push ${full_image_name}
  docker push ${branch_image_name}
  docker push ${commit_image_name}
fi

exit 0
