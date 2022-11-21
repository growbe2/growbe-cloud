export DB_URL="postgresql://test:test@localhost:5432/defaultdb"
#export SSO_URL="http://localhost:3001"
export SSO_URL="https://auth.growbe.ca"
export MONGO_URL="mongodb://doadmin:test@localhost:27018/growbe?authSource=admin"
#export MQTT_URL="mqtt://localhost:1883"
export MQTT_URL="mqtt://mainboard.growbe.ca:30045"

export SSO_SETTINGS="{\"publicCreation\":true,\"multiFactor\":false,\"accountValidation\":true, \"defaultRoles\": []}"
export EMAIL_FROM='"Xmation" <info@alborea.com>'
export EMAIL_USER=apikey
export EMAIL_PASSWORD=
export EMAIL_REDIRECT=http://localhost:4200
export SMS_SID=""
export SMS_TOKEN=""
export SMS_NUMBER=""
export OTP_SECRET=5ytrfedsa
export JWT_SECRET=542rewdasr
export JWT_TTL=3600
