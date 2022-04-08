#! /bin/bash

systemctl daemon-reload

{{~ it.services :p }}
systemctl enable {{=p}}@{{=it.env}}.service
systemctl start {{=p}}@{{=it.env}}.service
{{~}}
