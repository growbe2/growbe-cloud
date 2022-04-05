# ! /bin/bash

if [ -n "$(ls -A /boot/growbe/ 2>/dev/null)" ]
then
	cp -r /boot/growbe/* /opt/growbe
	/opt/growbe/configure.sh
	rm -rf /boot/growbe/*
else
  echo "empty (or does not exist)"
fi