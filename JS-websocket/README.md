### module
npm install -g wscat 
### for testing endpoint
npm install -g wscat 
- To connect > wscat -c wss://ioowgj15h0.execute-api.us-east-1.amazonaws.com/dev
- action is based on the route defined eg, {"action":"sendMessage", "data":"hello"}

### AWS
attach policy to lambdaRole and redeploy to work: AmazonAPIGatewayInvokeFullAccess
