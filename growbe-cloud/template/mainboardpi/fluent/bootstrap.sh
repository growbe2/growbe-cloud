#! /bin/bash

export MAINBOARD_ID=$(/opt/growbe/growbe-mainboard id)
/opt/td-agent-bit/bin/td-agent-bit -c /opt/growbe/fluent/fluent.config