#### -My initial NMAP scan only showed port 22 and 80 open. I was unable to locate anything useful on webpage and robots.txt didn't show anything:

![](../Pasted%20Images/Pasted%20image%2020220510182951.png)
![](../Pasted%20Images/Pasted%20image%2020220510183743.png)


## PORT 80 ENUMERATION

#### -Ran gobuster scan and only found directory "/admin". Navigated to the admin directory and found the following login web page and attempted to input default like credentials but nothing worked: 

![](../Pasted%20Images/Pasted%20image%2020220510183830.png)
![](../Pasted%20Images/Pasted%20image%2020220510183900.png)


## PORT 21 ENUMERATION

#### -Ran a general NMAP scan to scan all ports showing services and versions and found port "2112" (which is an FTP server) and shows we can connect anonymously and found file "index.php.bak": Navigated into FTP server with user anonymous and no password for password:

![](../Pasted%20Images/Pasted%20image%2020220510184001.png)
![](../Pasted%20Images/Pasted%20image%2020220510184030.png)

#### -Downloaded file "index.php.bak" using "mget" command onto my kali machine: 

![](../Pasted%20Images/Pasted%20image%2020220510184154.png)

#### -Cat'd file "index.php.bak" and found the following. Then googled "strcmp($_POST['password'], $pass) == 0)" and found the following link which has the syntax "strcmp($_POST['password']" which I used ctrl+f and that syntax on other pages/links I found before the "PHP Magic Tricks: Type Juggling" link: 

![](../Pasted%20Images/Pasted%20image%2020220510184309.png)
![](../Pasted%20Images/Pasted%20image%2020220510184344.png)

#phpJugglingMagicTricks

#### -The found webpage shows the following to post a password string (e.g "password=password" submit and array "password[ ]=" additionally showing PHP translates POST variables like this to an empty array with quotation marks (" "). So you will need to submit an array with the following {password[ ]=" "}: 

![](../Pasted%20Images/Pasted%20image%2020220510185300.png)
![](../Pasted%20Images/Pasted%20image%2020220510185328.png)

#### -Started Burp Suite and turned on Foxyproxy. As the username "admin" was found in file "index.php.bak". Typed "admin" into username and "pass" into the password on the /admin login webpage and clicked "login" and sent the POST information to repeater in Burp Suite and which showed the following: 

![](../Pasted%20Images/Pasted%20image%2020220510185811.png)

![](../Pasted%20Images/Pasted%20image%2020220510185841.png)

![](../Pasted%20Images/Pasted%20image%2020220510185919.png)

#### -Changed "password=" to password[ ]=" " and clicked send to send response and found the following response directing me to "dashboard.php": 

![](../Pasted%20Images/Pasted%20image%2020220510190002.png)

#### -I then navigated to the "proxy" tab in Burp Suite and input the same password[ ]=" " into the POST information and clicked "forward" and received the following webpage: 

![](../Pasted%20Images/Pasted%20image%2020220510190051.png)

![](../Pasted%20Images/Pasted%20image%2020220510190123.png)

#### -I then tuned off Foxyproxy and navigated to the "dashboard" link and found the following webpage 

![](../Pasted%20Images/Pasted%20image%2020220510190309.png)



