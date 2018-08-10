head = 'mesjes'
def application(environ, start_response):
    if environ.get('PATH_INFO') == '/':
        status = '200 OK'
        content = head
    elif environ.get('PATH_INFO') == '/read':
        status = '200 OK'
        content = open('/var/www/messages','r').read()
    elif environ.get('PATH_INFO') == '/add':
        status = '200 OK'
        open('/var/www/messages','a').write(environ.get('QUERY_STRING')+'\n')
        content = 'add OK'
    else:
        status = '200 OK'
        content = head
    response_headers = [('Content-Type', 'text/html'), ('Content-Length', str(len(content)))]
    start_response(status, response_headers)
    yield content.encode('utf8')
