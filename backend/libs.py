import os
import random
import string
import subprocess
import shlex

import web3

ENDPOINT = 'https://rinkeby.infura.io/v3/9836f86a46ef445b92e4cf1c0585cede'
RECV_ACCT = '0x2f5B69caD7740DFa96A9631c195EC67EbC3508d0'
RECORD_FILE = 'records.txt'

STORAGE_PATH = '/root/hackathon/storage'
CMD_HUB_BK_CAT = 'hub buck cat'
CMD_HUB_BK_PUSH = 'hub buck push -y'
CMD_HUB_BK_LS = 'hub buck ls'


def _execute_shell_cmd(cmd):
    env = os.environ
    env["PATH"] += ':' + '/usr/local/bin/:/bin'
    proc = subprocess.Popen(shlex.split(cmd), \
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                            cwd=STORAGE_PATH, env=env)
    stdout, stderr = proc.communicate()
    if stderr:
        return proc.returncode, stderr
    return proc.returncode, stdout

    
def gen_id(N=5):
    return ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.digits) for _ in range(N))
      
        
def read_data_remote(filename):
    return _execute_shell_cmd('%s %s'%(CMD_HUB_BK_CAT, filename))


def hub_list(filename):
    return _execute_shell_cmd('%s %s'%(CMD_HUB_BK_LS, filename))

    
def hub_push():
    return _execute_shell_cmd(CMD_HUB_BK_PUSH)


def key_exist(key):
    ret, out = hub_list(key)
    if ret == 0:
        return True
    return False
    

def write_data(data, key=None, retries=5):
    if not key:
        count = 1
        while count < retries:
            key = gen_id()

            if key_exist(key):
                count += 1
                key = None
                continue
            break
    
    if not key:
        return 'failed to create data', None
    
    with open('%s/%s'%(STORAGE_PATH, key), 'w') as f:
        f.write(data)
    
    return None, key
    

def read_data_local(filename):
    with open('%s/%s'%(STORAGE_PATH, filename)) as f:
        return f.read()

def eth_get_transaction(transaction_id):
    w3 = web3.Web3(web3.Web3.HTTPProvider(ENDPOINT))
    if not w3.isConnected():
        return 'End point is not connected', None
    receipt = w3.eth.wait_for_transaction_receipt(transaction_id)
    return None, receipt

def record_exist(transaction_id):
    filename = os.path.dirname(os.path.abspath(__file__)) + '/' + RECORD_FILE
    if os.path.isfile(filename):
        ret, out = _execute_shell_cmd('grep "%s" %s'%(transaction_id, filename))
        if out.decode("utf-8").find(transaction_id) >= 0:
            return True
    return False
    
def update_record(transaction_id):
    filename = os.path.dirname(os.path.abspath(__file__)) + '/' + RECORD_FILE
    with open(filename,'a') as f:
        f.write(' ' + transaction_id)
