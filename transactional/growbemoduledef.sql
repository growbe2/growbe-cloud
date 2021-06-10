DELETE FROM public.growbemoduledef;
INSERT INTO public.growbemoduledef (id,name,description,pbmodelname,properties,displayname,pbmodelconfig) VALUES
	 ('AAS','SOIL','','SOILModuleData','{"p0":{"displayName":"","definition":"Port 0","operationalRange":{"min":30,"max":300},"name":"p0"},"p1":{"displayName":"","definition":"Port 1","operationalRange":{"min":30,"max":300},"name":"p1"},"p2":{"displayName":"","definition":"Port 2","operationalRange":{"min":30,"max":300},"name":"p2"},"p3":{"displayName":"","definition":"Port 3","operationalRange":{"min":30,"max":300},"name":"p3"},"p4":{"displayName":"","definition":"Port 4","operationalRange":{"min":30,"max":300},"name":"p4"},"p5":{"displayName":"","definition":"Port 5","operationalRange":{"min":30,"max":300},"name":"p5"},"p6":{"displayName":"","definition":"Port 6","operationalRange":{"min":30,"max":300},"name":"p6"},"p7":{"displayName":"","definition":"Port 7","operationalRange":{"min":30,"max":300},"name":"p7"}}',NULL,NULL),
	 ('AAA','THL','','THLModuleData','{"humidity":{"name":"humidity","definition":"Air humidity","unit":"Celcius","operationalRange":{"min":-40,"max":60}},"airTemperature":{"name":"airTemperature","definition":"Air Temperature","unit":"Pourcentage","operationalRange":{"min":0,"max":100}}}',NULL,NULL),
	 ('AAB','WaterControl','','WCModuleData','{"p0":{"definition":"Relay P0","operationalRange":{},"name":"p0"},"p1":{"definition":"Relay P1","operationalRange":{},"name":"p1"},"p2":{"definition":"Relay P2","operationalRange":{},"name":"p2"}}',NULL,NULL);