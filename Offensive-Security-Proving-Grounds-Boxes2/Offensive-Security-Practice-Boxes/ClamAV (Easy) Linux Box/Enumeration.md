#### -As the box is called "ClamAV" I ran searchsploit "ClamAV" and found the following: 

![](../Pasted%20Images/Pasted%20image%2020220518220551.png)

#### -As the NMAP scan I ran showed port 25 was running version "Sendmail" I tried the "Sendmail with clamav-milter < 0.91.2 - Remote Command Execution" exploit.

![](../Pasted%20Images/Pasted%20image%2020220518220852.png)

#### -Typed "searchsploit –m multiple/remote/4761.pl" to copy exploit to the directory I was in. Then typed "cat 4761.pl" to read the script and found the following advising to provide a host to connect to and showing port 31337 and ran an NMAP scan to confirm if the port was open and found it to be closed: 

![](../Pasted%20Images/Pasted%20image%2020220518221021.png)
![](../Pasted%20Images/Pasted%20image%2020220518221042.png)

#### -Typed "perl 4761.pl 192.168.229.42" as the ".pl" is a perl extension and received the following output. I then ran another NMAP scan on port 31137 to confirm if it is open and found it to be opened: 

![](../Pasted%20Images/Pasted%20image%2020220518221153.png)
![](../Pasted%20Images/Pasted%20image%2020220518221210.png)
