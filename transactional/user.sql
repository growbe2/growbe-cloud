DELETE FROM public."user" WHERE id = 'e4833900-8ab9-11eb-b358-798a371f2ced';
DELETE FROM public."usercredentials" WHERE id = 'e4833900-8ab9-11eb-b358-798a371f2ced';

INSERT INTO public."user" (id,email,thumbnail,phone,phoneactivationcode,firstname,lastname,"blocked",validuntil,extrafields) VALUES
	 ('e4833900-8ab9-11eb-b358-798a371f2ced','berlingoqc@gmail.com',NULL,NULL,NULL,NULL,NULL,false,NULL,'{}');
INSERT INTO public.usercredentials (id,"password",activationcode,passwordresetcode,validuntil,userid) VALUES
	 ('e4833900-8ab9-11eb-b358-798a371f2ced','$2a$10$nTephqGw/hgoIMrnJL9n6eAXjB9meRabjLBgy1dVK5G08HBqpjNUG',NULL,NULL,NULL,'e4833900-8ab9-11eb-b358-798a371f2ced');