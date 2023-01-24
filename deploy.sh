#! /bin/bash

# COLORS
MAGENTA=$(tput setaf 5)
YELLOW=$(tput setaf 3)
GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
NORMAL=$(tput sgr0)

# PROJECT INIT CONFIG
GCLOUD_ACCOUNT=
PROJECT_ID=
SERVICE_NAME=
SERVICE_REGION=

# VALIDATE config
echo "${MAGENTA}*** VALIDATE CONFIG FILE ***${NORMAL}"
[ -s ./cloud_run.conf ]
if [ $? -ne 0 ]; then
  echo "${RED}./cloud_run.conf not found.${NORMAL}"
  exit 0
else
  # Load config
  . ./cloud_run.conf
  echo
  echo GCLOUD_ACCOUNT = $GCLOUD_ACCOUNT
  echo PROJECT_ID = $PROJECT_ID
  echo SERVICE_NAME = $SERVICE_NAME
  echo SERVICE_REGION = $SERVICE_REGION
  echo
fi

# VALIDATE Dockerfile
echo "${MAGENTA}*** VALIDATE Dockerfile ***${NORMAL}"
[ -s ./Dockerfile ]
if [ $? -ne 0 ]; then
  echo "${RED}./Dockerfile not found.${NORMAL}"
  exit 0
else
  echo
  echo "Found! Dockerfile"
  echo
fi

# TITLE PAGE
TITLE_TEXT="MAKEWEB BKK"

figlet "$TITLE_TEXT"
if [ $? -ne 0 ]; then
  npm install -g figlet-cli
  figlet "$TITLE_TEXT"
fi

# Check is login gcloud
echo "${MAGENTA}*** GET gcloud info ***${NORMAL}"
gcloud info
if [ $? -eq 0 ]; then
  # gcloud config set account
  if gcloud auth list | grep -q $GCLOUD_ACCOUNT; then
    echo "${MAGENTA}*** SET ACCOUNT ***${NORMAL}"
    gcloud config set account $GCLOUD_ACCOUNT
  else
    echo "${MAGENTA}*** LOGIN ACCOUNT ***${NORMAL}"
    gcloud auth login
    echo "${MAGENTA}*** SET ACCOUNT ***${NORMAL}"
    gcloud config set account $GCLOUD_ACCOUNT
  fi

  # gcloud config set core/project_id
  echo "${MAGENTA}*** SET PROJECT ID ***${NORMAL}"
  gcloud config set project $PROJECT_ID
  if [ $? -ne 0 ]; then
    exit 0
  fi
  # gcloud build docker and push to google cloud registry
  echo "${MAGENTA}*** BUILD GCLOUD ***${NORMAL}"
  gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
  if [ $? -ne 0 ]; then
    exit 0
  fi
  # gcloud config set region
  echo "${MAGENTA}*** SET REGION ***${NORMAL}"
  gcloud config set run/region $SERVICE_REGION
  if [ $? -ne 0 ]; then
    exit 0
  fi
  # gcloud deploy image from google cloud registry to cloud run
  echo "${MAGENTA}*** DEPLOY ***${NORMAL}"
  gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/$SERVICE_NAME --platform managed
  [ $? -eq 0 ] && echo  "${GREEN}SERVICE DEPLOY SUCCESSFUL${NORMAL}" || echo "${RED}DEPLOY FAIL${NORMAL}"
else
  # gcloud sdk not found
  echo
  echo "${RED}*** Google cloud SDK not found ***${NORMAL}"
  echo
  echo "${YELLOW}Please install Cloud SDK first ${NORMAL}=> https://cloud.google.com/sdk/docs/install"
fi

exit 0
