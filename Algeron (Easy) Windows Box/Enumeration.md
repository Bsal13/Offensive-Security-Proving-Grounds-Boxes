## PORT 21

#### - Per NMAP scan we are able to login via anonymous but aren't able to get retrieve the directory listing

## PORT 9998

#### - Navigate to"http://192.168.114.65:9998'' and get directed to the following login page running Smartermail:

![](../Images/Pasted%20image%2020220710182606.png)

#### - Typed "searchsploit smartermail" and found the following remote code execution:

![](../Images/Pasted%20image%2020220710182826.png)

#### - Googled "windows/remote/49216.py" and found the following edb exploit:

![](../Images/Pasted%20image%2020220710183123.png)

![](../Images/Pasted%20image%2020220710183234.png)

#### - Googled "2019-7214 github" and found the following exploit with better comments for the exploit:

![](../Images/Pasted%20image%2020220710192632.png)

![](../Images/Pasted%20image%2020220710192852.png)
