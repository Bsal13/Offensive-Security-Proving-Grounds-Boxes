##### -Per NMAP scan port 445 was open. Typed "smbmap -H 192.168.108.64" and found share "zino" which had read permissions to Logs files:

![](../Pasted%20Images/Pasted%20image%2020220601133857.png)

#### -Typed "smbmap -R zino -H 192.168.108.64" and found the following files in the "zino" share logs files:

![](../Pasted%20Images/Pasted%20image%2020220601133941.png)

#### -Typed "smbmap -R zino -H 192.168.108.64 -A misc.log" as well as every other file listed in the zino share to download to my kali machine:

![](../Pasted%20Images/Pasted%20image%2020220601134057.png)

#### -Typed "cat 192.168.108.64-zino_misc.log" and found username "admin" password "adminadmin":

![](../Pasted%20Images/Pasted%20image%2020220601134149.png)

#### -Navigated to http://192.168.108.64:8003 as nmap scan showed port 8003 as an http apache server and found the below web page showing file/folder "booked":

![](../Pasted%20Images/Pasted%20image%2020220601134237.png)

#### -Clicked on the "booked" link and was navigated to the below web page showing "booked scheduler v2.7.5"

![](../Pasted%20Images/Pasted%20image%2020220601134315.png)

#### -Googled "Booked Scheduler v2.7.5 exploit python" and found the below webpage and found the following steps:

![](../Pasted%20Images/Pasted%20image%2020220601134348.png)
![](../Pasted%20Images/Pasted%20image%2020220601134413.png)
![](../Pasted%20Images/Pasted%20image%2020220601134425.png)
![](../Pasted%20Images/Pasted%20image%2020220601134438.png)
![](../Pasted%20Images/Pasted%20image%2020220601134452.png)



