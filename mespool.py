def application(env, start_response):
    scripts = open('/var/www/scripts.js', 'r').read()
    forms = open('/var/www/forms.html', 'r').read()
    if env['REQUEST_METHOD'] == 'POST':
        if env.get('CONTENT_LENGTH'): env_len = int(env.get('CONTENT_LENGTH'))
        else: env_len = 0
        if env_len > 0: post = env['wsgi.input'].read(env_len).decode('utf-8')
        else: post = ""
        mes = ""
        if env['PATH_INFO'] == "/read": mes = open('/var/www/messages','r').read()
        if env['PATH_INFO'] == "/add": mes = open('/var/www/messages','a').write(post+'\n')
        html = mes
    else:
        html = '<html><head>' + scripts + '</head><body>' + forms + '</body></html>'
    start_response('200 OK', [('Content-Type', 'text/html'), ('Content-Length', str(len(html)))])
    yield html.encode('utf-8')
    
