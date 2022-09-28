#### -Per the previous NMAP scan found port 8295 which runs HTTP

#### -Typed "sudo gobuster dir -u http://192.168.189.56:8295 -w /usr/share/dirb/wordlists/common.txt -e -k -t50 -x "txt,html,php,asp,aspx,jsp" -o "/home/kali/Downloads/ProvingGroundsBoxes/Banzai/tcp_8295_http_common.txt" and found the following directory's I have access to:

![](../Images/Pasted%20image%2020220605134619.png)

![](../Images/Pasted%20image%2020220605134629.png)

#### -Per the previous NMAP scan found port 21 (FTP) (not allowed to log in with anonymous)

