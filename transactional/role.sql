DELETE FROM public."role" WHERE name = 'ADMIN' or name = 'ORG_USER_MANAGER';
INSERT INTO public."role" (name,description,orgtype,orgid) VALUES
	 ('ADMIN','Administrator of the site full right',NULL,NULL);
INSERT INTO public."role" (name,description,orgtype,orgid) VALUES
	 ('ORG_USER_MANAGER','','orgUser',NULL)