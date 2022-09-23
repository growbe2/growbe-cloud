DELETE FROM public.growbemoduledef WHERE moduleid = 'AAS' or moduleid = 'AAA' or moduleid = 'AAB' or moduleid = 'AAP' or moduleid = 'PPO' or moduleid = 'PPR' or moduleid = 'PAC' or moduleid = 'PAL' or moduleid = 'PCS' or moduleid = "CCS";
INSERT INTO public.growbemoduledef (moduleid,name,description,pbmodelname,properties,displayname,pbmodelconfig) VALUES
	 ('AAS','SOIL','','SOILModuleData','{"p0":{"displayName":"Probe 1","definition":"Port 1","operationalRange":{"min":0,"max":100},"name":"p0"},"p1":{"displayName":"Probe 2","definition":"Port 2","operationalRange":{"min":0,"max":100},"name":"p1"},"p2":{"displayName":"Probe 3","definition":"Port 3","operationalRange":{"min":0,"max":100},"name":"p2"},"p3":{"displayName":"Probe 4","definition":"Port 4","operationalRange":{"min":0,"max":100},"name":"p3"},"p4":{"displayName":"Probe 5","definition":"Port 5","operationalRange":{"min":0,"max":100},"name":"p4"},"p5":{"displayName":"Probe 6","definition":"Port 6","operationalRange":{"min":0,"max":100},"name":"p5"},"p6":{"displayName":"Probe 7","definition":"Port 7","operationalRange":{"min":0,"max":100},"name":"p6"},"p7":{"displayName":"Probe 8","definition":"Port 8","operationalRange":{"min":0,"max":100},"name":"p7"}}',NULL,NULL),
	 ('AAA','THL','','THLModuleData','{"humidity":{"name":"humidity","definition":"Air humidity","unit":"Celcius","operationalRange":{"min": 0,"max":100}},"airTemperature":{"name":"airTemperature","definition":"Air Temperature","unit":"Pourcentage","operationalRange":{"min":-40,"max":60}}}',NULL,NULL),
	 ('AAB','WaterControl','','WCModuleData','{"p0":{"definition":"Relay P0","operationalRange":{},"name":"p0"},"p1":{"definition":"Relay P1","operationalRange":{},"name":"p1"},"p2":{"definition":"Relay P2","operationalRange":{},"name":"p2"}, "drain":{"definition":"12V Drain","operationalRange":{},"name":"drain"}, "pump0":{"definition":"Pump 12V 0","operationalRange":{},"name":"pump0"}, "pump1":{"definition":"Pump 12V 1","operationalRange":{},"name":"pump1"}, "pump2":{"definition":"Pump 12V 2","operationalRange":{},"name":"pump2"}, "pump3":{"definition":"Pump 12V 3","operationalRange":{},"name":"pump3"}}',NULL,NULL),
	 ('AAP','RelayControl','','RelayModuleData','{"p0":{"definition":"Relay P0","operationalRange":{},"name":"p0"},"p1":{"definition":"Relay P1","operationalRange":{},"name":"p1"},"p2":{"definition":"Relay P2","operationalRange":{},"name":"p2"},"p3":{"definition":"Relay P3","operationalRange":{},"name":"p3"},"p4":{"definition":"Relay P4","operationalRange":{},"name":"p4"},"p5":{"definition":"Relay P5","operationalRange":{},"name":"p5"},"p6":{"definition":"Relay P6","operationalRange":{},"name":"p6"},"p7":{"definition":"Relay P7","operationalRange":{},"name":"p7"}}',NULL,NULL),
	 ('PPO','PhonePosition','','PhonePositionData','{"accuracy": {"definition": "Accuracy", "name": "accuracy"}, "altitude": {"definition": "Altitude", "name": "altitude"}, "bearing": {"definition": "Bearing", "name": "bearing"}, "speed": {"definition": "Speed",  "name": "speed"},"lat": {"definition": "Latitude", "name": "lat"}, "log": {"definition": "Longitude", "name": "log"}}',NULL,NULL),
	 ('PPR','PhonePressure','','PhonePressureData','{"hpa": {"definition": "Ambient air pressure.", "name": "hpa"}}',NULL,NULL),
	 ('PAC','PhoneAcceleration','','PhoneAccelerationData','{"gx": {"definition": "Acceleration force along the x axis (including gravity).", "name": "gx", "unit": "m/s2"}, "gy": {"definition": "Acceleration force along the y axis (including gravity).", "name": "gy", "unit": "m/s2"}, "gz": {"definition": "Acceleration force along the z axis (including gravity).", "name": "gz", "unit": "m/s2"}}',NULL,NULL),
	 ('PCS','PhoneStreaming','','PhoneStreamingData','{"status": {"definition": "current status of the stream", "name": "status"}, "fps": {"definition": "current fps of the video stream", "name": "fps"}, "bitrate": {"definition": "current bitrate of the video stream", "name": "bitrate"}, "error": {"definition": "error message if in error state", "name": "error"}, "faces": {"definition": "Faces", "name": "faces"}}',NULL,NULL),
	 ('PAL','PhoneAmbienLight','','PhoneAmbientLightData','{"siLux": {"definition": "Illuminance", "name": "siLux"}}',NULL,NULL),
	 ('CSS','ComputerSystemStats','','ComputerStatsData', '{"uptime": {"definition": "", "name": "uptime"}, "cpu": {"definition": "", "name": "cpu"}, "loadavg": {"definition": "", "name": "loadavg"}, "swap": {"definition": "", "name": "swap"}, "memory": {"definition": "", "name": "memory"}, "netifs": {"definition": "", "name": "netifs"}}', NULL, NULL),
	 ('CCS','ComputerStreaming','','ComputerStreamingData','{"status": {"definition": "current status of the stream", "name": "status"}, "fps": {"definition": "current fps of the video stream", "name": "fps"}, "bitrate": {"definition": "current bitrate of the video stream", "name": "bitrate"}, "error": {"definition": "error message if in error state", "name": "error"}}',NULL,NULL);