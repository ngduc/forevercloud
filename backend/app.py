import os
import re
import logging

import libs

from flask import Flask, render_template, url_for, redirect, jsonify, request, Response, render_template, send_from_directory
from flask_cors import CORS

app = Flask(__name__, 
            static_url_path='', 
            static_folder='static',
            template_folder='templates')
CORS(app)

logging.basicConfig(filename='/tmp/app.log', level=logging.DEBUG)

@app.route('/about')
def about():
   return '<h2>Welcome to Web3Weekend Hackathon!</h2>'

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')
    
@app.route('/api/publish', methods=['POST', 'PUT'])
def publish():  
    try:
        data = request.get_json()
        app.logger.debug('data: %s', data)

        if not data:
            return jsonify(dict(status='error', error='invalid request data'))
        
        if not data.get('transactionId'):
            return jsonify(dict(status='error', error='missing transaction ID'))
        
        if not data.get('account'):
            return jsonify(dict(status='error', error='missing account information'))        
        
        #verify transactionId vs records
        #if libs.record_exist(data.get('transactionId')):
        #    return jsonify(dict(status='error', error='transaction %s already exists'%data.get('transactionId')))
        #libs.update_record(data.get('transactionId'))
        
        #verify transaction
        err, receipt = libs.eth_get_transaction(data.get('transactionId'))
        if err:
            return jsonify(dict(status='error', error=err))
        app.logger.debug('receipt: %s', receipt)
        
        if data.get('account') != receipt.get('from'):
            return jsonify(dict(status='error', error='Sender address does not match receipt'))
            
        if receipt.get('to') != libs.RECV_ACCT:
            return jsonify(dict(status='error', error='Receiver address is not correct'))
        
        if not receipt.get('status'):
            return jsonify(dict(status='error', error='Transaction is not completed'))

        key = data.get('key')
        if not key and data.get('transactionId'):
            key = data.get('transactionId')[-8:]
        if request.method == 'PUT' and not key:
            return jsonify(dict(status='error', error='no key provided for update'))
            
        elif request.method == 'PUT' and not libs.key_exist(key):
            return jsonify(dict(status='error', error='key does not exist'))
        
        app.logger.debug('key: %s', key)
        err, key = libs.write_data(data['content'], key)
        if err:
            return jsonify(dict(status='error', error=err))
        
        ret, out = libs.hub_push()
        app.logger.debug('ret: %s, out: %s', ret, out)

        if ret != 0:
            return jsonify(dict(status='error', error='push data to blockchain network failed'))
        
        # get hub link
        ret, out = libs.hub_link(key)
        app.logger.debug('ret: %s, out: %s', ret, out)
        
        url = None
        if ret == 0:
            match = re.search('https://\S+\.textile\.space/%s\.html'%key, out.decode("utf-8"))
            if match:
                url = match.group(0)
        
        return jsonify(dict(status='ok', error=None, key=key, url=url))

    except:
        app.logger.error('exception not handled', exc_info=True)
        return jsonify(dict(status='error', error='exception not handled'))

@app.route('/page/<key>', methods=['GET'])
def retrieve(key):
    try:
        r = Response(response="", status=200, mimetype="application/xml")
        r.headers["Content-Type"] = "text/html; charset=utf-8"

        #key = request.args.get('key')
        if not key:
            #return jsonify(dict(status='error', error='no key provided'))
            r.data='Error: No key provided'
            return r

        filename = '%s/%s'%(libs.STORAGE_PATH, key)

        ret, out = libs.read_data_remote(key)
        app.logger.debug('ret: %s, out: %s', ret, out)

        if ret != 0:
            #return jsonify(dict(status='error', error='data from blockchain network not found'))
            r.data='Error: data from blockchain network not found'
            return r

        #return jsonify(dict(status='ok', error=None, key=key, content=out.decode("utf-8")))
        #r.data = out.decode("utf-8")
        #return r
        return render_template('retrieve.tpl', content=out.decode("utf-8"))
            
    except:
        app.logger.error('exception not handled', exc_info=True)
        #return jsonify(dict(status='error', error='exception not handled'))
        r.data = 'Error: unknown error'
        return r
    
@app.route('/api/import', methods=['POST'])
def import_url():
    try:
        data = request.get_json()
        app.logger.debug('data: %s', data)

        if not data:
            return jsonify(dict(status='error', error='invalid request data'))
        url = data.get('url')
        if not url:
            return jsonify(dict(status='error', error='no URL provided'))
        err, out = libs.request_url_embeded(url)
        if err:
            app.logger.error(err)
            return jsonify(dict(status='error', error=err))
        return jsonify(dict(status='ok', error=None, html=out.get('html'), title=out.get('title')))
    except: 
        app.logger.error('exception not handled', exc_info=True)
        return jsonify(dict(status='error', error='exception not handled'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)