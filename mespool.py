root_folder = '/var/www/'
charset = '<meta charset="utf-8">'
def application(env, start_response):
    scripts = open(root_folder+'scripts.js', 'r').read()
    forms = open(root_folder+'forms.html', 'r').read()
    if env['REQUEST_METHOD'] == 'POST':
        if env.get('CONTENT_LENGTH'): env_len = int(env.get('CONTENT_LENGTH'))
        else: env_len = 0
        if env_len > 0: post = env['wsgi.input'].read(env_len).decode('utf-8')
        else: post = ""
        result = ""
        if env['PATH_INFO'] == "/read": result = open(root_folder+'messages','r').read()
        if env['PATH_INFO'] == "/add": result = open(root_folder+'messages','a').write(post+'\n')
        if env['PATH_INFO'] == "/clear": result = open(root_folder+'messages','w').write('Welcome to chat<br>\n')
        start_response('200 OK', [('Content-Type', 'text/html'), ('Content-Length', str(len(result)))])
        yield result.encode('utf-8')
    else:
        if env['PATH_INFO'] == "/favicon.ico":
            favicon = open(root_folder+'mesjes.png', 'rb').read()
            start_response('200 OK', [('Content-Type','image/png'),('Content-Length', str(len(favicon)))])
            yield favicon
        else:
            html = '<html>\n<head>\n' + charset + '\n' + scripts + '\n</head>\n<body>\n' + forms + '\n</body>\n</html>'
            start_response('200 OK', [('Content-Type', 'text/html'), ('Content-Length', str(len(html)))])
            yield html.encode('utf-8')
