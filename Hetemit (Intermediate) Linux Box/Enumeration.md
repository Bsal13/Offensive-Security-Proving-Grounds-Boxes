#### -Per the nmap scan I navigated to http://192.168.56.117:50000 and found the following webpage:

![](../Pasted%20Images/Pasted%20image%2020220601140522.png)

#### -Navigated to http://192.168.56.117:50000/verify as the previous webpage showed a "/verify" directory:

![](../Pasted%20Images/Pasted%20image%2020220601140609.png)

#### -Typed "curl –X post –data "code=2*2" http://192.168.56.117:50000/verify" and found the following output showing the application performs evaluation:

![](../Pasted%20Images/Pasted%20image%2020220601140726.png)

#### -As found from the nmap scan port 50000 is running python 3.6 I typed "os" as a module and find the following showing the existence of it running python 3.6 module:

![](../Pasted%20Images/Pasted%20image%2020220601140834.png)

#### -