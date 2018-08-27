#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=bf7b23c\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/LukeBaal/dashboard/tree/master