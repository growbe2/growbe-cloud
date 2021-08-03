DELETE FROM public.emailtemplate WHERE key = 'OTP' or key = 'CONFIRM_ACOUNT' or key = 'INVITE_USER';
INSERT INTO public.emailtemplate ("key",title,description,"template",args) VALUES
	 ('OTP','OTP','Email envoyé lors de confirmation à facteur multiple','<h3>{{=it.otp}}</h3>','{"otp":"OTP envoyer à l''usager"}'),
	 ('CONFIRM_ACOUNT','Confirmation de compte pour Growbe Cloud','Email envoyé après la création d''un compte pour en faire la confirmation','<h3><a href="{{=it.url}}">clicker ici pour valider votre compte</h3>
<p></p>','{"url":"Redirection URL"}'),
	 ('INVITE_USER','Invitation: Growbe Cloud','Email envoyé à l''usager quand il reçoit une invitation de joindre la plateforme',' <h1 style="text-align: center;">Vous êtes invités au site de formation en ligne </h1>
<a href="{{=it.url}}">Cliquer ici pour activer votre compte</a>','{"url":"Url de redirection"}');